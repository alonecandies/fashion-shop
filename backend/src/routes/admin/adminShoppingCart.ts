import { Router } from "express";
import ShoppingCartController from '@src/controllers/shoppingCart';

export default class AdminShoppingCartRouter {
  public router: Router;
  private shoppingCartController: ShoppingCartController;

  public constructor() {
    this.router = Router();
    this.shoppingCartController = new ShoppingCartController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.shoppingCartController.getAllShoppingCart);
    this.router.get("/:id", this.shoppingCartController.getDetailsShoppingCart);
    this.router.put("/status", this.shoppingCartController.updateStatusCart);
    this.router.delete("/:id", this.shoppingCartController.deleteCart);
  }
}