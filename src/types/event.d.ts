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

export interface Event {
  eventDate: string;
  paymentDeadline: string;
  senseiInfo: string;
  schedule: Schedule;
  prices: Price[];
}

declare module '*.yaml' {
  const content: Event;
  export default content;
}
