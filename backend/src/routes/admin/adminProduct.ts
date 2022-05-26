import AuthController from "@src/controllers/auth";
import ProductController from "@src/controllers/product/product";
import { Router } from "express";

export default class AdminProductRouter {
  public router: Router;
  private productController: ProductController;

  constructor() {
    this.router = Router();
    this.productController = new ProductController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.productController.getAllProduct);
    this.router.get("/:id", this.productController.getProductById);
    this.router.post("/", this.productController.createProduct);
    this.router.put("/", this.productController.updateProduct);
    this.router.put("/status", this.productController.updateStatusProduct);
    this.router.put("/out-of-stock", this.productController.updateNumberOfProduct);
    this.router.delete("/:id", this.productController.deleteProduct);
  }
}