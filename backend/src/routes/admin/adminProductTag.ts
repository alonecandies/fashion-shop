import AuthController from "@src/controllers/auth";
import ProductTagController from "@src/controllers/product/productTag";
import { Router } from "express";

export default class AdminProductTagRouter {
  public router: Router;
  private productTagController: ProductTagController;

  constructor() {
    this.router = Router();
    this.productTagController = new ProductTagController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.productTagController.getAllProductTag);
    this.router.get("/:id", this.productTagController.getProductTagById);
    this.router.post("/", this.productTagController.createProductTag);
    this.router.put("/", this.productTagController.updateProductTag);
    this.router.delete("/:id", this.productTagController.deleteProductTag);
  }
}