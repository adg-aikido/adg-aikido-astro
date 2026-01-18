/**
 * Data validation utilities
 * 
 * Validates relationships between YAML collections to prevent broken references
 */

import type { Schedule } from '../types/schema';
import type { InstructorsData } from '../types/instructors';
import type { EventsData } from '../types/events';
import type { SenseisData } from '../types/senseis';
import type { NewsCollection } from '../types/news';
import type { NewsCategories } from '../types/news-categories';

/**
 * Validates that all instructor initials in schedule exist in instructors list
 */
export function validateScheduleInstructors(
  schedule: Schedule,
  instructorsData: InstructorsData
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const validInitials = new Set(instructorsData.instructors.map(i => i.initials));
  
  // Check regular schedule
  if (schedule.regularSchedule.enabled) {
    for (const day of schedule.regularSchedule.days) {
      for (const session of day.sessions) {
        for (const instructorInitial of session.instructors) {
          // Skip wildcard instructor
          if (instructorInitial === '*') continue;
          
          if (!validInitials.has(instructorInitial)) {
            errors.push(
              `Invalid instructor initials "${instructorInitial}" in ${day.name} ${session.timeStart} session. ` +
              `Valid initials: ${Array.from(validInitials).join(', ')}`
            );
          }
        }
      }
    }
  }
  
  // Check summer schedule
  if (schedule.summerSchedule.enabled) {
    for (const day of schedule.summerSchedule.days) {
      for (const session of day.sessions) {
        for (const instructorInitial of session.instructors) {
          if (instructorInitial === '*') continue;
          
          if (!validInitials.has(instructorInitial)) {
            errors.push(
              `Invalid instructor initials "${instructorInitial}" in summer schedule ${day.name} ${session.timeStart} session`
            );
          }
        }
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates that all event senseiIds exist in senseis list
 */
export function validateEventSenseis(
  eventsData: EventsData,
  senseisData: SenseisData
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const validSenseiIds = new Set(senseisData.senseis.map(s => s.id));
  
  for (const event of eventsData.events) {
    if (!validSenseiIds.has(event.senseiId)) {
      errors.push(
        `Invalid senseiId "${event.senseiId}" in event "${event.title}". ` +
        `Valid sensei IDs: ${Array.from(validSenseiIds).join(', ')}`
      );
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates that all news categoryIds exist in categories list
 */
export function validateNewsCategories(
  newsCollection: NewsCollection,
  categoriesData: NewsCategories
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const validCategoryIds = new Set(categoriesData.categories.map(c => c.id));
  
  for (const newsItem of newsCollection.news) {
    if (!validCategoryIds.has(newsItem.categoryId)) {
      errors.push(
        `Invalid categoryId "${newsItem.categoryId}" in news item "${newsItem.title}". ` +
        `Valid category IDs: ${Array.from(validCategoryIds).join(', ')}`
      );
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates that all news relatedEventIds exist in events list
 */
export function validateNewsEventLinks(
  newsCollection: NewsCollection,
  eventsData: EventsData
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const validEventIds = new Set(eventsData.events.map(e => e.id));
  
  for (const newsItem of newsCollection.news) {
    if (newsItem.relatedEventId && !validEventIds.has(newsItem.relatedEventId)) {
      errors.push(
        `Invalid relatedEventId "${newsItem.relatedEventId}" in news item "${newsItem.title}". ` +
        `Valid event IDs: ${Array.from(validEventIds).join(', ')}`
      );
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Runs all validation checks
 */
export function validateAllData(data: {
  schedule: Schedule;
  instructors: InstructorsData;
  events: EventsData;
  senseis: SenseisData;
  news: NewsCollection;
  categories: NewsCategories;
}): { valid: boolean; errors: string[] } {
  const allErrors: string[] = [];
  
  const scheduleCheck = validateScheduleInstructors(data.schedule, data.instructors);
  allErrors.push(...scheduleCheck.errors);
  
  const eventCheck = validateEventSenseis(data.events, data.senseis);
  allErrors.push(...eventCheck.errors);
  
  const newsCheck = validateNewsCategories(data.news, data.categories);
  allErrors.push(...newsCheck.errors);
  
  const newsEventCheck = validateNewsEventLinks(data.news, data.events);
  allErrors.push(...newsEventCheck.errors);
  
  return {
    valid: allErrors.length === 0,
    errors: allErrors
  };
}
