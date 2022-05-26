import { Router } from "express";
import BlogController from '@src/controllers/Blog';

export default class BlogRouter {
  public router: Router;
  private blogController: BlogController;

  public constructor() {
    this.router = Router();
    this.blogController = new BlogController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.blogController.getAllBlog);
    this.router.get("/:id", this.blogController.getBlogById);
    this.router.get("/viewed/:id", this.blogController.updateViewedBlog);
    this.router.get("/liked/:id", this.blogController.updateLikedBlog);
  }

}