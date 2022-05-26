import { Router } from "express";
import ProductController from '@src/controllers/product/product';

export default class ProductRouter {
  public router: Router;
  private productController: ProductController;

  public constructor() {
    this.router = Router();
    this.productController = new ProductController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.productController.getAllProduct);
    this.router.get("/:id", this.productController.getProductById);
    this.router.put("/viewed/:id", this.productController.updateViewedProduct);
    this.router.put("/liked/:id", this.productController.updateLikedProduct);
  }

}