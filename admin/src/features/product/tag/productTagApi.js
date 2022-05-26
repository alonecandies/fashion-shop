import { axiosMethod, axiosRequest } from 'src/utils/handleApiRequest';
import makeQuery from 'src/utils/makeQuery';

class ProductTagApi {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    this.tagApiEndpoint = this.apiEndpoint + '/admin/product-tag';
  }

  getProductTags({ name, token }) {
    const query = makeQuery({ name });
    return axiosRequest(this.tagApiEndpoint + `/all/${query}`, axiosMethod.GET, token, null);
  }

  getProductTagById({ tagId, token }) {
    return axiosRequest(this.tagApiEndpoint + `/${tagId}`, axiosMethod.GET, token, null);
  }

  createProductTag({ name, token }) {
    return axiosRequest(this.tagApiEndpoint + `/`, axiosMethod.POST, token, { name });
  }

  updateProductTag({ productTagId, name, token }) {
    return axiosRequest(this.tagApiEndpoint + `/`, axiosMethod.PUT, token, {
      id: productTagId,
      name
    });
  }

  deleteProductTag({ productTagId, token }) {
    return axiosRequest(this.tagApiEndpoint + `/${productTagId}`, axiosMethod.DELETE, token, null);
  }
}

export default new ProductTagApi();
