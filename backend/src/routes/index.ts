import { Router } from "express";
import UserRouter from "./user";
import CategoryRouter from "./category";
import BannerImageRouter from "./bannerImage";
import ProductRouter from "./product";
import ProducttagRouter from "./productTag";
import ContactFormRouter from "./contactForm";
import ImageRouter from "./image";
import BlogCategoryRouter from "./blogCategory";
import BlogRouter from "./blog";
import ShoppingCartRouter from "./shoppingCart";
import AdminRouter from "./admin/index";
import AuthController from "@src/controllers/auth";
class MainRoutes {
    public routers: Router;
    private authController: AuthController;
  
    constructor() {
      this.routers = Router();
      this.authController = new AuthController();
      this.config();
    }
  
    private config() {
      // admin
      this.routers.use("/admin", new AdminRouter().routers);
      // Customer
      this.routers.use("/user", new UserRouter().router);
      this.routers.use("/category", new CategoryRouter().router);
      this.routers.use("/blog-category", new BlogCategoryRouter().router);
      this.routers.use("/banner", new BannerImageRouter().router);
      this.routers.use("/product", new ProductRouter().router);
      this.routers.use("/product-tag", new ProducttagRouter().router);
      this.routers.use("/blog", new BlogRouter().router);
      this.routers.use("/contact-form", new ContactFormRouter().router);
      this.routers.use("/image", this.authController.authenticateJWT, new ImageRouter().router);
      this.routers.use("/cart", new ShoppingCartRouter().router);
    }
  }
  
  export default new MainRoutes().routers;