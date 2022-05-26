import { get } from "lodash";
import moment from "moment";
import bcrypt from "bcryptjs";
import passport from "passport";
import { NextFunction, Request, Response } from "express";
import MsValidate from "@src/utils/validate";
import { badRequest, created, ok, unAuthorize } from "@src/middleware/response";
import UserModel from "@src/models/user";
import { logger } from "@src/middleware";
import { BLOG_MESSAGE, COMMON_ERROR, COMMON_SUCCESS, USER_MESSAGE } from "@src/config/message";
import UserService from "@src/services/userService";
import UserSessionService from "@src/services/userSessionService";
import { USER_ROLE, PAGE_SIZE, USER_STATUS } from "@src/config";
import MailUtils from "@src/utils/sendMail";

export default class UserController {
  /** login with email and password */
  public login(req: Request, res: Response, next: NextFunction): void {
    try {
      passport.authenticate("user-login", { session: false }, async (err, user, info) => {
        try {
          if (err) return next(err);
          if (user) {
            if (user.status != USER_STATUS.active) {
              return unAuthorize({ message: USER_MESSAGE.userNotActive }, req, res);
            }
            const remember_me = req.body.remember_me ? true : false;
            const userSessionBll = new UserSessionService();
            const result = await userSessionBll.create(user, remember_me);
            const auth_info = { access_token: result.access_token, refresh_token: result.refresh_token, expires_in: result.expires_in };
            delete user.password;
            const data = {
              auth_info,
              user_info: user
            };
            ok(data, req, res);
          }
        } catch (err) {
          next(err);
        }
      })(req, res);
    } catch (err) {
      next(err);
    }
  }

  public loginAdmin(req: Request, res: Response, next: NextFunction): void {
    try {
      passport.authenticate("user-login", { session: false }, async (err, user, info) => {
        try {
          if (err) return next(err);
          if (user) {
            if (user.status != USER_STATUS.active) {
              return unAuthorize({ message: USER_MESSAGE.userNotActive }, req, res);
            }
            if (user.role_id != USER_ROLE.Admin) {
              return unAuthorize({ message: COMMON_ERROR.forbidden }, req, res);
            }
            const remember_me = req.body.remember_me ? true : false;
            const userSessionBll = new UserSessionService();
            const result = await userSessionBll.create(user, remember_me);
            const auth_info = { access_token: result.access_token, refresh_token: result.refresh_token, expires_in: result.expires_in };
            delete user.password;
            const data = {
              auth_info,
              user_info: user
            };
            ok(data, req, res);
          }
        } catch (err) {
          next(err);
        }
      })(req, res);
    } catch (err) {
      next(err);
    }
  }

  public async getPurchasedProduct(req: Request, res: Response, next: NextFunction) {
    try {
      // doing
      return ok({ message: "list purchased procduct" }, req, res);
    } catch (err) {
      next(err)
    }
  }

