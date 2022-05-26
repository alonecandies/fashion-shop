import AuthController from "@src/controllers/auth";
import ProductImageController from "@src/controllers/product/productImage";
import { Router } from "express";

export default class AdminProductTagRouter {
  public router: Router;
  private productImageController: ProductImageController;

  constructor() {
    this.router = Router();
    this.productImageController = new ProductImageController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.productImageController.getAllProductImage);
    this.router.get("/:id", this.productImageController.getProductImageById);
    this.router.get("/product/:id", this.productImageController.getProductImageByProduct);
    this.router.post("/", this.productImageController.createProductImage);
    this.router.put("/", this.productImageController.updateProductImage);
    this.router.delete("/:id", this.productImageController.deleteProductImage);
  }
}