import { Router } from "express";
import ShoppingCartController from '@src/controllers/shoppingCart';
import AuthController from "@src/controllers/auth";

export default class ShoppingCartRouter {
  public router: Router;
  private shoppingCartController: ShoppingCartController;
  private authController: AuthController;

  public constructor() {
    this.router = Router();
    this.shoppingCartController = new ShoppingCartController();
    this.authController = new AuthController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.authController.authenticateJWT, this.shoppingCartController.getAllShoppingCartUser);
    this.router.get("/:id", this.authController.authenticateJWT, this.shoppingCartController.getDetailsShoppingCart);
    this.router.post("/", this.authController.authenticateJWT, this.shoppingCartController.createShoppingCart);
  }

}