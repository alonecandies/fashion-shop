import { Router } from "express";
import ImageController from '@src/controllers/imageController';
import ImageUtils from '@src/middleware/uploadImage';

export default class ImageRouter {
  public router: Router;
  private imageController: ImageController;
  private imageUtils: ImageUtils;

  public constructor() {
    this.router = Router();
    this.imageController = new ImageController();
    this.imageUtils = new ImageUtils();
    this.config();
  }
  private config() {
    this.router.post("/upload", this.imageUtils.upload.single('file') ,this.imageController.uploadImage);
  }

}