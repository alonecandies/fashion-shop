import { get } from "lodash";
import ProductModel from '@src/models/products/product';
import ProductService from '@src/services/product/productService';
import ProductImageService from '@src/services/product/productImageService'
import { badRequest, created, ok, unAuthorize } from "@src/middleware/response";
import { NextFunction, Request, Response } from "express";
import { COMMON_SUCCESS, PRODUCT_MESSAGE } from "@src/config/message";
import { COMMON_STATUS, IS_DELETED, PAGE_SIZE } from "@src/config";
import MsValidate from "@src/utils/validate";

export default class ProductController {

  public async getAllProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productService = new ProductService();
      const productImageService = new ProductImageService();
      const categoryId = get(req, "query.category_id", null);
      const levelCategory = get(req, "query.level", null);
      const name = get(req, "query.name", null);
      const code = get(req, "query.code", null);
      const order = get(req, "query.order", null);
      const status = get(req, "query.status", null);
      const type = get(req, "query.type", null);
      const money = get(req, "query.money", null);
      const tag = get(req, "query.tag", null);
      const page = parseInt(get(req, "query.page", 0));
      const pageSize = parseInt(get(req, "query.pageSize", PAGE_SIZE.Standand));
      let data = await productService.getAllProduct(categoryId, levelCategory, name, code, status, type, money, tag, order, page, pageSize);
      const listImage = await productImageService.getAllProductImage();
      data.results.length > 0 && data.results.map((product, index) => {
        const listProductImage = listImage.length > 0 && listImage.filter(image => image.product_id === product.id);
        data.results[index]["images"] = listProductImage;
      })
      return ok(data, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const productService = new ProductService();
      const productImageService = new ProductImageService();
      let product = await productService.getDetailsProductRelated(id);
      const listImage = await productImageService.getProductImageByProduct(product.id);
      product["images"] = listImage;
      return ok(product, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const msValidate = new MsValidate();
      const product = await msValidate.validateUpdateProduct(req.body);
      product.status = COMMON_STATUS.Active;
      product.is_deleted = IS_DELETED.No;
      product.code_product = 'SP'.concat(new Date().getTime().toString());
      const productService = new ProductService();
      //===============================
      const tags = product?.tags || [];
      const sizes = product?.sizes || [];
      const colors = product?.colors || [];

      let results = await productService.createProduct(product, tags, sizes, colors);
      return created(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateStatusProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, status } = req.body;
      const productService = new ProductService();
      const product = await productService.getDetailsProduct(id);
      if (!product) return badRequest({ message: "Find not found this product!" }, req, res);
      let results = await productService.updateStatusProduct(product, status);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateNumberOfProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, out_of_stock } = req.body;
      const productService = new ProductService();
      const product = await productService.getDetailsProduct(id);
      if (!product) return badRequest({ message: "Find not found this product!" }, req, res);
      let results = await productService.updateQuantityProduct(product, out_of_stock);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const msValidate = new MsValidate();
      const product = await msValidate.validateUpdateProduct(req.body);
      //===============================
      const tags = product?.tags || [];
      const sizes = product?.sizes || [];
      const colors = product?.colors || [];
      const productService = new ProductService();
      let results = await productService.updateProduct(product, tags, sizes, colors);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateLikedProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const productService = new ProductService();
      const product = await productService.getDetailsProduct(id);
      if (!product) return badRequest({ message: PRODUCT_MESSAGE.productNotExist }, req, res);
      let results = await productService.updateLikeProduct(product);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateViewedProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const productService = new ProductService();
      const product = await productService.getDetailsProduct(id);
      if (!product) return badRequest({ message: PRODUCT_MESSAGE.productNotExist }, req, res);
      let results = await productService.updateViewedProduct(product);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const productService = new ProductService();
      const product = await productService.getDetailsProduct(id);
      const result = await productService.deleteProduct(product);
      if (!result || !product) return badRequest({ message: "Delete fail!" }, req, res);
      return ok({ message: COMMON_SUCCESS.deleted }, req, res);
    } catch (err) {
      next(err);
    }
  }
}
