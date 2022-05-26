import { get } from "lodash";
import ProductSizeModel from '@src/models/products/product_size';
import ProductSizeService from '@src/services/product/productSizeService';
import ProductService from '@src/services/product/productService';
import { badRequest, created, ok, unAuthorize } from "@src/middleware/response";
import { NextFunction, Request, Response } from "express";
import { COMMON_SUCCESS } from "@src/config/message";

export default class ProductSizeController {

  public async getAllProductSize(req: Request, res: Response, next: NextFunction) {
    try {
      const productSizeService = new ProductSizeService();
      let results = await productSizeService.getAllProductSize();
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async getProductSizeById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const productSizeService = new ProductSizeService();
      let results = await productSizeService.getDetailsProductSize(id);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async createProductSize(req: Request, res: Response, next: NextFunction) {
    try {
      const color: ProductSizeModel = req.body;
      const productSizeService = new ProductSizeService();
      let results = await productSizeService.createProductSize(color);
      return created(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateProductSize(req: Request, res: Response, next: NextFunction) {
    try {
      const size = req.body;
      const productSizeService = new ProductSizeService();
      let results = await productSizeService.updateProductSize(size);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async deleteProductSize(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      //=================== check exist tag in product ================
      const productService = new ProductService();
      const existSize = await productService.checkHaveSizeProduct(id);
      if (existSize) return badRequest({ message: "This Size already exists in the product!" }, req, res);
      //===================================
      const productSizeService = new ProductSizeService();
      const size = await productSizeService.getDetailsProductSize(id);
      const check = await productSizeService.deleteProductSize(id);
      if (check < 0 || !size) return badRequest({ message: "Delete fail!" }, req, res);
      return ok({ message: COMMON_SUCCESS.deleted }, req, res);
    } catch (err) {
      next(err);
    }
  }

}