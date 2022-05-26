import AuthController from "@src/controllers/auth";
import BannerImageController from "@src/controllers/bannerImage";
import { Router } from "express";

export default class AdminBannerImageRouter {
    public router: Router;
    private bannerImageController: BannerImageController;
  
    constructor() {
      this.router = Router();
      this.bannerImageController = new BannerImageController();
      this.config();
    }
  
    private config() {
      this.router.get("/all", this.bannerImageController.getAllBannerImage);
      this.router.get("/:id", this.bannerImageController.getBannerImageById);
      this.router.post("/", this.bannerImageController.createBannerImage);
      this.router.put("/", this.bannerImageController.updateBannerImage);
      this.router.delete("/:id", this.bannerImageController.deleteBannerImage);
    }
  }