export interface ActivityItem {
  title: string;
  dateStart: string;
  dateEnd: string;
  timeStart: string | null;
  timeEnd: string | null;
  description: string;
  location?: string;
  category?: string;
  image?: string;
  imageAlt?: string;
  link?: string;
  linkText?: string;
  priority?: number;
  featured?: boolean;
  archived?: boolean;
  contactEmail?: string;
  contactPerson?: string;
}

export interface ActivitiesCollection {
  activities: ActivityItem[];
}

declare module "*/activities.yaml" {
  const content: ActivitiesCollection;
  export default content;
}
