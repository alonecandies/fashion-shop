import { API_ENDPOINT } from '@src/configs';
import { axiosRequest, cleanObject } from '@src/utils/requestServerUtil';
import {
  ILoginBody,
  IRegisterBody,
  IUpdateUserBody,
  IChangePasswordBody,
  IForgotPasswordBody,
  IResetPasswordBody
} from './authen.types';

class AuthenApi {
  authenApiEndpoint: string;

  constructor() {
    this.authenApiEndpoint = `${API_ENDPOINT}/user`;
  }

  register(data: IRegisterBody) {
    const validKeys = ['email', 'password', 'full_name', 'address', 'phone'];
    return axiosRequest(
      this.authenApiEndpoint + '/signup',
      null,
      'POST',
      '',
      cleanObject(validKeys, data)
    );
  }

  login(data: ILoginBody) {
    const validKeys = ['email', 'password'];
    return axiosRequest(
      this.authenApiEndpoint + '/login',
      null,
      'POST',
      '',
      cleanObject(validKeys, data)
    );
  }

  getInformation(token: string) {
    return axiosRequest(this.authenApiEndpoint, null, 'GET', token);
  }

  updateInfo(token: string, data: IUpdateUserBody) {
    const validKeys = ['full_name', 'phone', 'address'];
    return axiosRequest(
      this.authenApiEndpoint + `/${data.id}`,
      null,
      'PUT',
      token,
      cleanObject(validKeys, data)
    );
  }

  changePassword(token: string, data: IChangePasswordBody) {
    const validKeys = ['old_pass', 'new_pass'];
    return axiosRequest(
      this.authenApiEndpoint + '/password',
      null,
      'POST',
      token,
      cleanObject(validKeys, data)
    );
  }

  forgotPassword(data: IForgotPasswordBody) {
    const validKeys = ['email'];
    return axiosRequest(
      this.authenApiEndpoint + '/forgot-password',
      null,
      'POST',
      '',
      cleanObject(validKeys, data)
    );
  }

  resetPassword(data: IResetPasswordBody) {
    const validKeys = ['token', 'password'];
    return axiosRequest(
      this.authenApiEndpoint + '/set-password',
      null,
      'POST',
      '',
      cleanObject(validKeys, data)
    );
  }
}

export default new AuthenApi();
