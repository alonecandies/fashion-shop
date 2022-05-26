export interface IGetAllBlogParams {
  blog_category_id?: number | null;
  title?: string | null;
  order?: number | null;
  status?: number | null;
  type?: number | null;
  page?: number;
  pageSize?: number;
}
export interface IBlog {
  id: number;
  title: string;
  viewd: number;
  content: string;
  number_of_likes: number;
  imageUrl: string;
  status: number;
  blog_category_id: number;
  created_at: string;
  updated_at: string;
}
