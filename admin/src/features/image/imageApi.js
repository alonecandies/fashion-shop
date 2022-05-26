import { axiosMethod, axiosRequest } from 'src/utils/handleApiRequest';

class UserApi {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    this.imageApiEndpoint = this.apiEndpoint + '/image';
  }

  uploadImage = ({ file, token }) => {
    const formData = new FormData();
    formData.append(`file`, file);
    return axiosRequest(this.imageApiEndpoint + `/upload`, axiosMethod.POST, token, formData);
  };
}

export default new UserApi();
