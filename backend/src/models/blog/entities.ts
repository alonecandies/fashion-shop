export default interface Blog {
  id: number;
  title: string;
  viewd: number;
  content: string;
  number_of_likes: number;
  image: string;
  is_deleted: number;
  status: number;
  blog_category_id: number;
  created_at?: string;
  updated_at?: string;
}