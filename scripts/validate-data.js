#!/usr/bin/env node
/**
 * Validate YAML data relationships before build
 * 
 * Run this script to check for broken references between data collections
 */

import fs from 'fs';
import yaml from 'yaml';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../src/data');

// Load YAML files
const loadYaml = (filename) => {
  const content = fs.readFileSync(path.join(dataDir, filename), 'utf8');
  return yaml.parse(content);
};

const schema = loadYaml('schema.yaml');
const instructors = loadYaml('instructors.yaml');
const events = loadYaml('events.yaml');
const senseis = loadYaml('senseis.yaml');
const news = loadYaml('news.yaml');
const categories = loadYaml('news-categories.yaml');

let errors = [];

// Validate schedule instructors
const validInitials = new Set(instructors.instructors.map(i => i.initials));

if (schema.schedule && schema.schedule.enabled) {
  for (const day of schema.schedule.days) {
    for (const session of day.sessions) {
      for (const instructorInitial of session.instructors) {
        if (instructorInitial === '*') continue;
        if (!validInitials.has(instructorInitial)) {
          errors.push(
            `❌ Invalid instructor initials "${instructorInitial}" in ${day.day} ${session.timeStart} session`
          );
        }
      }
    }
  }
}

// Check summer schedule if it exists
if (schema.summerSchedule && schema.summerSchedule.enabled) {
  for (const day of schema.summerSchedule.days) {
    for (const session of day.sessions) {
      for (const instructorInitial of session.instructors) {
        if (instructorInitial === '*') continue;
        if (!validInitials.has(instructorInitial)) {
          errors.push(
            `❌ Invalid instructor initials "${instructorInitial}" in summer schedule ${day.day}`
          );
        }
      }
    }
  }
}

// Validate event senseis
const validSenseiIds = new Set(senseis.senseis.map(s => s.id));

for (const event of events.events) {
  if (!validSenseiIds.has(event.senseiId)) {
    errors.push(`❌ Invalid senseiId "${event.senseiId}" in event "${event.title}"`);
  }
}

// Validate news categories
const validCategoryIds = new Set(categories.categories.map(c => c.id));

for (const newsItem of news.news) {
  if (!validCategoryIds.has(newsItem.categoryId)) {
    errors.push(`❌ Invalid categoryId "${newsItem.categoryId}" in news "${newsItem.title}"`);
  }
}

// Validate news event links
const validEventIds = new Set(events.events.map(e => e.id));

for (const newsItem of news.news) {
  if (newsItem.relatedEventId && !validEventIds.has(newsItem.relatedEventId)) {
    errors.push(`❌ Invalid relatedEventId "${newsItem.relatedEventId}" in news "${newsItem.title}"`);
  }
}

// Report results
if (errors.length > 0) {
  console.error('\n🚨 Data Validation Failed:\n');
  errors.forEach(error => console.error(`  ${error}`));
  console.error(`\n${errors.length} error(s) found\n`);
  process.exit(1);
} else {
  const sessionCount = schema.schedule?.days?.reduce((sum, d) => sum + d.sessions.length, 0) || 0;
  console.log('✅ Data validation passed - all references are valid\n');
  console.log(`Validated:
  • ${sessionCount} schedule sessions reference valid instructors
  • ${events.events.length} events reference valid senseis
  • ${news.news.length} news items reference valid categories
  • ${news.news.filter(n => n.relatedEventId).length} news items with event links are valid\n`);
}
