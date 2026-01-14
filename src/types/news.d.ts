export interface NewsImage {
  src: string;
  alt: string;
}

export interface NewsItem {
  title: string;
  content: string;
  images?: NewsImage[];
}

export interface NewsList {
  news: NewsItem[];
}
