import { API_ENDPOINT } from '@src/configs';
import { axiosRequest } from '@src/utils/requestServerUtil';
import { IGetAllProductParams } from './product.types';

class ProductApi {
  productApiEndpoint: string;

  constructor() {
    this.productApiEndpoint = `${API_ENDPOINT}/product`;
  }

  getAllProducts(data: IGetAllProductParams) {
    return axiosRequest(this.productApiEndpoint + `/all`, data, 'GET', '', null);
  }

  getProductById(id: number) {
    return axiosRequest(this.productApiEndpoint + `/${id}`, null, 'GET', '', null);
  }

  likeProduct(id: number) {
    return axiosRequest(this.productApiEndpoint + `/liked/${id}`, null, 'PUT', '', null);
  }
  viewProduct(id: number) {
    return axiosRequest(this.productApiEndpoint + `/viewed/${id}`, null, 'PUT', '', null);
  }
}
export default new ProductApi();
