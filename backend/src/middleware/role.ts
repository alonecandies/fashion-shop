import { USER_ROLE, USER_STATUS } from "@src/config";
import UserModel from "@src/models/user";
import { forbidden } from "./response";
import { COMMON_ERROR } from "@src/config/message";
import { NextFunction, Request, Response } from "express";

export const checkRole = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const adminUser = req["currentUser"] as UserModel;
    if (adminUser.role_id === USER_ROLE.Admin && adminUser.status === USER_STATUS.active) {
      return next();
    } 
    return forbidden({ message: COMMON_ERROR.notPermission }, req, res);
  };
}
