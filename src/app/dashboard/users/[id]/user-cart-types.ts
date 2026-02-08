export interface UserCartItem {
  id: number;
  quantity: number;
  created_at: Date | string;
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    available_quantity: number;
    image_urls: string[];
  };
}
