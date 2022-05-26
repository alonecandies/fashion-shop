import AuthController from "@src/controllers/auth";
import FormController from "@src/controllers/contactForm";
import { Router } from "express";

export default class AdminProductSizeRouter {
  public router: Router;
  private contactFormController: FormController;

  constructor() {
    this.router = Router();
    this.contactFormController = new FormController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.contactFormController.getAllContactForm);
    this.router.get("/:id", this.contactFormController.getContactFormById);
    this.router.get("seen/:id", this.contactFormController.seenContactForm);
    this.router.delete("/:id", this.contactFormController.deleteContactForm);
  }
}