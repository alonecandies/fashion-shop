import { API_ENDPOINT } from '@src/configs';
import { axiosRequest } from '@src/utils/requestServerUtil';

class CategoryApi {
  categoryApiEndpoint: string;

  constructor() {
    this.categoryApiEndpoint = `${API_ENDPOINT}/category`;
  }

  getAllCategories() {
    return axiosRequest(this.categoryApiEndpoint + `/all`, null, 'GET', '', null);
  }
}

export default new CategoryApi();
