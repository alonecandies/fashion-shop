import AuthController from "@src/controllers/auth";
import UserController from "@src/controllers/user";

// import { checkRole, permissionsEmp } from '@src/middleware/roles';
import { Router } from "express";


export default class UsersRouter {
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
    /** login with email and password */
    this.router.post("/login", this.userController.login);
    this.router.post("/admin/login", this.userController.loginAdmin);
    this.router.post("/refreshToken", this.authController.authenticateJWT, this.userController.refreshToken);
    this.router.get("/", this.authController.authenticateJWT, this.userController.get);
    this.router.get("/purchased-product ", this.authController.authenticateJWT, this.userController.getPurchasedProduct ); // doing
    this.router.post("/signup", this.userController.signup);
    this.router.post("/password",this.authController.authenticateJWT, this.userController.changePassword);
    this.router.put("/:id",this.authController.authenticateJWT, this.userController.updateUser);
    this.router.post("/set-password", this.userController.setPassword);
    this.router.post("/forgot-password", this.userController.forgotPassword);
  }

}