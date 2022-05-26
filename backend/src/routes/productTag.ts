import ProductTagController from "@src/controllers/product/productTag";
import { Router } from "express";

export default class ProductTagRouter {
  public router: Router;
  private productTagController: ProductTagController;

  constructor() {
    this.router = Router();
    this.productTagController = new ProductTagController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.productTagController.getAllProductTag);
    this.router.get("/full", this.productTagController.getAllProductFull);
    this.router.get("/:id", this.productTagController.getProductTagById);
  }
}