import { axiosMethod, axiosRequest } from 'src/utils/handleApiRequest';

class CategoryApi {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    this.categoryApiEndpoint = this.apiEndpoint + '/admin/category';
  }

  getCategories({ token }) {
    return axiosRequest(this.categoryApiEndpoint + `/all`, axiosMethod.GET, token, null);
  }

  getCategoryById({ categoryId, level, token }) {
    return axiosRequest(
      this.categoryApiEndpoint + `/${level}/${categoryId}`,
      axiosMethod.GET,
      token,
      null
    );
  }

  createCategory({ name, level, parentId, token }) {
    return axiosRequest(this.categoryApiEndpoint + `/`, axiosMethod.POST, token, {
      name,
      level,
      parent_id: parentId
    });
  }

  updateCategory({ categoryId, level, name, token }) {
    return axiosRequest(this.categoryApiEndpoint + `/${level}`, axiosMethod.PUT, token, {
      id: categoryId,
      name
    });
  }

  deleteCategory({ categoryId, level, token }) {
    return axiosRequest(
      this.categoryApiEndpoint + `/${level}/${categoryId}`,
      axiosMethod.DELETE,
      token,
      null
    );
  }
}

export default new CategoryApi();
