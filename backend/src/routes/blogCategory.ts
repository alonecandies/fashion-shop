import { Router } from "express";
import BlogCategoryController from '@src/controllers/BlogCategory'

export default class CategoryRouter {
  public router: Router;
  private blogCategoryController: BlogCategoryController;

  public constructor() {
    this.router = Router();
    this.blogCategoryController = new BlogCategoryController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.blogCategoryController.getAllBlogCategory);
  }

}