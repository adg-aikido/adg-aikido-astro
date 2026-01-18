export interface DojoLink {
  href: string;
  label: string;
  city?: string;
  country?: string;
  description?: string;
  email?: string;
  phone?: string;
  featured?: boolean;
  verified?: boolean;
  order?: number;
}

export interface DojoLinkSection {
  section: string;
  links: DojoLink[];
  columns?: number;
  description?: string;
  order?: number;
  visible?: boolean;
}

export interface DojosData {
  dojoLinks: DojoLinkSection[];
}

declare module "*/dojos.yaml" {
  const data: DojosData;
  export default data;
}
