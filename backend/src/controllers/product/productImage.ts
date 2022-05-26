import { get } from "lodash";
import ProductImageModel from '@src/models/products/product_image';
import ProductImageService from '@src/services/product/productImageService';
import ProductService from '@src/services/product/productService';
import { badRequest, created, ok, unAuthorize } from "@src/middleware/response";
import { NextFunction, Request, Response } from "express";
import { COMMON_SUCCESS } from "@src/config/message";

export default class ProductImageController {

  public async getAllProductImage(req: Request, res: Response, next: NextFunction) {
    try {
      const productImageService = new ProductImageService();
      let results = await productImageService.getAllProductImage();
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }
  
  public async getProductImageByProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const productImageService = new ProductImageService();
      let results = await productImageService.getProductImageByProduct(id);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }
  

  public async getProductImageById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const productImageService = new ProductImageService();
      let results = await productImageService.getDetailsProductImage(id);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async createProductImage(req: Request, res: Response, next: NextFunction) {
    try {
      const image: ProductImageModel = req.body;
      const productImageService = new ProductImageService();
      let results = await productImageService.createProductImage(image);
      return created(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateProductImage(req: Request, res: Response, next: NextFunction) {
    try {
      const image = req.body;
      const productImageService = new ProductImageService();
      let results = await productImageService.updateProductImage(image);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async deleteProductImage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const productImageService = new ProductImageService();
      const image = await productImageService.getDetailsProductImage(id);
      const check = await productImageService.deleteProductImage(id);
      if (check < 0 || !image) return badRequest({ message: "Delete fail!" }, req, res);
      return ok({ message: COMMON_SUCCESS.deleted }, req, res);
    } catch (err) {
      next(err);
    }
  }

  // upload product image

}