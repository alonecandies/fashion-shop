import AuthController from "@src/controllers/auth";
import CategoryController from "@src/controllers/category";
import { Router } from "express";

export default class AdminCategoryRouter {
  public router: Router;
  private categoryController: CategoryController;

  constructor() {
    this.router = Router();
    this.categoryController = new CategoryController();
    this.config();
  }

  private config() {
    this.router.get("/all", this.categoryController.getAllCategory);
    this.router.get("/:level/:id", this.categoryController.getCategoryById);
    this.router.post("/", this.categoryController.createCategory);
    this.router.put("/:level/", this.categoryController.updateCategory);
    this.router.delete("/:level/:id", this.categoryController.deleteCategory);
    // lv1
    // this.router.get("/lv1/all", this.categoryController.getAllCategoryLevel1);
    // this.router.get("/lv1/:id", this.categoryController.getCategoryLevel1ById);
    // this.router.post("/lv1/", this.categoryController.createCategoryLevel1);
    // this.router.put("/lv1/", this.categoryController.updateCategoryLevel1);
    // this.router.delete("/lv1/:id", this.categoryController.deleteCategoryLevel1);
    // lv 0
    // this.router.get("/lv0/all", this.categoryController.getAllCategoryLevel0);
    // this.router.get("/lv0/:id", this.categoryController.getCategoryLevel0ById);
    // this.router.post("/lv0/", this.categoryController.createCategoryLevel0);
    // this.router.put("/lv0/", this.categoryController.updateCategoryLevel0);
    // this.router.delete("/lv0/:id", this.categoryController.deleteCategoryLevel0);
  }
}