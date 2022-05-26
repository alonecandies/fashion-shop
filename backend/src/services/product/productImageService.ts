import HttpException from "@src/middleware/exceptions/httpException";
import logger from "@src/middleware/logger";
import { ok } from "@src/middleware/response";
import ProductImageModel from '@src/models/products/product_image';
import { raw, transaction } from "objection";


export default class ProductImageService {
  public async getAllProductImage(): Promise<ProductImageModel[]> {
    try {
      const result = await ProductImageModel.query()
        .select(["*"]);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getDetailsProductImage(id): Promise<ProductImageModel> {
    try {
      const result = await ProductImageModel.query().findById(id);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getProductImageByProduct(id): Promise<ProductImageModel[]> {
    try {
      const result = await ProductImageModel.query().select("*").where("product_id", id);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async createProductImage(image: ProductImageModel): Promise<ProductImageModel> {
    try {
      const newImage = await ProductImageModel.query().insert(image);
      return newImage;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateProductImage(image: ProductImageModel): Promise<ProductImageModel> {
    try {
      const newImage = await ProductImageModel.query().updateAndFetchById(image.id, image);
      return newImage;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async deleteProductImage(id: any): Promise<any> {
    try {
      const check = await ProductImageModel.query().delete().where("id", id);
      return check;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

}