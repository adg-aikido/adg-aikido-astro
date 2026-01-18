export interface ScheduleSession {
  timeStart: string;
  timeEnd: string;
  title: string;
  subtitle?: string;
  instructors: string[];
  color: "primary" | "secondary" | "accent";
  level?: string;
  ageGroup?: string;
  maxParticipants?: number;
  requiresRegistration?: boolean;
  location?: string;
  room?: string;
  description?: string;
  tags?: string[];
  cancelled?: boolean;
  substitute?: boolean;
}

export interface ScheduleDay {
  day: string;
  sessions: ScheduleSession[];
  date?: string;
  note?: string;
  holiday?: boolean;
  specialEvent?: string;
}

export interface Schedule {
  enabled: boolean;
  days: ScheduleDay[];
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  timezone?: string;
}

export interface SchemaData {
  schedule: Schedule;
  summer_schedule: Schedule;
}

declare module "*/schema.yaml" {
  const data: SchemaData;
  export default data;
}
