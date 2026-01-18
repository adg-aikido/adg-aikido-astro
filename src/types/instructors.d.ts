// Type definitions for instructors data

export interface Instructor {
  initials: string;
  name: string;
  rank: string;
  groups: string[];
  image?: string;
  description?: string;
  email?: string;
  phone?: string;
  bio?: string;
  yearsOfExperience?: number;
  certifications?: string[];
  specialties?: string[];
  availability?: string;
  socialLinks?: { platform: string; url: string }[];
  featured?: boolean;
  active?: boolean;
}

export interface InstructorsData {
  instructors: Instructor[];
  contact: {
    email: string;
    description: string;
  };
}

declare module "*/instructors.yaml" {
  const instructorsData: InstructorsData;
  export default instructorsData;
}
