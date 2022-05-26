export interface IGetAllProductParams {
  category_id?: number | null;
  level?: number | null;
  name?: string | null;
  code?: string | null;
  order?: number | null;
  status?: number | null;
  type?: number | null;
  money?: number | null;
  tag?: number | null;
  page?: number;
  pageSize?: number;
}
export type ProductImage = {
  id: number;
  title: string;
  url: string;
  type: number;
}
export type Tag = {
  id: number;
  name: string;
}
export type Color = {
  id: number;
  color: string;
}
export type Size = {
  id: number;
  type: string;
}

export interface IProduct {
  id: number;
  title: string;
  web_price: number;
  sale: number;
  images: Array<ProductImage>;
  code_product: string;
  description: string;
  number_of_likes: number;
  category_id: number;
  status: number;
  viewd: number;
  out_of_stock: number;
  product_category_name: string;
  tags: Array<Tag>;
  colors: Array<Color>;
  sizes: Array<Size>;
}

export type IClearMsgPayload =
  | `fetchGetAllProductsMsg`
  | `fetchGetProductByIdMsg`
  | `fetchLikedProductMsg`;
