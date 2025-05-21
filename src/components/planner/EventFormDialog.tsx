
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
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<EventFormData>({
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
        // Default to 1 hour duration for new events, ensuring end time is after start time
        const potentialEndTime = addHours(proposedStartTime, 1);
        if (potentialEndTime <= proposedStartTime) {
            initialEndTime = addHours(proposedStartTime, 1); // Fallback if somehow it's not later
        } else {
            initialEndTime = potentialEndTime;
        }
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
    let combinedEndTime = parseISO(`${data.endTimeDate}T${data.endTimeTime}:00`);

    // Ensure end time is after start time
    if (combinedEndTime <= combinedStartTime) {
        combinedEndTime = addHours(combinedStartTime, 1); // Default to 1 hour after start if invalid
    }
    
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
      <DialogContent className="bg-card border-2 md:border-4 border-accent shadow-[2px_2px_0px_hsl(var(--primary))] md:shadow-[4px_4px_0px_hsl(var(--primary))] rounded-none p-4 md:p-6 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary-foreground font-bold">
            {eventData ? 'Edit Event' : 'Add New Event'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div>
            <Label htmlFor="title" className="text-primary-foreground text-sm">Title</Label>
            <Input id="title" {...register('title')} className="bg-input text-input-foreground border-primary focus:border-accent rounded-none mt-1" />
            {errors.title && <p className="text-xs text-destructive mt-1">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTimeDate" className="text-primary-foreground text-sm">Start Date</Label>
              <Input id="startTimeDate" type="date" {...register('startTimeDate')} className="bg-input text-input-foreground border-primary focus:border-accent rounded-none mt-1"/>
              {errors.startTimeDate && <p className="text-xs text-destructive mt-1">{errors.startTimeDate.message}</p>}
            </div>
            <div>
              <Label htmlFor="startTimeTime" className="text-primary-foreground text-sm">Start Time</Label>
              <Input id="startTimeTime" type="time" {...register('startTimeTime')} className="bg-input text-input-foreground border-primary focus:border-accent rounded-none mt-1"/>
              {errors.startTimeTime && <p className="text-xs text-destructive mt-1">{errors.startTimeTime.message}</p>}
            </div>
          </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endTimeDate" className="text-primary-foreground text-sm">End Date</Label>
              <Input id="endTimeDate" type="date" {...register('endTimeDate')} className="bg-input text-input-foreground border-primary focus:border-accent rounded-none mt-1"/>
              {errors.endTimeDate && <p className="text-xs text-destructive mt-1">{errors.endTimeDate.message}</p>}
            </div>
            <div>
              <Label htmlFor="endTimeTime" className="text-primary-foreground text-sm">End Time</Label>
              <Input id="endTimeTime" type="time" {...register('endTimeTime')} className="bg-input text-input-foreground border-primary focus:border-accent rounded-none mt-1"/>
              {errors.endTimeTime && <p className="text-xs text-destructive mt-1">{errors.endTimeTime.message}</p>}
            </div>
          </div>


          <div>
            <Label htmlFor="type" className="text-primary-foreground text-sm">Type</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full bg-input text-input-foreground border-primary focus:border-accent rounded-none mt-1">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-accent text-popover-foreground rounded-none">
                    <SelectItem value="class" className="hover:bg-accent/20">Class</SelectItem>
                    <SelectItem value="deadline" className="hover:bg-accent/20">Deadline</SelectItem>
                    <SelectItem value="study_session" className="hover:bg-accent/20">Study Session</SelectItem>
                    <SelectItem value="exam" className="hover:bg-accent/20">Exam</SelectItem>
                    <SelectItem value="meeting" className="hover:bg-accent/20">Meeting</SelectItem>
                    <SelectItem value="personal" className="hover:bg-accent/20">Personal</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && <p className="text-xs text-destructive mt-1">{errors.type.message}</p>}
          </div>

          <div>
            <Label htmlFor="description" className="text-primary-foreground text-sm">Description (Optional)</Label>
            <Textarea id="description" {...register('description')} className="bg-input text-input-foreground border-primary focus:border-accent rounded-none mt-1" rows={3} />
          </div>

          <DialogFooter className="sm:justify-between gap-2 mt-6 flex-col-reverse sm:flex-row">
            <div className="flex gap-2">
                {eventData && onDelete && (
                    <PixelatedButton
                        type="button"
                        variant="destructive" 
                        onClick={() => onDelete(eventData.id)}
                        className="w-full sm:w-auto"
                    >
                        <Trash2 size={16} className="mr-2" /> Delete
                    </PixelatedButton>
                )}
            </div>
            <div className="flex gap-2 flex-col-reverse sm:flex-row">
                 <DialogClose asChild>
                    <PixelatedButton type="button" variant="outline" className="w-full sm:w-auto">
                        Cancel
                    </PixelatedButton>
                </DialogClose>
                <PixelatedButton type="submit" className="w-full sm:w-auto">
                {eventData ? 'Save Changes' : 'Add Event'}
                </PixelatedButton>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
