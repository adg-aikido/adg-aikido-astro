export interface Activity {
  date_start: string;
  date_end: string;
  time_start: string | null;
  time_end: string | null;
  title: string;
  description: string;
  event_id?: string;
}

export interface Activities {
  activities: Activity[];
}
