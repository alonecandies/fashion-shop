import { API_ENDPOINT } from '@src/configs';
import { axiosRequest, cleanObject } from '@src/utils/requestServerUtil';
import { IGetAllParams, IOrderBody } from './order.types';

class AuthenApi {
  orderApiEndpoint: string;

  constructor() {
    this.orderApiEndpoint = `${API_ENDPOINT}/cart`;
  }

  getAll(params: IGetAllParams, token: string) {
    return axiosRequest(this.orderApiEndpoint + '/all', params, 'GET', token);
  }

  getDetail(id: number, token: string) {
    return axiosRequest(this.orderApiEndpoint + `/${id}`, null, 'GET', token);
  }

  createOrder(data: IOrderBody, token: string) {
    const validKeys = ['address', 'phone', 'full_name', 'orders'];
    return axiosRequest(
      this.orderApiEndpoint + '/',
      null,
      'POST',
      token,
      cleanObject(validKeys, data)
    );
  }
}

export default new AuthenApi();
