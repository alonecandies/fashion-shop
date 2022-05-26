import { Router } from "express";
import FormController from '@src/controllers/contactForm'

export default class ContactFormRouter {
  public router: Router;
  private formController: FormController;

  public constructor() {
    this.router = Router();
    this.formController = new FormController();
    this.config();
  }

  private config() {
    this.router.post("/", this.formController.createContactForm);
  }

}