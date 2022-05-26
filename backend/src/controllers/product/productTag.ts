import { get } from "lodash";
import ProductTagModel from '@src/models/products/product_tag';
import ProductTagService from '@src/services/product/productTagService';
import ProductService from '@src/services/product/productService';
import { badRequest, created, ok, unAuthorize } from "@src/middleware/response";
import { NextFunction, Request, Response } from "express";
import { COMMON_SUCCESS } from "@src/config/message";
import { PAGE_SIZE } from "@src/config";

export default class ProductTagController {

  public async getAllProductTag(req: Request, res: Response, next: NextFunction) {
    try {
      const productTagService = new ProductTagService();
      const name = get(req, "query.name", "");
      const page = parseInt(get(req, "query.page", 0));
      const orderNo = parseInt(get(req, "query.orderNo", 0));
      const pageSize = parseInt(get(req, "query.pageSize", PAGE_SIZE.Standand));
      let results = await productTagService.getAllProductTag(name, page, orderNo, pageSize);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async getAllProductFull(req: Request, res: Response, next: NextFunction) {
    try {
      const productTagService = new ProductTagService();
      let results = await productTagService.getFullProductTag();
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async getProductTagById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const productTagService = new ProductTagService();
      let results = await productTagService.getDetailsProductTag(id);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async createProductTag(req: Request, res: Response, next: NextFunction) {
    try {
      const tag: ProductTagModel = req.body;
      const productTagService = new ProductTagService();
      let results = await productTagService.createProductTag(tag);
      return created(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateProductTag(req: Request, res: Response, next: NextFunction) {
    try {
      const tag = req.body;
      const productTagService = new ProductTagService();
      let results = await productTagService.updateProductTag(tag);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async deleteProductTag(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      //=================== check exist tag in product ================
      const productService = new ProductService();
      const existTag = await productService.checkHaveTagProduct(id);
      if (existTag) return badRequest({ message: "This Tag already exists in the product!" }, req, res);
      //===================================
      const productTagService = new ProductTagService();
      const tag = await productTagService.getDetailsProductTag(id);
      const check = await productTagService.deleteProductTag(id);
      if (check < 0 || !tag) return badRequest({ message: "Delete fail!" }, req, res);
      return ok({ message: COMMON_SUCCESS.deleted }, req, res);
    } catch (err) {
      next(err);
    }
  }

}