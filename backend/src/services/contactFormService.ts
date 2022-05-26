import { IS_DELETED, PAGE_SIZE } from "@src/config";
import HttpException from "@src/middleware/exceptions/httpException";
import logger from "@src/middleware/logger";
import { ok } from "@src/middleware/response";
import ContactFormModel from '@src/models/form_contact';
import { raw, transaction } from "objection";


export default class CategoryService {
  public async getAllContactForm(
    phone = "",
    check = undefined,
    page = 0,
    pageSize = PAGE_SIZE.Standand
  ): Promise<any> {
    try {
      let query = ContactFormModel.query()
        .select(["*"]).where("is_deleted", IS_DELETED.No);

        if (phone) {
          query = query.where(builder => builder.where("phone", phone))
        }
        if (check) {
          query = query.where(builder => builder.where("is_checked", check))
        }
        return query.orderBy("created_at", "desc").page(page, pageSize);
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getDetailsContactForm(id): Promise<ContactFormModel> {
    try {
      const result = await ContactFormModel.query().findById(id);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async createContactForm(form: ContactFormModel): Promise<ContactFormModel> {
    try {
      form.is_deleted = IS_DELETED.No;
      form.is_checked = 1;
      const newForm = await ContactFormModel.query().insert(form);
      return newForm;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async seenContactForm(form: ContactFormModel): Promise<ContactFormModel> {
    try {
      form.is_checked = 1;
      const newForm = await ContactFormModel.query().updateAndFetchById(form.id, form);
      return newForm;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async deleteContactForm(form: ContactFormModel): Promise<ContactFormModel> {
    try {
      form.is_deleted = IS_DELETED.Yes;
      const newForm = await ContactFormModel.query().updateAndFetchById(form.id, form);
      return newForm;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

}