export default interface ShoppingCart {
  id: number;
  updated_at?: string;
  created_at?: string;
  address: string;
  phone: string;
  full_name: string;
  status: number;
  is_deleted: number;
  user_id: number;
  orders: any[];
}