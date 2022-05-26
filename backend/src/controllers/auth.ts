import config, { USER_STATUS } from "@src/config";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import HttpException from "@src/middleware/exceptions/httpException";
import UserService from "@src/services/userService";
import UserSessionService from "@src/services/userSessionService";
import { logger } from "@src/middleware";

export default class AuthController {
  private user: UserService;
  private userSession: UserSessionService;

  constructor() {
    this.user = new UserService();
    this.userSession = new UserSessionService();
  }

  public config() {
    passport.use("user-login",
      new LocalStrategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
        try {
          const user = await this.user.verifyEmailPassword(email, password);
          done(null, user);
        } catch (error) {
          done(error);
        }
      })
    );

    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: config.JWT_SECRET,
          ignoreExpiration: true,
          passReqToCallback: true
        },
        async (req, payload, done) => {
          try {
            const user = await this.user.findByEmailSafe(payload.email);
            if (!user || user.status == USER_STATUS.deactive) return done(null, null);
            const token = req.header("authorization").replace("Bearer ", "");
            const userSession = await this.userSession.findByUserAndAccessToken(parseInt(user.$id()), token);
            if (!userSession) return done(null, null);
            done(null, user);
          } catch (error) {
            done(error);
          }
        }
      )
    );
  }

  public authenticateJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", (err, user, info) => {
      if (err) return next(err);
      if (!user) return next(new HttpException(401, "unauthorized"));
      req["currentUser"] = user;
      next();
    })(req, res, next);
  }

  // only save user, not return err, support for guest and user
  public saveCurrentUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", (err, user, info) => {
      req["currentUser"] = user;
      next();
    })(req, res, next);
  }
}