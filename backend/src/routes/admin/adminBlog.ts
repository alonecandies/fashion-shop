import AuthController from "@src/controllers/auth";
import BlogController from "@src/controllers/Blog";
import { Router } from "express";

export default class AdminBlogRouter {
  public router: Router;
  private blogController: BlogController;

  constructor() {
    this.router = Router();
    this.blogController = new BlogController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.blogController.getAllBlog);
    this.router.get("/:id", this.blogController.getBlogById);
    this.router.post("/", this.blogController.createBlog);
    this.router.put("/", this.blogController.updateBlog);
    this.router.put("/status", this.blogController.updateStatusBlog);
    this.router.delete("/:id", this.blogController.deleteBlog);
  }
}