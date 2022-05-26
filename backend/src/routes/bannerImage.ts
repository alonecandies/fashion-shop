import { Router } from "express";
import BannerImageController from '@src/controllers/bannerImage'

export default class BannerImageRouter {
  public router: Router;
  private bannerImageController: BannerImageController;

  public constructor() {
    this.router = Router();
    this.bannerImageController = new BannerImageController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.bannerImageController.getAllBannerImage);
  }

}