export default interface User {
    id: number;
    full_name?: string;
    email?: string;
    phone: string;
    password: string;
    address?: string;
    created_at?: string;
    updated_at?: string;
    is_deleted: number;
    role_id: number;
    status: number;
    verified_token?: string;
    email_verified?: number;
  }