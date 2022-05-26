import { API_ENDPOINT } from '@src/configs';
import { axiosRequest } from '@src/utils/requestServerUtil';

class BannerApi {
  bannerApiEndpoint: string;

  constructor() {
    this.bannerApiEndpoint = `${API_ENDPOINT}/banner`;
  }

  getAllBanners() {
    return axiosRequest(this.bannerApiEndpoint + '/all', null, 'GET', '', null);
  }
}

export default new BannerApi();
