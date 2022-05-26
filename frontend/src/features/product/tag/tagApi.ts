import { API_ENDPOINT } from '@src/configs';
import { axiosRequest } from '@src/utils/requestServerUtil';

class TagApi {
  tagApiEndpoint: string;

  constructor() {
    this.tagApiEndpoint = `${API_ENDPOINT}/product-tag`;
  }

  getAllTags(name: string | null) {
    return axiosRequest(this.tagApiEndpoint + `/all`, name, 'GET', '', null);
  }
}

export default new TagApi();
