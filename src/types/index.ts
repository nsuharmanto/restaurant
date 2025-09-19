export type Category = {
  id: string;
  name: string;
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  categoryId: string;
  rating?: number;
  createdAt?: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  imageUrl?: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  phone: string;
  address: string;
  createdAt: string;
};

export type Restaurant = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images?: string[];
  reviewCount?: number;
  sampleMenus?: unknown[];
  isFrequentlyOrdered?: boolean;
};
