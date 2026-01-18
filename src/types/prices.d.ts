export interface Price {
  title: string;
  subtitle?: string;
  description?: string;
  amount: string;
  unit: string;
  validFrom?: string;
  validUntil?: string;
  image?: string;
  link?: string;
  linkText?: string;
  highlight?: boolean;
  popular?: boolean;
  eligibilityCriteria?: string[];
  order?: number;
}

export interface PriceCategory {
  category: string;
  title: string;
  heading: string;
  id?: string;
  prices: Price[];
  icon?: string;
  description?: string;
  order?: number;
  visible?: boolean;
  featured?: boolean;
}

export interface Prices {
  priceCategories: PriceCategory[];
}

declare module "*/prices.yaml" {
  const data: Prices;
  export default data;
}
