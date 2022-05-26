import { axiosMethod, axiosRequest } from 'src/utils/handleApiRequest';
import cookies from 'js-cookie';

class BlogCategoryApi {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    this.blogCategoryApiEndpoint = this.apiEndpoint + '/admin/blog-category';
    this.token = cookies.get('token');
  }
  getAllBlogCategories = ({ token }) => {
    return axiosRequest(this.blogCategoryApiEndpoint + `/all`, axiosMethod.GET, token, null);
  };
  createBlogCategory = ({ name, token }) => {
    return axiosRequest(this.blogCategoryApiEndpoint + `/`, axiosMethod.POST, token, {
      name
    });
  };
  updateBlogCategory = ({ id, name, token }) => {
    return axiosRequest(this.blogCategoryApiEndpoint + `/`, axiosMethod.PUT, token, {
      id,
      name
    });
  };
  deleteBlogCategory = ({ id, token }) => {
    return axiosRequest(this.blogCategoryApiEndpoint + `/${id}`, axiosMethod.DELETE, token, null);
  };
}

export default new BlogCategoryApi();
