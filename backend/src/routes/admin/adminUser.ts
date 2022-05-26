import AuthController from "@src/controllers/auth";
import UserController from "@src/controllers/user";
import { Router } from "express";
import { USER_ROLE } from "@src/config";

export default class AdminUserRouter {
    public router: Router;
    private userController: UserController;
    private authController: AuthController;
  
    constructor() {
      this.router = Router();
      this.userController = new UserController();
      this.authController = new AuthController();
      this.config();
    }
  
    private config() {
      this.router.get("/all", this.userController.getListAdminUsers);
      this.router.get("/:id", this.userController.getUserAdminDetails);
      this.router.put("/status", this.userController.changeStatusUser);
      this.router.put("/:id", this.userController.updateUser);
    }
  }