import { axiosMethod, axiosRequest } from 'src/utils/handleApiRequest';
import cookies from 'js-cookie';

class BannerApi {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    this.bannerApiEndpoint = this.apiEndpoint + '/admin/banner';
    this.token = cookies.get('token');
  }

  getAllBanners = ({ type, title, token }) => {
    return axiosRequest(
      this.bannerApiEndpoint + `/all?type=${type}&title=${title}`,
      axiosMethod.GET,
      token,
      null
    );
  };
  getBannerById = ({ id, token }) => {
    return axiosRequest(this.bannerApiEndpoint + `/${id}`, axiosMethod.GET, token, null);
  };
  createBanner = ({ title, type, url, token }) => {
    return axiosRequest(this.bannerApiEndpoint + `/`, axiosMethod.POST, token, {
      title,
      type,
      url
    });
  };
  updateBanner = ({ data, token }) => {
    return axiosRequest(this.bannerApiEndpoint + `/`, axiosMethod.PUT, token, data);
  };
  deleteBanner = ({ id, token }) => {
    return axiosRequest(this.bannerApiEndpoint + `/${id}`, axiosMethod.DELETE, token, null);
  };
}

export default new BannerApi();
