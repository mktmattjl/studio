
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format as dateFnsFormat, // Renamed to avoid conflict
  getDay,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
  isToday as dateFnsIsToday,
  addWeeks,
  subWeeks,
  getHours,
  getMinutes,
  differenceInMinutes,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from 'date-fns';

export const getDaysInMonthGrid = (date: Date): (Date | null)[] => {
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  const startDate = startOfWeek(firstDayOfMonth);
  const endDate = endOfWeek(lastDayOfMonth);

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  return days;
};

export const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const dayNamesFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


export const getWeekDays = (dateInWeek: Date): Date[] => {
  const firstDayOfTheWeek = startOfWeek(dateInWeek);
  return eachDayOfInterval({ start: firstDayOfTheWeek, end: endOfWeek(firstDayOfTheWeek) });
};

export interface HourSegment {
  hour: number; // 0-23
  label: string; // e.g., "7 AM", "12 PM", "11 PM"
}

export const getHourSegments = (startHour: number, endHour: number): HourSegment[] => {
  const segments: HourSegment[] = [];
  for (let h = startHour; h <= endHour; h++) {
    let label: string;
    if (h === 0) label = '12 AM';
    else if (h < 12) label = `${h} AM`;
    else if (h === 12) label = '12 PM';
    else label = `${h - 12} PM`;
    segments.push({ hour: h, label });
  }
  return segments;
};

// Export format function with a new name to avoid conflicts if format is used as a variable
export {
  addMonths,
  subMonths,
  dateFnsFormat as format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  getDay,
  dateFnsIsToday as isToday,
  addWeeks,
  subWeeks,
  startOfWeek,
  endOfWeek,
  getHours,
  getMinutes,
  differenceInMinutes,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  eachDayOfInterval,
};

