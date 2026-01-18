export interface MediaItem {
  href: string;
  title: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  tags?: string[];
  isYouTube?: boolean;
  date?: string;
  description?: string;
  category?: string;
  duration?: string;
  author?: string;
  featured?: boolean;
  downloadable?: boolean;
  fileSize?: string;
  order?: number;
}

export interface MediaSection {
  section: string;
  title: string;
  subtitle?: string;
  id: string;
  gridCols?: string;
  items: MediaItem[];
  icon?: string;
  description?: string;
  order?: number;
  visible?: boolean;
  featured?: boolean;
}

export interface MediaData {
  mediaSections: MediaSection[];
}

declare module "*/media.yaml" {
  const data: MediaData;
  export default data;
}
