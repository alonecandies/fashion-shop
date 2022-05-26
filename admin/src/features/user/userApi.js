import { axiosMethod, axiosRequest } from 'src/utils/handleApiRequest';
import * as _ from 'lodash';

class UserApi {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    this.userApiEndpoint = this.apiEndpoint + '/admin/user';
  }

  getAllUsers = ({ name, order, status, page, pageSize, token }) => {
    return axiosRequest(
      this.userApiEndpoint +
        `/all/?name=${name}&order=${order}&status=${status}&page=${page}&pageSize=${pageSize}`,
      axiosMethod.GET,
      token,
      null
    );
  };

  getUserById = ({ id, token }) => {
    return axiosRequest(this.userApiEndpoint + `/${id}`, axiosMethod.GET, token, null);
  };

  updateUserStatus = ({ data, token }) => {
    return axiosRequest(this.userApiEndpoint + '/status', axiosMethod.PUT, token, data);
  };

  updateUser = ({ data, token }) => {
    return axiosRequest(
      this.userApiEndpoint + `/${data.id}`,
      axiosMethod.PUT,
      token,
      _.omit(data, ['id', 'email', 'created_at'])
    );
  };
}

export default new UserApi();
