export interface Sensei {
  id: string;
  name: string;
  rank: string;
  title: string;
  image?: string;
  bio: string;
  location?: string;
  country?: string;
  email?: string;
  website?: string;
  organization?: string;
  yearsOfPractice?: number;
  specialties?: string[];
  languages?: string[];
  socialLinks?: { platform: string; url: string }[];
  featured?: boolean;
}

export interface Senseis {
  senseis: Sensei[];
}

declare module "*/senseis.yaml" {
  const content: Senseis;
  export default content;
}
