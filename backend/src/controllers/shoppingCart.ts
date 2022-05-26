import { get } from "lodash";
import ShoppingCartModel from '@src/models/shopping_cart';
import ShoppingCartService from '@src/services/shoppingCartService';
import ProductService from '@src/services/product/productService';
import { badRequest, created, ok, unAuthorize } from "@src/middleware/response";
import { NextFunction, Request, Response } from "express";
import { COMMON_SUCCESS } from "@src/config/message";
import { IS_DELETED, PAGE_SIZE, STATUS_ORDER } from "@src/config";
import MsValidate from "@src/utils/validate";
import UserModel from "@src/models/user";

export default class ShoppingCartController {

  public async getAllShoppingCart(req: Request, res: Response, next: NextFunction) {
    try {
      const shoppingCartService = new ShoppingCartService();
      const userId = get(req, "query.user_id", null);
      const phone = get(req, "query.phone", null);
      const order = get(req, "query.order", null);
      const status = get(req, "query.status", null);
      const page = parseInt(get(req, "query.page", 0));
      const pageSize = parseInt(get(req, "query.pageSize", PAGE_SIZE.Standand));
      const fromDate = req.param('from_date');
      const toDate = req.param('to_date');
      let results = await shoppingCartService.getAllShoppingCart(userId, phone, status, order, fromDate, toDate, page, pageSize, false);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async getAllShoppingCartUser(req: Request, res: Response, next: NextFunction) {
    try {
      const shoppingCartService = new ShoppingCartService();
      const user = req["currentUser"] as UserModel;
      const phone = get(req, "query.phone", null);
      const order = get(req, "query.order", null);
      const status = get(req, "query.status", null);
      const page = parseInt(get(req, "query.page", 0));
      const pageSize = parseInt(get(req, "query.pageSize", PAGE_SIZE.Standand));
      const fromDate = req.param('from_date');
      const toDate = req.param('to_date');
      let results = await shoppingCartService.getAllShoppingCart(user.id, phone, status, order, fromDate, toDate, page, pageSize, true);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async getDetailsShoppingCart(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const shoppingCartService = new ShoppingCartService();
      let results = await shoppingCartService.getDetailsShoppingCart(id);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async createShoppingCart(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req["currentUser"] as UserModel;
      const msValidate = new MsValidate();
      const cart = await msValidate.validateUpdateCart(req.body);
      cart.status = STATUS_ORDER.Active;
      cart.is_deleted = IS_DELETED.No;
      cart.user_id = user.id
      const shoppingCartService = new ShoppingCartService();
      const orders = cart?.orders || [];
      delete cart.orders;
      let results = await shoppingCartService.createShoppingCart(cart, orders);
      if (!results) return badRequest({ message: "Insert Shopping Cart Error!" }, req, res);
      return created(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateStatusCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, status } = req.body;
      const shoppingCartService = new ShoppingCartService();
      const cart = await shoppingCartService.getDetailsShoppingCart(id);
      if (!cart) return badRequest({ message: "Find not found this cart!" }, req, res);
      let results = await shoppingCartService.updateStatusShoppingCart(cart, status);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async deleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const shoppingCartService = new ShoppingCartService();
      const cart = await shoppingCartService.getDetailsShoppingCart(id);
      const result = await shoppingCartService.deleteShoppingCart(cart);
      if (!result || !cart) return badRequest({ message: "Delete fail!" }, req, res);
      return ok({ message: COMMON_SUCCESS.deleted }, req, res);
    } catch (err) {
      next(err);
    }
  }
}