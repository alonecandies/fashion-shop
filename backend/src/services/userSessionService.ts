import config from "@src/config";
import bcrypt from "bcryptjs";
import HttpException from "@src/middleware/exceptions/httpException";
import UserModel from "@src/models/user";
import jwt from "jsonwebtoken";
import moment from "moment";
import UserSessionModel from "@src/models/user_session";
import UserPasswordResetModel from "@src/models/user_password_resets";
import { UserSessionRepository } from "@src/repositories/userSessionRepository";
import { logger } from "@src/middleware";

export default class UserSessionService {
  private userSessionRps: UserSessionRepository;

  constructor() {
    this.userSessionRps = new UserSessionRepository(UserSessionModel);
  }

  /** create record in user_session */
  public async create(user: UserModel, remember = true): Promise<UserSessionModel> {
    try {
      /** check token expires and remove from database */
      await this.userSessionRps.removeAllExpiresByUser(user.$id());
      /** create new token and save database */
      let expiresIn = remember ? config.JWT_SECRET_EXPIRES : config.JWT_SECRET_EXPIRES_NO_REMEMBER_ME;
      const token = jwt.sign({ email: user.email }, config.JWT_SECRET, { expiresIn: parseInt(expiresIn) });
      const refreshToken = jwt.sign({ email: user.email }, config.JWT_SECRET_REFRESH);
      const userSessionModel = new UserSessionModel();
      userSessionModel.user_id = parseInt(user.$id());
      userSessionModel.access_token = token;
      userSessionModel.refresh_token = refreshToken;
      userSessionModel.expires_in = parseInt(expiresIn);
      const createTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
      userSessionModel.created_at = createTime;
      userSessionModel.updated_at = createTime;
      const result = (await this.userSessionRps.create(userSessionModel)) as UserSessionModel;
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  /** refresh token */
  public async refreshToken(user: UserModel, refreshToken: string): Promise<UserSessionModel> {
    try {
      const userSessionModel = new UserSessionModel();
      userSessionModel.user_id = parseInt(user.$id());
      userSessionModel.refresh_token = refreshToken;
      const userSession = await this.userSessionRps.find(userSessionModel);
      if (userSession) {
        const token = jwt.sign({ email: user.email }, config.JWT_SECRET, { expiresIn: config.JWT_SECRET_EXPIRES });
        const refreshToken = jwt.sign({ email: user.email }, config.JWT_SECRET_REFRESH);
        userSession.access_token = token;
        userSession.refresh_token = refreshToken;
        userSession.expires_in = parseInt(config.JWT_SECRET_EXPIRES);
        const result = await this.userSessionRps.update(userSession.$id(), userSession);
        // console.log(result, "result");
        return userSession;
      }
      throw new HttpException(500, "User Session Fail");
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  /** find user_session bu id_user and access_token */
  public async findByUserAndAccessToken(idUser: number, accessToken: string): Promise<UserSessionModel> {
    try {
      const userSessionModel = new UserSessionModel();
      userSessionModel.user_id = idUser;
      userSessionModel.access_token = accessToken;
      const userSession = await this.userSessionRps.find(userSessionModel);
      return userSession;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async genTokenForgot(user: UserPasswordResetModel): Promise<UserPasswordResetModel> {
    try {
      const token = bcrypt.hashSync(moment.utc().toISOString(), 10);
      const userSessionModel = new UserPasswordResetModel();
      userSessionModel.email = user.email;
      userSessionModel.token = token;
      return UserPasswordResetModel.query().insert(userSessionModel);
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async findTokenForgot(token: string): Promise<UserPasswordResetModel[]> {
    try {
      return UserPasswordResetModel.query().where("token", token);
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async deleteForgotPassById(id: number) {
    try {
      return UserPasswordResetModel.query().deleteById(id);
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

}