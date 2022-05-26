export default interface ShoppingCart {
  id: number;
  updated_at?: string;
  created_at?: string;
  quantity: number;
  is_deleted: number;
  product_id: number;
  shopping_cart_id: number;
  color?: string;
  size?: string;
}