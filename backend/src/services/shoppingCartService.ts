import bcrypt from "bcryptjs";
import moment from "moment";
import { raw, transaction } from "objection";
import HttpException from "@src/middleware/exceptions/httpException";
import logger from "@src/middleware/logger";
import ShoppingCartModel from "@src/models/shopping_cart";
import ProductImageService from "@src/services/product/productImageService";
import ProductModel from "@src/models/products/product";
import OrderModel from "@src/models/order";
import { PAGE_SIZE, IS_DELETED, STATUS_ORDER } from "@src/config";
import { LexRuntime } from "aws-sdk";

export default class ShoppingCartService {

  public async getAllShoppingCart(
    userId,
    phone,
    status,
    orderNo = 0,
    fromDate = '',
    toDate = '',
    page = 0,
    pageSize = PAGE_SIZE.Standand,
    isUser = false
  ): Promise<any> {
    try {
      const orderArrays = this.getOrder(typeof orderNo === 'string' ? Number.parseInt(orderNo) : orderNo);

      let query = ShoppingCartModel.query()
        .select(["shopping_cart.*"]).where("shopping_cart.is_deleted", IS_DELETED.No);
      if (status && status != '' && status != STATUS_ORDER.All) {
        query = query.where("shopping_cart.status", status);
      }
      if (userId || isUser) {
        query = query.where("shopping_cart.user_id", userId);
      }
      if (phone) {
        query = query.where("shopping_cart.phone", phone);
      }
      if (orderNo) {
        query = query.orderBy(orderArrays[0], orderArrays[1])
      }

      query = query.whereRaw(this.genQueryCompareDateCart(fromDate, toDate));
      const listShoppingCart = await query.page(page, pageSize);
      listShoppingCart.results = await Promise.all(
        listShoppingCart.results.map(async (cart: ShoppingCartModel) => {
          const listOrder = await this.getAllOrderByShoppingCart(cart.id);
          cart.orders = listOrder;
          const listImage = await new ProductImageService().getAllProductImage();
          listOrder.length > 0 && listOrder.map((order, index) => {
            const listProductImage = listImage.length > 0 && listImage.filter(image => image.product_id === order.product_id);
            listOrder[index]["images"] = listProductImage;
          })
          return cart;
        })
      );
      return listShoppingCart;

    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public genQueryCompareDateCart(fromDate, toDate) {
    if (fromDate == '' && toDate == '') { return "" }
    let query = '';
    if (fromDate != '' && toDate == '') query = `(shopping_cart.created_at >= '${fromDate}')`;
    else if (fromDate == '' && toDate != '') query = `(shopping_cart.created_at <= '${toDate}')`;
    else query = `(shopping_cart.created_at >= '${fromDate}' and shopping_cart.created_at <= '${toDate}')`;
    return query;
  }

  public async getDetailsShoppingCart(shoppingCartId: number): Promise<any> {
    try {
      let query = ShoppingCartModel.query().findById(shoppingCartId);
      const shoppingCart = await query;
      const listOrder = await this.getAllOrderByShoppingCart(shoppingCart.id);
      const listImage = await new ProductImageService().getAllProductImage();
      listOrder.length > 0 && listOrder.map((order, index) => {
        const listProductImage = listImage.length > 0 && listImage.filter(image => image.product_id === order.product_id);
        listOrder[index]["images"] = listProductImage;
      })
      shoppingCart.orders = listOrder;
      return shoppingCart;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public getOrder(orderBy: number) {
    let orders;
    switch (orderBy) {
      case 0:
        orders = ["shopping_cart.created_at", "desc"];
        break;
      case 1:
        orders = ["shopping_cart.created_at", "asc"];
        break;
      default:
        orders = ["shopping_cart.created_at", "desc"];
        break;
    }
    return orders;
  }


  public async getAllOrderByShoppingCart(shoppingCartId: number): Promise<OrderModel[]> {
    try {
      const listOrder = await OrderModel.query()
        .select([
          "order.id", "order.quantity", "order.created_at", "order.updated_at", "order.size", "order.color",
          "P.id as product_id", "P.code_product as code_product", "P.title as product_title", "P.web_price as product_web_price", "P.sale as product_sale", "P.description as product_description", "C.name as name_category", "C.id as category_id"
        ]).leftJoin("product as P", "order.product_id", "P.id")
        .leftJoin("category as C", "C.id", "P.category_id")
        .where("order.shopping_cart_id", shoppingCartId);
      return listOrder;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async createShoppingCart(cart: ShoppingCartModel, orders: any[]): Promise<any> {
    try {
      const scrappy = await transaction(ShoppingCartModel, OrderModel,
        async (shoppingCartModel, orderModel) => {
          const newCart = await shoppingCartModel.query().insert(cart);
          // add order
          if (!orders || orders.length == 0) { return null; }
          await Promise.all(
            orders.map(async (order: OrderModel) => {
              const neworder = {
                quantity: order.quantity,
                color: order.color,
                size: order.size,
                product_id: order.product_id,
                shopping_cart_id: newCart.id
              } as OrderModel;
              return orderModel.query().insert(neworder);
            }));
          return newCart;
        });
      logger.info("create Shopping Cart");
      logger.info(JSON.stringify(scrappy));
      const result = await this.getDetailsShoppingCart(scrappy.id);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateStatusShoppingCart(cart: ShoppingCartModel, status): Promise<ShoppingCartModel> {
    try {
      cart.status = status;
      const newCart = await ShoppingCartModel.query().updateAndFetchById(cart.id, cart);
      return newCart;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async deleteShoppingCart(cart: ShoppingCartModel): Promise<ShoppingCartModel> {
    try {
      cart.is_deleted = IS_DELETED.Yes;
      const newCart = await ShoppingCartModel.query().updateAndFetchById(cart.id, cart);
      return newCart;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }


}