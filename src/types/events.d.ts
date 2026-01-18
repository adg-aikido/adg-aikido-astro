export interface ScheduleItem {
  timeStart: string;
  timeEnd?: string;
  activity: string;
  subdued?: boolean;
}

export interface Schedule {
  saturday: ScheduleItem[];
  sunday: ScheduleItem[];
}

export interface Price {
  title: string;
  price: string;
  note?: string;
}

export interface EventItem {
  id: string;
  title: string;
  senseiId: string;
  dateStart: string;
  dateEnd: string;
  paymentDeadline: string;
  schedule: Schedule;
  prices: Price[];
  location?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  maxParticipants?: number;
  registrationLink?: string;
  registrationEmail?: string;
  organizer?: string;
  tags?: string[];
  featured?: boolean;
  cancelled?: boolean;
  additionalInfo?: string;
}

export interface EventsCollection {
  events: EventItem[];
}

declare module "*/events.yaml" {
  const content: EventsCollection;
  export default content;
}
