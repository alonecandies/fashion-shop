import { API_ENDPOINT } from '@src/configs';
import { axiosRequest } from '@src/utils/requestServerUtil';
import { IGetAllBlogParams } from './blog.types';
class BlogApi {
  blogApiEndpoint: string;

  constructor() {
    this.blogApiEndpoint = `${API_ENDPOINT}/blog`;
  }

  getAllBlogs(data: IGetAllBlogParams | null) {
    return axiosRequest(this.blogApiEndpoint + `/all`, data, 'GET', '', null);
  }
  getBlogById(id: number) {
    return axiosRequest(this.blogApiEndpoint + `/${id}`, null, 'GET', '', null);
  }
  getAllBlogCategories(id: number) {
    return axiosRequest(`${API_ENDPOINT}/blog-category` + `/all`, null, 'GET', '', null);
  }
  likeBlog(id: number) {
    return axiosRequest(this.blogApiEndpoint + `/liked/${id}`, null, 'GET', '', null);
  }
  viewBlog(id: number) {
    return axiosRequest(this.blogApiEndpoint + `/viewed/${id}`, null, 'GET', '', null);
  }
}
export default new BlogApi();
