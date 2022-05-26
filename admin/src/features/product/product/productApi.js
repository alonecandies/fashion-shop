import { axiosMethod, axiosRequest } from 'src/utils/handleApiRequest';
import makeQuery from 'src/utils/makeQuery';
import _ from 'lodash';

class ProductApi {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    this.productApiEndpoint = this.apiEndpoint + '/admin/product';
  }

  getAllProducts({ category, name, code, order, status, type, tagId, page, pageSize, token }) {
    const filter = {
      category_id: category.id,
      level: category.level,
      name,
      code,
      order,
      status,
      type,
      tag: tagId,
      page,
      pageSize
    };
    const query = makeQuery(filter);
    return axiosRequest(this.productApiEndpoint + `/all/${query}`, axiosMethod.GET, token, null);
  }

  getProductById({ productId, token }) {
    return axiosRequest(this.productApiEndpoint + `/${productId}`, axiosMethod.GET, token, null);
  }

  createProduct({ product, token }) {
    return axiosRequest(
      this.productApiEndpoint + `/`,
      axiosMethod.POST,
      token,
      _.omit(
        {
          ...product,
          web_price: product.webPrice,
          category_id: product.category.id,
          out_of_stock: 0
        },
        ['webPrice', 'category']
      )
    );
  }

  updateProduct({ product, token }) {
    return axiosRequest(
      this.productApiEndpoint + `/`,
      axiosMethod.PUT,
      token,
      _.omit(
        {
          ...product,
          web_price: product.webPrice,
          category_id: product.category.id
        },
        [
          'webPrice',
          'category',
          'product_category_name',
          'updated_at',
          'created_at',
          'number_of_likes',
          'viewd',
          'is_deleted',
          'type',
          'images'
        ]
      )
    );
  }

  updateStatus({ product, token }) {
    return axiosRequest(this.productApiEndpoint + `/status`, axiosMethod.PUT, token, {
      ...product
    });
  }

  updateStock({ product, token }) {
    const data = { id: product.id, out_of_stock: product.outOfStock };
    return axiosRequest(this.productApiEndpoint + `/out-of-stock`, axiosMethod.PUT, token, data);
  }

  deleteProduct({ productId, token }) {
    return axiosRequest(this.productApiEndpoint + `/${productId}`, axiosMethod.DELETE, token, null);
  }
}

export default new ProductApi();
