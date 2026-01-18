export interface NewsImage {
  src: string;
  alt: string;
}

export interface NewsItem {
  title: string;
  categoryId: string;
  description: string;
  date: string;
  icon: string;
  content: string;
  images?: NewsImage[];
  relatedEventId?: string;
  author?: string;
  tags?: string[];
  featured?: boolean;
  pinned?: boolean;
  externalLink?: string;
  externalLinkText?: string;
  videoUrl?: string;
  expiryDate?: string;
  archived?: boolean;
}

export interface NewsCollection {
  news: NewsItem[];
}

declare module "*/news.yaml" {
  const content: NewsCollection;
  export default content;
}
