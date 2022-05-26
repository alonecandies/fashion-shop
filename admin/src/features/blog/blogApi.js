import { axiosMethod, axiosRequest } from 'src/utils/handleApiRequest';
import cookies from 'js-cookie';
import * as _ from 'lodash';
import makeQuery from 'src/utils/makeQuery';

class BlogApi {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    this.blogApiEndpoint = this.apiEndpoint + '/admin/blog';
    this.token = cookies.get('token');
  }

  getAllBlogs = ({ blogCategoryId, title, status, order, type, page, pageSize, token }) => {
    const filter = {
      blog_categiry_id: blogCategoryId,
      title,
      status,
      order,
      type,
      page,
      pageSize
    };
    const query = makeQuery(filter);
    return axiosRequest(this.blogApiEndpoint + `/all/${query}`, axiosMethod.GET, token, null);
  };
  getBlogById = ({ id, token }) => {
    return axiosRequest(this.blogApiEndpoint + `/${id}`, axiosMethod.GET, token, null);
  };
  createBlog = ({ title, content, blog_category_id, token }) => {
    return axiosRequest(this.blogApiEndpoint + `/`, axiosMethod.POST, token, {
      title,
      content,
      blog_category_id
    });
  };
  updateBlog = ({ data, token }) => {
    return axiosRequest(
      this.blogApiEndpoint + `/`,
      axiosMethod.PUT,
      token,
      _.omit(data, ['created_at', 'updated_at'])
    );
  };
  updateBlogStatus = ({ data, token }) => {
    return axiosRequest(this.blogApiEndpoint + `/status`, axiosMethod.PUT, token, data);
  };
  deleteBlog = ({ id, token }) => {
    return axiosRequest(this.blogApiEndpoint + `/${id}`, axiosMethod.DELETE, token, null);
  };
}

export default new BlogApi();
