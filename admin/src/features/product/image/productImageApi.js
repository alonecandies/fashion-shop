import { axiosMethod, axiosRequest } from 'src/utils/handleApiRequest';

class ProductImageApi {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    this.productImageApiEndpoint = this.apiEndpoint + '/admin/product-image';
  }

  createProductImage({ productId, image, token }) {
    return axiosRequest(this.productImageApiEndpoint + `/`, axiosMethod.POST, token, {
      product_id: productId,
      ...image
    });
  }

  getProductImages({ productId, token }) {
    return axiosRequest(
      this.productImageApiEndpoint + `/product/${productId}`,
      axiosMethod.GET,
      token,
      null
    );
  }

  getProductImageById({ productImageId, token }) {
    return axiosRequest(
      this.productImageApiEndpoint + `/${productImageId}`,
      axiosMethod.GET,
      token,
      null
    );
  }

  updateProductImage({ id, title, url, type, token }) {
    return axiosRequest(this.productImageApiEndpoint + `/`, axiosMethod.PUT, token, {
      id,
      title,
      url,
      type
    });
  }

  deleteProductImage({ productImageId, token }) {
    return axiosRequest(
      this.productImageApiEndpoint + `/${productImageId}`,
      axiosMethod.DELETE,
      token,
      null
    );
  }
}

export default new ProductImageApi();
