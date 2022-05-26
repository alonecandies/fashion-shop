import { axiosMethod, axiosRequest } from 'src/utils/handleApiRequest';

class AuthenApi {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    this.authenApiEndpoint = this.apiEndpoint + '/user';
  }

  register({ email, password, name, phone, address }) {
    return axiosRequest(this.authenApiEndpoint + '/signup', axiosMethod.POST, null, {
      full_name: name,
      email,
      password,
      phone,
      address
    });
  }

  login({ email, password, remember }) {
    return axiosRequest(this.authenApiEndpoint + '/admin/login', axiosMethod.POST, null, {
      email,
      password,
      remember_me: remember ? 1 : 0
    } );
  }

  getInformation({ token }) {
    return axiosRequest(this.authenApiEndpoint, axiosMethod.GET, token, null);
  }

  changePassword({ token, oldPassword, newPassword }) {
    return axiosRequest(this.authenApiEndpoint + '/password', axiosMethod.POST, token, {
      old_pass: oldPassword,
      new_pass: newPassword
    });
  }

  updateInfo({ token, id, name, phone, address }) {
    return axiosRequest(this.apiEndpoint + `/admin/user/${id}`, axiosMethod.PUT, token, {
      full_name: name,
      phone: phone,
      address: address
    });
  }
}

export default new AuthenApi();
