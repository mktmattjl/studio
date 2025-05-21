
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
  isToday as dateFnsIsToday,
} from 'date-fns';

export const getDaysInMonthGrid = (date: Date): (Date | null)[] => {
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  const startDate = startOfWeek(firstDayOfMonth);
  const endDate = endOfWeek(lastDayOfMonth);

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  // Pad with nulls if the month doesn't start on Sunday or end on Saturday
  // to ensure a full 6x7 grid sometimes.
  // However, for a simpler display, we'll map days not in current month as distinct.
  return days;
};

export const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export {
  addMonths,
  subMonths,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  getDay,
  dateFnsIsToday as isToday,
};
