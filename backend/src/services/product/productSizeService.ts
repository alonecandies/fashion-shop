import HttpException from "@src/middleware/exceptions/httpException";
import logger from "@src/middleware/logger";
import { ok } from "@src/middleware/response";
import ProductSizeModel from '@src/models/products/product_size';
import { raw, transaction } from "objection";


export default class ProductSizeService {
  public async getAllProductSize(): Promise<ProductSizeModel[]> {
    try {
      const result = await ProductSizeModel.query()
        .select(["*"]);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getDetailsProductSize(id): Promise<ProductSizeModel> {
    try {
      const result = await ProductSizeModel.query().findById(id);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async createProductSize(size: ProductSizeModel): Promise<ProductSizeModel> {
    try {
      const newSize = await ProductSizeModel.query().insert(size);
      return newSize;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateProductSize(size: ProductSizeModel): Promise<ProductSizeModel> {
    try {
      const newSize = await ProductSizeModel.query().updateAndFetchById(size.id, size);
      return newSize;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async deleteProductSize(id: any): Promise<any> {
    try {
      // check Product Size exeist in product
      // doing
      //======= delete =================
      const check = await ProductSizeModel.query().delete().where("id", id);
      return check;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

}