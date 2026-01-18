export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  order?: number;
  visible?: boolean;
  featured?: boolean;
}

export interface Categories {
  categories: Category[];
}

declare module "*/news-categories.yaml" {
  const categories: Categories;
  export default categories;
}
