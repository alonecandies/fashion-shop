import AuthController from "@src/controllers/auth";
import ProductColorController from "@src/controllers/product/productColor";
import { Router } from "express";

export default class AdminProductColorRouter {
  public router: Router;
  private productColorController: ProductColorController;

  constructor() {
    this.router = Router();
    this.productColorController = new ProductColorController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.productColorController.getAllProductColor);
    this.router.get("/:id", this.productColorController.getProductColorById);
    this.router.post("/", this.productColorController.createProductColor);
    this.router.put("/", this.productColorController.updateProductColor);
    this.router.delete("/:id", this.productColorController.deleteProductColor);
  }
}