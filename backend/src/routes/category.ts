import { Router } from "express";
import CategoryController from '@src/controllers/category'

export default class CategoryRouter {
  public router: Router;
  private categoryController: CategoryController;

  public constructor() {
    this.router = Router();
    this.categoryController = new CategoryController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.categoryController.getAllCategory);
    // this.router.get("/lv1/all", this.categoryController.getAllCategoryLevel1);
    // this.router.get("/lv0/all", this.categoryController.getAllCategoryLevel0);
  }

}