export interface Price {
  title: string;
  subtitle?: string;
  description?: string;
  amount: string;
  unit: string;
}

export interface PriceCategory {
  category: string;
  title: string;
  heading: string;
  id?: string;
  prices: Price[];
}

export interface Prices {
  priceCategories: PriceCategory[];
}
