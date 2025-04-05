
export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  mainImage: string;
  brand: string;
  category: string;
  specs: {
    [key: string]: string | number;
  };
  images?: string[];
  onSale?: boolean;
  salePrice?: number;
  rating?: number;
  stock?: number;
  featured?: boolean;
  recommended?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
