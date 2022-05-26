import { axiosMethod, axiosRequest } from 'src/utils/handleApiRequest';

class ProductColorApi {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    this.productColorApiEndpoint = this.apiEndpoint + '/admin/product-color';
  }

  getProductColors({ token }) {
    return axiosRequest(this.productColorApiEndpoint + `/all`, axiosMethod.GET, token, null);
  }

  getProductColorById({ productColorId, token }) {
    return axiosRequest(
      this.productColorApiEndpoint + `/${productColorId}`,
      axiosMethod.GET,
      token,
      null
    );
  }

  createProductColor({ color, token }) {
    return axiosRequest(this.productColorApiEndpoint + `/`, axiosMethod.POST, token, { color });
  }

  updateProductColor({ productColorId, color, token }) {
    return axiosRequest(this.productColorApiEndpoint + `/`, axiosMethod.PUT, token, {
      id: productColorId,
      color
    });
  }

  deleteProductColor({ productColorId, token }) {
    return axiosRequest(
      this.productColorApiEndpoint + `/${productColorId}`,
      axiosMethod.DELETE,
      token,
      null
    );
  }
}

export default new ProductColorApi();
