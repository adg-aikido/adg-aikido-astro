import type { NewsItem } from '../types/news';
import type { EventItem } from '../types/events';
import type { ActivityItem } from '../types/activities';
import type { Category } from '../types/categories';

// Activity filtering (filter out past activities)
export function getUpcomingActivities(activities: ActivityItem[], maxItems?: number): ActivityItem[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcoming = activities.filter(activity => {
    const endDate = new Date(activity.endDate);
    endDate.setHours(0, 0, 0, 0);
    return endDate >= today;
  });
  
  // Sort by start date
  upcoming.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });
  
  return maxItems ? upcoming.slice(0, maxItems) : upcoming;
}

// Date formatting utilities
export function formatDate(dateStr: string, showYear: boolean = true, currentYear?: number): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };
  
  if (showYear) {
    options.year = "numeric";
  }
  
  return date.toLocaleDateString("sv-SE", options);
}

export function formatDateRange(startDate: string, endDate: string, showYear: boolean = false, currentYear?: number): string {
  if (startDate === endDate) {
    return formatDate(startDate, showYear, currentYear);
  }
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startDay = start.getDate();
  const endDay = end.getDate();
  
  const startMonth = start.toLocaleDateString("sv-SE", { month: "long" });
  const endMonth = end.toLocaleDateString("sv-SE", { month: "long" });
  
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();
  
  // Same year and same month
  if (startYear === endYear && startMonth === endMonth) {
    if (showYear) {
      return `${startDay}–${endDay} ${startMonth} ${endYear}`;
    }
    return `${startDay}–${endDay} ${startMonth}`;
  }
  
  // Same year, different months
  if (startYear === endYear) {
    if (showYear) {
      return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${endYear}`;
    }
    return `${startDay} ${startMonth} – ${endDay} ${endMonth}`;
  }
  
  // Different years
  if (showYear) {
    return `${startDay} ${startMonth} ${startYear} – ${endDay} ${endMonth} ${endYear}`;
  }
  return `${startDay} ${startMonth} – ${endDay} ${endMonth}`;
}

export function formatDateTime(date: string, time: string | null, showYear: boolean = true, currentYear?: number): string {
  const formattedDate = formatDate(date, showYear, currentYear);
  if (time) {
    return `${formattedDate}, ${time}`;
  }
  return formattedDate;
}

export function formatDateTimeRange(
  startDate: string,
  endDate: string,
  startTime: string | null,
  endTime: string | null,
  showYear: boolean = false,
  currentYear?: number
): string {
  // Same date: show date once with time range
  if (startDate === endDate) {
    const formattedDate = formatDate(startDate, showYear, currentYear);
    if (startTime && endTime) {
      return `${formattedDate}, ${startTime}–${endTime}`;
    }
    if (startTime) {
      return `${formattedDate}, ${startTime}`;
    }
    return formattedDate;
  }
  
  // Different dates
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startDay = start.getDate();
  const endDay = end.getDate();
  
  const startMonth = start.toLocaleDateString("sv-SE", { month: "long" });
  const endMonth = end.toLocaleDateString("sv-SE", { month: "long" });
  
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();
  
  const startTimeStr = startTime ? `, ${startTime}` : "";
  const endTimeStr = endTime ? `, ${endTime}` : "";
  
  // Same year and same month
  if (startYear === endYear && startMonth === endMonth) {
    if (showYear) {
      return `${startDay} ${startMonth} ${endYear}${startTimeStr} – ${endDay} ${startMonth} ${endYear}${endTimeStr}`;
    }
    return `${startDay} ${startMonth}${startTimeStr} – ${endDay} ${startMonth}${endTimeStr}`;
  }
  
  // Same year, different months
  if (startYear === endYear) {
    if (showYear) {
      return `${startDay} ${startMonth} ${endYear}${startTimeStr} – ${endDay} ${endMonth} ${endYear}${endTimeStr}`;
    }
    return `${startDay} ${startMonth}${startTimeStr} – ${endDay} ${endMonth}${endTimeStr}`;
  }
  
  // Different years
  if (showYear) {
    return `${startDay} ${startMonth} ${startYear}${startTimeStr} – ${endDay} ${endMonth} ${endYear}${endTimeStr}`;
  }
  return `${startDay} ${startMonth}${startTimeStr} – ${endDay} ${endMonth}${endTimeStr}`;
}

// Category utilities
export function getCategoryMap(categories: Category[]): Map<string, Category> {
  return new Map(categories.map(cat => [cat.id, cat]));
}

export function getCategoryName(categoryId: string, categoryMap: Map<string, Category>): string {
  return categoryMap.get(categoryId)?.name || categoryId;
}
