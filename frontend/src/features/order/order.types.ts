export type IGetAllParams = {
  status: number | string;
  page: number;
  pageSize: number;
};

export type IOrderBody = {
  address: string;
  phone: string;
  full_name: string;
  orders: Array<{
    product_id: number;
    size: string;
    color: string;
    quantity: number;
  }>;
};

export type IOrderItem = {
  id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  size: string;
  color: string;
  product_id: number;
  code_product: string;
  product_title: string;
  product_web_price: number;
  product_sale: number;
  product_description: string;
  name_category: string;
  category_id: number;
  images: Array<{
    id: number;
    title: string;
    url: string;
    type: number;
    product_id: number;
  }>;
};

export type IOrder = {
  id: number;
  phone: string;
  full_name: string;
  status: number;
  created_at: string;
  updated_at: string;
  orders: Array<IOrderItem>;
};

export type CartItem = {
  product_id: number;
  code_product: string;
  product_title: string;
  product_web_price: number;
  product_sale: number;
  image: any;
  color: string;
  size: string;
  quantity: number;
};

export type IClearMsg = 'fetchCreateOrderMsg';
