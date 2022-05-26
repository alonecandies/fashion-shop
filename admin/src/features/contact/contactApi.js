import { axiosMethod, axiosRequest } from 'src/utils/handleApiRequest';
import cookies from 'js-cookie';
import makeQuery from 'src/utils/makeQuery';

class ContactApi {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    this.contactApiEndpoint = this.apiEndpoint + '/admin/contact-form';
    this.token = cookies.get('token');
  }

  getAllContacts = ({ phone, check, page, pageSize, token }) => {
    const filter = {
      phone,
      check,
      page,
      pageSize
    };
    const query = makeQuery(filter);
    return axiosRequest(this.contactApiEndpoint + `/all${query}`, axiosMethod.GET, token, null);
  };
  getContactById = ({ id, token }) => {
    return axiosRequest(this.contactApiEndpoint + `/${id}`, axiosMethod.GET, token, null);
  };
  seenContact = ({ id, token }) => {
    return axiosRequest(this.contactApiEndpoint + `/${id}`, axiosMethod.GET, token, null);
  };
  deleteContact = ({ id, token }) => {
    return axiosRequest(this.contactApiEndpoint + `/${id}`, axiosMethod.DELETE, token, null);
  };
}

export default new ContactApi();
