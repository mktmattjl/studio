
'use client';

import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addHours, format as formatDate, parseISO } from 'date-fns';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { PlannerEvent } from '@/app/planner/page';
import { PixelTrashIcon } from '@/components/icons/fantasy/PixelTrashIcon'; // Thematic Trash Icon

const eventFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  startTimeDate: z.string().min(1, "Date is required"),
  startTimeTime: z.string().min(1, "Time is required"),
  endTimeDate: z.string().min(1, "Date is required"),
  endTimeTime: z.string().min(1, "Time is required"),
  type: z.enum(['class', 'deadline', 'study_session', 'exam', 'meeting', 'personal']),
  description: z.string().max(500, "Description is too long").optional(),
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
        const potentialEndTime = addHours(proposedStartTime, 1);
        initialEndTime = (potentialEndTime <= proposedStartTime) ? addHours(proposedStartTime, 1) : potentialEndTime;
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

    if (combinedEndTime <= combinedStartTime) {
        combinedEndTime = addHours(combinedStartTime, 1);
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
      <DialogContent className="bg-card border border-border shadow-xl rounded-lg p-6 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary font-pixel"> {/* Thematic font */}
            {eventData ? 'Amend Decree' : 'New Decree'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2">
          <div>
            <Label htmlFor="title" className="text-foreground text-sm font-medium">Title</Label>
            <Input id="title" {...register('title')} className="bg-input text-input-foreground border-border focus:border-primary rounded-md mt-1 shadow-sm" />
            {errors.title && <p className="text-xs text-destructive mt-1">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTimeDate" className="text-foreground text-sm font-medium">Start Date</Label>
              <Input id="startTimeDate" type="date" {...register('startTimeDate')} className="bg-input text-input-foreground border-border focus:border-primary rounded-md mt-1 shadow-sm"/>
              {errors.startTimeDate && <p className="text-xs text-destructive mt-1">{errors.startTimeDate.message}</p>}
            </div>
            <div>
              <Label htmlFor="startTimeTime" className="text-foreground text-sm font-medium">Start Time</Label>
              <Input id="startTimeTime" type="time" {...register('startTimeTime')} className="bg-input text-input-foreground border-border focus:border-primary rounded-md mt-1 shadow-sm"/>
              {errors.startTimeTime && <p className="text-xs text-destructive mt-1">{errors.startTimeTime.message}</p>}
            </div>
          </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endTimeDate" className="text-foreground text-sm font-medium">End Date</Label>
              <Input id="endTimeDate" type="date" {...register('endTimeDate')} className="bg-input text-input-foreground border-border focus:border-primary rounded-md mt-1 shadow-sm"/>
              {errors.endTimeDate && <p className="text-xs text-destructive mt-1">{errors.endTimeDate.message}</p>}
            </div>
            <div>
              <Label htmlFor="endTimeTime" className="text-foreground text-sm font-medium">End Time</Label>
              <Input id="endTimeTime" type="time" {...register('endTimeTime')} className="bg-input text-input-foreground border-border focus:border-primary rounded-md mt-1 shadow-sm"/>
              {errors.endTimeTime && <p className="text-xs text-destructive mt-1">{errors.endTimeTime.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="type" className="text-foreground text-sm font-medium">Type of Quest</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full bg-input text-input-foreground border-border focus:border-primary rounded-md mt-1 shadow-sm">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border text-popover-foreground rounded-md shadow-lg">
                    <SelectItem value="class" className="hover:bg-muted/50">Lecture</SelectItem>
                    <SelectItem value="deadline" className="hover:bg-muted/50">Deadline</SelectItem>
                    <SelectItem value="study_session" className="hover:bg-muted/50">Study Ritual</SelectItem>
                    <SelectItem value="exam" className="hover:bg-muted/50">Trial (Exam)</SelectItem>
                    <SelectItem value="meeting" className="hover:bg-muted/50">Council (Meeting)</SelectItem>
                    <SelectItem value="personal" className="hover:bg-muted/50">Personal Errand</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && <p className="text-xs text-destructive mt-1">{errors.type.message}</p>}
          </div>

          <div>
            <Label htmlFor="description" className="text-foreground text-sm font-medium">Details (Optional)</Label>
            <Textarea id="description" {...register('description')} className="bg-input text-input-foreground border-border focus:border-primary rounded-md mt-1 shadow-sm" rows={3} />
             {errors.description && <p className="text-xs text-destructive mt-1">{errors.description.message}</p>}
          </div>

          <DialogFooter className="sm:justify-between gap-2 mt-6 flex-col-reverse sm:flex-row">
            <div className="flex gap-2">
                {eventData && onDelete && (
                    <Button
                        type="button"
                        variant="destructive" 
                        onClick={() => onDelete(eventData.id)}
                        className="w-full sm:w-auto"
                    >
                        <PixelTrashIcon className="w-4 h-4 mr-2" /> Banish
                    </Button>
                )}
            </div>
            <div className="flex gap-2 flex-col-reverse sm:flex-row">
                 <DialogClose asChild>
                    <Button type="button" variant="outline" className="w-full sm:w-auto">
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit" className="w-full sm:w-auto btn-primary-action">
                {eventData ? 'Update Decree' : 'Issue Decree'}
                </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

    