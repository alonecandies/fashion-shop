import { axiosMethod, axiosRequest } from 'src/utils/handleApiRequest';

class ProductSizeApi {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    this.productSizeApiEndpoint = this.apiEndpoint + '/admin/product-size';
  }

  getSizes({ token }) {
    return axiosRequest(this.productSizeApiEndpoint + `/all`, axiosMethod.GET, token, null);
  }

  getSizeById({ productSizeId, token }) {
    return axiosRequest(
      this.productSizeApiEndpoint + `/${productSizeId}`,
      axiosMethod.GET,
      token,
      null
    );
  }

  createSize({ type, token }) {
    return axiosRequest(this.productSizeApiEndpoint + `/`, axiosMethod.POST, token, { type });
  }

  updateSize({ productSizeId, type, token }) {
    return axiosRequest(this.productSizeApiEndpoint + `/`, axiosMethod.PUT, token, {
      id: productSizeId,
      type
    });
  }

  deleteSize({ productSizeId, token }) {
    return axiosRequest(
      this.productSizeApiEndpoint + `/${productSizeId}`,
      axiosMethod.DELETE,
      token,
      null
    );
  }
}

export default new ProductSizeApi();
