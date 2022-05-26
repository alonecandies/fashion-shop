import bcrypt from "bcryptjs";
import moment from "moment";
import { raw, transaction } from "objection";
import HttpException from "@src/middleware/exceptions/httpException";
import logger from "@src/middleware/logger";
import { UserRepository } from "@src/repositories/userRepository";
import UserModel from "@src/models/user";
import { PAGE_SIZE, USER_STATUS, COMMON_STATUS, USER_ROLE, IS_DELETED } from "@src/config";
import UserSessionMOdel from "@src/models/user_session";

export default class UserService {
  private userRps: UserRepository;

  constructor() {
    this.userRps = new UserRepository(UserModel);
  }

  /** create user */
  public async create(user: UserModel): Promise<UserModel> {
    try {
      /** create hashed password */
      const hash = bcrypt.hashSync(user.password, 10);
      // const verifiedToken = bcrypt.hashSync(`${user.email}${Date.now()}`, 10);
      user.password = hash;
      //user.verified_token = verifiedToken;
      const result = await this.userRps.create(user) as UserModel;
      const newUser = await this.userRps.find(result);
      return newUser as UserModel;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async changePassword(user: UserModel, newPassword: string): Promise<UserModel> {
    try {
      const hash = bcrypt.hashSync(newPassword, 10);
      user.password = hash;
      const  newUser = await UserModel.query().updateAndFetchById(user.id, user);
      return newUser as UserModel;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }


  public checkPassword(user: UserModel, password: string) {
    if (!user.password) return false;
    const checkPassword = bcrypt.compareSync(password, user.password);
    return checkPassword;
  }

  public async findByEmail(email: string): Promise<UserModel> {
    try {
      const userModel = new UserModel();
      userModel.email = email;
      const user = await this.userRps.find(userModel);
      return user;
    } catch (err) {
      throw new HttpException(401, err.message);
    }
  }

  public async getById(id: number): Promise<UserModel> {
    try {
      const user = await UserModel.query().findById(id);
      delete user.password;
      return user;
    } catch (err) {
      throw new HttpException(401, err.message);
    }
  }

  public async getUserByIdHavePassword(id: number): Promise<UserModel> {
    try {
      const user = await UserModel.query().findById(id);
      return user;
    } catch (err) {
      throw new HttpException(401, err.message);
    }
  }

  public async changeStatusUser(customer: UserModel, status): Promise<UserModel> {
    try {
      customer.status = status;
      const newBlog = await UserModel.query().updateAndFetchById(customer.id, customer);
      return newBlog;
    } catch (err) {
      throw new HttpException(401, err.message);
    }
  }

  public async updateUser(id: number, user: any): Promise<UserModel> {
    try {
      const newUser = await UserModel.query().updateAndFetchById(id, user);
      return newUser;
    } catch (err) {
      throw new HttpException(401, err.message);
    }
  }

  public async getListUsers(
    name = "",
    orderNo = 0,
    status,
    page = 0, pageSize = PAGE_SIZE.Standand
  ): Promise<any> {
    try {
      const orderArrays = this.getOrder(typeof orderNo === 'string' ? Number.parseInt(orderNo) : orderNo);
      let query = UserModel.query()
        .select([
          "user.id", "user.email", "user.full_name", "user.phone", "user.status", "user.address",
          "user.is_deleted", "user.created_at"
        ])
      .where("user.role_id", USER_ROLE.Customer);
      if (name) {
        query = query.where(builder => builder.where("user.full_name", "like", `%${name}%`))
      }
      if (status != null && status != '') {
        query = query.where("user.status", status);
      }

      return query
        .orderBy(orderArrays[0], orderArrays[1])
        .page(page, pageSize);
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async findByEmailSafe(email: string): Promise<UserModel> {
    try {
      if (!email) {
        return null;
      }
      const user = await this.findByEmail(email);
      if (user) {
        delete user.password;
      }

      return user;
    } catch (err) {
      throw new HttpException(401, err.message);
    }
  }

  public async verifyEmailPassword(email: string, password: string): Promise<UserModel> {
    try {
      const userModel = new UserModel();
      userModel.email = email;
      const user = await this.userRps.find(userModel);
      if (user) {
        const checkPassword = bcrypt.compareSync(password, user.password);
        //const dayDiff = moment().utc().diff(moment(user.created_at).utc(), "days", true);
        // if (!user.email_verified && dayDiff >= 1) {
        //   const msg = !user.old_email ? "Need verified email" : "You need to check your mailbox and verify your new email before you can sign in with that email."
        //   throw new HttpException(401, msg);
        // }
        if (user.status == USER_STATUS.deactive || user.is_deleted) {
          throw new HttpException(401, "This account has been restricted. Please contact Admin for more information.");
        }
        if (checkPassword) {
          return user;
        }
        throw new HttpException(401, "Password is incorrect");
      }
      throw new HttpException(401, "Email or password is incorrect");
    } catch (err) {
      throw new HttpException(401, err.message);
    }
  }

  public getOrder(orderBy: number) {
    let orders;
    switch (orderBy) {
      case 0:
        orders = ["user.created_at", "desc"];
        break;
      case 1:
        orders = ["user.created_at", "asc"];
        break;
      default:
        orders = ["user.created_at", "desc"];
        break;
    }
    return orders;
  }

}