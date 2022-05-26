import AuthController from "@src/controllers/auth";
import BlogCategoryController from "@src/controllers/BlogCategory";
import { Router } from "express";

export default class AdminCategoryRouter {
  public router: Router;
  private categoryController: BlogCategoryController;

  constructor() {
    this.router = Router();
    this.categoryController = new BlogCategoryController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.categoryController.getAllBlogCategory);
    this.router.get("/:id", this.categoryController.getBlogCategoryById);
    this.router.post("/", this.categoryController.createBlogCategory);
    this.router.put("/", this.categoryController.updateBlogCategory);
    this.router.delete("/:id", this.categoryController.deleteBlogCategory);
  }
}