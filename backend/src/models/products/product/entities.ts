export default interface Product {
  id: number;
  is_deleted: number;
  code_product: string;
  title: string;
  web_price: number;
  sale?: number;
  created_at?: string;
  updated_at?: string;
  description?: string;
  type?: number;
  status: number;
  number_of_likes: number;
  category_id: number;
  tags: any[];
  colors: any[];
  sizes: any[];
  viewd: number;
  out_of_stock: number;
}