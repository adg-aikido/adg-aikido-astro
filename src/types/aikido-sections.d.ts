export interface Image {
  src: string;
  alt: string;
  position?: 'left' | 'right' | 'center' | 'full';
  caption?: string;
  width?: 'sm' | 'md' | 'lg' | 'full';
}

export interface ContentSection {
  id: string;
  title: string;
  content: string;
  images?: Image[];
  order?: number;
  visible?: boolean;
  icon?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  externalLink?: string;
  externalLinkText?: string;
  tags?: string[];
  featured?: boolean;
}

export interface ContentSectionsData {
  sections: ContentSection[];
}

declare module "*/aikido-sections.yaml" {
  const data: ContentSectionsData;
  export default data;
}
