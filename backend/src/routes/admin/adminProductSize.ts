import AuthController from "@src/controllers/auth";
import ProductSizeController from "@src/controllers/product/productSize";
import { Router } from "express";

export default class AdminProductSizeRouter {
  public router: Router;
  private productSizeController: ProductSizeController;

  constructor() {
    this.router = Router();
    this.productSizeController = new ProductSizeController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.productSizeController.getAllProductSize);
    this.router.get("/:id", this.productSizeController.getProductSizeById);
    this.router.post("/", this.productSizeController.createProductSize);
    this.router.put("/", this.productSizeController.updateProductSize);
    this.router.delete("/:id", this.productSizeController.deleteProductSize);
  }
}