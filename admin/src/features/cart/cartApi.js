import { axiosMethod, axiosRequest } from 'src/utils/handleApiRequest';
import cookies from 'js-cookie';
import makeQuery from 'src/utils/makeQuery';

class CartApi {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    this.cartApiEndpoint = this.apiEndpoint + '/admin/cart';
    this.token = cookies.get('token');
  }

  getAllCarts = ({ userId, phone, status, order, fromDate, toDate, page, pageSize, token }) => {
    const filter = {
      user_id: userId,
      phone,
      status,
      order,
      from_date: fromDate,
      to_date: toDate,
      page,
      pageSize
    };
    const query = makeQuery(filter);
    return axiosRequest(this.cartApiEndpoint + `/all/${query}`, axiosMethod.GET, token, null);
  };
  getCartById = ({ id, token }) => {
    return axiosRequest(this.cartApiEndpoint + `/${id}`, axiosMethod.GET, token, null);
  };
  updateCartStatus = ({ data, token }) => {
    return axiosRequest(this.cartApiEndpoint + `/status`, axiosMethod.PUT, token, data);
  };
  deleteCart = ({ id, token }) => {
    return axiosRequest(this.cartApiEndpoint + `/${id}`, axiosMethod.DELETE, token, null);
  };
}

export default new CartApi();