  public async checkEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();
      const msValidate = new MsValidate();
      const body = await msValidate.validateCheckMail(req.body);
      const isExisted = await userService.findByEmailSafe(body.email);
      if (isExisted) {
        return next({ message: USER_MESSAGE.emailAlreadyExists });
      }
      return ok({ message: "Email is valid" }, req, res);
    } catch (err) {
      next(err);
    }
  }

  /** refresh token */
  public async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userSessionBll = new UserSessionService();
      const result = await userSessionBll.refreshToken(req.body.user as UserModel, req.body.refreshToken);
      res.status(200).send({ token: result.access_token, refresh_token: result.refresh_token, expires_in: result.expires_in });
    } catch (err) {
      next(err);
    }
  }

  public async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req["currentUser"] as UserModel;
      const { old_pass, new_pass } = req.body;
      const userService = new UserService();
      const userInfo = await userService.getUserByIdHavePassword(user.id);
      if (userInfo.is_deleted) {
        return unAuthorize({}, req, res);
      }
      const checkPassword = userService.checkPassword(userInfo, old_pass);
      if (checkPassword) {
        const userUpdate = userService.changePassword(userInfo, new_pass);
        if (userUpdate) return ok({ message: USER_MESSAGE.changePasswordSuccees }, req, res);
        else return badRequest({ message: USER_MESSAGE.ChangePasswordFail }, req, res);
      } else return badRequest({ message: USER_MESSAGE.PasswordNotMatch }, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      const mailUtil = new MailUtils();
      const userService = new UserService();
      const isExisted = await userService.findByEmailSafe(body.email);
      if (!isExisted) { return badRequest({ message: USER_MESSAGE.emailNotExists }, req, res); }

      const userSessionService = new UserSessionService();
      const result = await userSessionService.genTokenForgot(body);
      if (!result) {
        return badRequest({ message: COMMON_ERROR.pleaseTryAgain }, req, res);
      }      
      const sendMail = await mailUtil.forgotPassword(body.email, result.token);
      if (!sendMail) {
        return badRequest({ message: COMMON_ERROR.pleaseTryAgain }, req, res);
      }
      return ok({ message: COMMON_SUCCESS.default }, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async setPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      const userSessionService = new UserSessionService();
      const token = decodeURIComponent(body.token);
      const forgotModel = (await userSessionService.findTokenForgot(token))[0];
      if (forgotModel == null) {
        return badRequest({ message: USER_MESSAGE.tokenNotMatch }, req, res);
      }
      const email = forgotModel.email;
      const userService = new UserService();
      const isExisted = await userService.findByEmailSafe(email);
      if (!isExisted) { return badRequest({ message: USER_MESSAGE.tokenNotMatch }, req, res); }
      delete body.token;
      // const userUpdate = {
      //   password: body.password,
      //   email_verified: 1
      // };
      const user = await userService.changePassword(isExisted, body.password);
      if (user) {
        // send twilio to verified sms
        delete user.password;
        const result = await userSessionService.create(user);
        const auth_info = { access_token: result.access_token, refresh_token: result.refresh_token, expires_in: result.expires_in };
        const data = {
          auth_info,
          user_info: user
        };
        userSessionService.deleteForgotPassById(forgotModel.id).then();
        return created(data, req, res);
      }
    } catch (err) {
      next(err);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req["currentUser"] as UserModel;
      delete user.password;
      const userService = new UserService();
      const userInfo = await userService.getById(user.id);
      if (userInfo.is_deleted) {
        return unAuthorize({}, req, res);
      }

      const userResponse = new UserModel();
      userResponse.id = userInfo.id;
      userResponse.full_name = userInfo.full_name;
      userResponse.created_at = userInfo.created_at;
      userResponse.updated_at = userInfo.updated_at;
      userResponse.is_deleted = userInfo.is_deleted;
      userResponse.email_verified = userInfo.email_verified;
      userResponse.email = userInfo.email;
      userResponse.status = userInfo.status;
      userResponse.phone = userInfo.phone;
      userResponse.address = userInfo.address;
      userResponse.role_id = userInfo.role_id;

      return ok(userResponse, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async getListAdminUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userService = new UserService();
      const name = get(req, "query.name", "");
      const order = get(req, "query.order", null);
      const status = get(req, "query.status", null);
      const page = parseInt(get(req, "query.page", 0));
      const pageSize = parseInt(get(req, "query.pageSize", PAGE_SIZE.Standand));
      const listUser = await userService.getListUsers(name, order, status, page, pageSize);

      return ok(listUser, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async changeStatusUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, status } = req.body;
      const userService = new UserService();
      const user = await userService.getById(id);
      if (!user) return badRequest({ message: "Find not found this user!" }, req, res);
      let results = await userService.changeStatusUser(user, status);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }


  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const msValidate = new MsValidate();
      const body = await msValidate.validateUpateUser(req.body);
      const id = get(req, "params.id", 0);
      const userService = new UserService();
      const user = await userService.getById(id);
      if (!user) { return badRequest({ message: USER_MESSAGE.userNotExist }, req, res) }
      const newUser = await userService.updateUser(user.id, body);
      return ok(newUser, req, res);
    } catch (err) {
      next(err);
    }
  }

  // sign up
  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      // check validate
      const msValidate = new MsValidate();
      //delete req.body["g-recaptcha-response"];
      // const ref = decodeURIComponent(req.body["ref"]);
      // delete req.body["ref"];
      const body = await msValidate.validateSignup(req.body);
      body['role_id'] = USER_ROLE.Customer;
      // create new user
      const userService = new UserService();
      // delete body.verified_code;
      const isExisted = await userService.findByEmailSafe(body.email);
      if (isExisted) { return badRequest({ message: USER_MESSAGE.emailAlreadyExists }, req, res); }
      const user = await userService.create(body);
      if (user) {
        delete user.password;
        const userSessionBll = new UserSessionService();
        const result = await userSessionBll.create(user, false);
        const auth_info = { access_token: result.access_token, refresh_token: result.refresh_token, expires_in: result.expires_in };
        delete result["password"];
        const data = {
          auth_info,
          user_info: user
        };

        // send mail
        //  const mailUtil = new MailUtils();
        //  const sendMail = await mailUtil.activeAccount(body.email, user.verified_token);
        //  if (!sendMail) {
        //    return badRequest({ message: COMMON_ERROR.sendMailError }, req, res);
        //  }

        return created(data, req, res);
      }
    } catch (err) {
      next(err);
    }
  }

  public async getUserAdminDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userService = new UserService();
      const userId = get(req, "params.id", 0);
      const currentUser = await userService.getById(userId);

      if (currentUser) {

        const userResponse = new UserModel();
        userResponse.id = currentUser.id;
        userResponse.full_name = currentUser.full_name;
        userResponse.created_at = currentUser.created_at;
        userResponse.updated_at = currentUser.updated_at;
        userResponse.is_deleted = currentUser.is_deleted;
        userResponse.email = currentUser.email;
        userResponse.status = currentUser.status;
        userResponse.phone = currentUser.phone;
        userResponse.address = currentUser.address;
        userResponse.role_id = currentUser.role_id;
        delete currentUser.password;

        return ok(currentUser, req, res);
      }
      return badRequest({ message: COMMON_ERROR.pleaseTryAgain }, req, res);
    } catch (err) {
      next(err);
    }
  }
}
