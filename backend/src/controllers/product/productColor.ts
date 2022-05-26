import { get } from "lodash";
import ProductColorModel from '@src/models/products/product_color';
import ProductColorService from '@src/services/product/productColorService';
import { badRequest, created, ok, unAuthorize } from "@src/middleware/response";
import { NextFunction, Request, Response } from "express";
import { COMMON_SUCCESS } from "@src/config/message";
import ProductService from "@src/services/product/productService";

export default class ProductColorController {

  public async getAllProductColor(req: Request, res: Response, next: NextFunction) {
    try {
      const ProductColorModel = new ProductColorService();
      let results = await ProductColorModel.getAllProductColor();
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async getProductColorById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const ProductColorModel = new ProductColorService();
      let results = await ProductColorModel.getDetailsProductColor(id);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async createProductColor(req: Request, res: Response, next: NextFunction) {
    try {
      const color: ProductColorModel = req.body;
      const ProductColorModel = new ProductColorService();
      let results = await ProductColorModel.createProductColor(color);
      return created(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateProductColor(req: Request, res: Response, next: NextFunction) {
    try {
      const color = req.body;
      const ProductColorModel = new ProductColorService();
      let results = await ProductColorModel.updateProductColor(color);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async deleteProductColor(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      //=================== check exist tag in product ================
      const productService = new ProductService();
      const existColor = await productService.checkHaveColorProduct(id);
      if (existColor) return badRequest({ message: "This Color already exists in the product!" }, req, res);
      //===================================
      const ProductColorModel = new ProductColorService();
      const color = await ProductColorModel.getDetailsProductColor(id);
      const check = await ProductColorModel.deleteProductColor(id);
      if (check < 0 || !color) return badRequest({ message: "Delete fail!" }, req, res);
      return ok({ message: COMMON_SUCCESS.deleted }, req, res);
    } catch (err) {
      next(err);
    }
  }

}