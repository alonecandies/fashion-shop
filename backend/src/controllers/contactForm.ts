import { get } from "lodash";
import ContactFormModel from '@src/models/form_contact';
import ContactFormService from '@src/services/contactFormService';
import { badRequest, created, ok, unAuthorize } from "@src/middleware/response";
import { NextFunction, Request, Response } from "express";
import { COMMON_SUCCESS } from "@src/config/message";
import { PAGE_SIZE } from "@src/config";

export default class CategoryController {

  public async getAllContactForm(req: Request, res: Response, next: NextFunction) {
    try {
      const phone = get(req, "query.phone", "");
      const check = get(req, "query.check", "");
      const page = parseInt(get(req, "query.page", 0));
      const pageSize = parseInt(get(req, "query.pageSize", PAGE_SIZE.Standand));
      const formService = new ContactFormService();
      let results = await formService.getAllContactForm(phone, check, page, pageSize);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async getContactFormById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const formService = new ContactFormService();
      let results = await formService.getDetailsContactForm(id);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async createContactForm(req: Request, res: Response, next: NextFunction) {
    try {
      const form: ContactFormModel = req.body;
      const formService = new ContactFormService();
      let results = await formService.createContactForm(form);
      return created(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async seenContactForm(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const formService = new ContactFormService();
      const form = await formService.getDetailsContactForm(id);
      if (!form) return badRequest({ message: "Find Form not found!" }, req, res);
      let results = await formService.seenContactForm(form);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async deleteContactForm(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const formService = new ContactFormService();
      const form = await formService.getDetailsContactForm(id);
      if (!form) return badRequest({ message: "Delete fail!" }, req, res);
      await formService.deleteContactForm(form);
      return ok({ message: COMMON_SUCCESS.deleted }, req, res);
    } catch (err) {
      next(err);
    }
  }

}