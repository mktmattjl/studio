
'use client';

import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addHours, format as formatDate, parseISO } from 'date-fns';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { PixelatedButton } from '@/components/PixelatedButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { PlannerEvent } from '@/app/planner/page';
import { Trash2 } from 'lucide-react';

const eventFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  startTimeDate: z.string().min(1, "Date is required"),
  startTimeTime: z.string().min(1, "Time is required"),
  endTimeDate: z.string().min(1, "Date is required"),
  endTimeTime: z.string().min(1, "Time is required"),
  type: z.enum(['class', 'deadline', 'study_session', 'exam', 'meeting', 'personal']),
  description: z.string().optional(),
});

type EventFormData = z.infer<typeof eventFormSchema>;

interface EventFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventData?: PlannerEvent | null;
  proposedStartTime?: Date | null;
  onSave: (data: Omit<PlannerEvent, 'id' | 'color'> & { id?: string }) => void;
  onDelete?: (eventId: string) => void;
}

export function EventFormDialog({
  isOpen,
  onClose,
  eventData,
  proposedStartTime,
  onSave,
  onDelete,
}: EventFormDialogProps) {
  const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: '',
      type: 'study_session',
      description: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      let initialStartTime: Date;
      let initialEndTime: Date;

      if (eventData) {
        initialStartTime = eventData.startTime;
        initialEndTime = eventData.endTime;
      } else if (proposedStartTime) {
        initialStartTime = proposedStartTime;
        initialEndTime = addHours(proposedStartTime, 1); // Default to 1 hour duration
      } else {
        initialStartTime = new Date();
        initialEndTime = addHours(new Date(), 1);
      }
      
      reset({
        title: eventData?.title || '',
        startTimeDate: formatDate(initialStartTime, 'yyyy-MM-dd'),
        startTimeTime: formatDate(initialStartTime, 'HH:mm'),
        endTimeDate: formatDate(initialEndTime, 'yyyy-MM-dd'),
        endTimeTime: formatDate(initialEndTime, 'HH:mm'),
        type: eventData?.type || 'study_session',
        description: eventData?.description || '',
      });
    }
  }, [isOpen, eventData, proposedStartTime, reset]);

  const onSubmit: SubmitHandler<EventFormData> = (data) => {
    const combinedStartTime = parseISO(`${data.startTimeDate}T${data.startTimeTime}:00`);
    const combinedEndTime = parseISO(`${data.endTimeDate}T${data.endTimeTime}:00`);
    
    onSave({
      id: eventData?.id,
      title: data.title,
      startTime: combinedStartTime,
      endTime: combinedEndTime,
      type: data.type,
      description: data.description,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card border-accent shadow-[4px_4px_0px_hsl(var(--primary))] rounded-none p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary-foreground">
            {eventData ? 'Edit Event' : 'Add New Event'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-primary-foreground">Title</Label>
            <Input id="title" {...register('title')} className="bg-input text-input-foreground border-primary focus:border-accent" />
            {errors.title && <p className="text-xs text-destructive mt-1">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTimeDate" className="text-primary-foreground">Start Date</Label>
              <Input id="startTimeDate" type="date" {...register('startTimeDate')} className="bg-input text-input-foreground border-primary focus:border-accent"/>
              {errors.startTimeDate && <p className="text-xs text-destructive mt-1">{errors.startTimeDate.message}</p>}
            </div>
            <div>
              <Label htmlFor="startTimeTime" className="text-primary-foreground">Start Time</Label>
              <Input id="startTimeTime" type="time" {...register('startTimeTime')} className="bg-input text-input-foreground border-primary focus:border-accent"/>
              {errors.startTimeTime && <p className="text-xs text-destructive mt-1">{errors.startTimeTime.message}</p>}
            </div>
          </div>

           <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endTimeDate" className="text-primary-foreground">End Date</Label>
              <Input id="endTimeDate" type="date" {...register('endTimeDate')} className="bg-input text-input-foreground border-primary focus:border-accent"/>
              {errors.endTimeDate && <p className="text-xs text-destructive mt-1">{errors.endTimeDate.message}</p>}
            </div>
            <div>
              <Label htmlFor="endTimeTime" className="text-primary-foreground">End Time</Label>
              <Input id="endTimeTime" type="time" {...register('endTimeTime')} className="bg-input text-input-foreground border-primary focus:border-accent"/>
              {errors.endTimeTime && <p className="text-xs text-destructive mt-1">{errors.endTimeTime.message}</p>}
            </div>
          </div>


          <div>
            <Label htmlFor="type" className="text-primary-foreground">Type</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full bg-input text-input-foreground border-primary focus:border-accent">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-accent text-popover-foreground">
                    <SelectItem value="class">Class</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="study_session">Study Session</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && <p className="text-xs text-destructive mt-1">{errors.type.message}</p>}
          </div>

          <div>
            <Label htmlFor="description" className="text-primary-foreground">Description (Optional)</Label>
            <Textarea id="description" {...register('description')} className="bg-input text-input-foreground border-primary focus:border-accent" rows={3} />
          </div>

          <DialogFooter className="sm:justify-between gap-2 mt-6">
            {eventData && onDelete && (
                 <PixelatedButton
                    type="button"
                    variant="destructive"
                    onClick={() => onDelete(eventData.id)}
                    className="mr-auto bg-destructive text-destructive-foreground border-destructive shadow-[2px_2px_0px_hsl(var(--primary))] md:shadow-[3px_3px_0px_hsl(var(--primary))] hover:bg-destructive/90"
                >
                    <Trash2 size={16} className="mr-2" /> Delete
                </PixelatedButton>
            )}
            <DialogClose asChild>
              <PixelatedButton type="button" variant="outline">
                Cancel
              </PixelatedButton>
            </DialogClose>
            <PixelatedButton type="submit">
              {eventData ? 'Save Changes' : 'Add Event'}
            </PixelatedButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
