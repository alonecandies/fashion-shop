import { API_ENDPOINT } from '@src/configs';
import { axiosRequest, cleanObject } from '@src/utils/requestServerUtil';
import { IContactBody } from './contact.types';

class ContactApi {
  contactApiEndpoint: string;

  constructor() {
    this.contactApiEndpoint = `${API_ENDPOINT}/contact-form`;
  }

  contact(data: IContactBody) {
    let validKeys = ['full_name', 'email', 'phone', 'content'];
    return axiosRequest(this.contactApiEndpoint, null, 'POST', '', cleanObject(validKeys, data));
  }
}

export default new ContactApi();
