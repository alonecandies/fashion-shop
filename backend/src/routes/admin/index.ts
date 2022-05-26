import { Router } from "express";
import { checkRole } from '@src/middleware/role';
import AuthController from "@src/controllers/auth";

import AdminUserRouter from './adminUser';
import AdminCategoryRouter from './adminCategory';
import AdminBannerImageRouter from './adminBannerImage';
import AdminProductColorRouter from './adminProductColor';
import AdminProductSizeRouter from './adminProductSize';
import AdminProductTagRouter from './adminProductTag';
import AdminProductImageRouter from './adminProductImage';
import AdminProductRouter from './adminProduct';
import AdminFormRouter from './adminContactForm';
import AdminBlogRouter from './adminBlog';
import AdminBlogCategory from './adminBlogCategory';
import AdminShoppingCartCategory from './adminShoppingCart';

export default class AdminsRouter {
  public routers: Router;
  private authController: AuthController;

  constructor() {
    this.routers = Router();
    this.authController = new AuthController();
    this.config();
  }

  private config() {
    this.routers.use("/user", this.authController.authenticateJWT, checkRole(), new AdminUserRouter().router);
    this.routers.use("/category", this.authController.authenticateJWT, checkRole(), new AdminCategoryRouter().router);
    this.routers.use("/banner", this.authController.authenticateJWT, checkRole(), new AdminBannerImageRouter().router);
    this.routers.use("/product-color", this.authController.authenticateJWT, checkRole(), new AdminProductColorRouter().router);
    this.routers.use("/product-size", this.authController.authenticateJWT, checkRole(), new AdminProductSizeRouter().router);
    this.routers.use("/product-tag", this.authController.authenticateJWT, checkRole(), new AdminProductTagRouter().router);
    this.routers.use("/product-image", this.authController.authenticateJWT, checkRole(), new AdminProductImageRouter().router);
    this.routers.use("/product", this.authController.authenticateJWT, checkRole(), new AdminProductRouter().router);
    this.routers.use("/blog", this.authController.authenticateJWT, checkRole(), new AdminBlogRouter().router);
    this.routers.use("/contact-form", this.authController.authenticateJWT, checkRole(), new AdminFormRouter().router);
    this.routers.use("/blog-category", this.authController.authenticateJWT, checkRole(), new AdminBlogCategory().router);
    this.routers.use("/cart", this.authController.authenticateJWT, checkRole(), new AdminShoppingCartCategory().router);
  }
}