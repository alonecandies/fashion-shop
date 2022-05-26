export default interface FormContact {
  id: number;
  full_name: string;
  email?: string;
  phone: number;
  content: string;
  is_checked: number;
  is_deleted: number;
  created_at?: string;
  updated_at?: string;
}