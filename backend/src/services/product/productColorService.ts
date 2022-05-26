import { IS_DELETED } from "@src/config";
import HttpException from "@src/middleware/exceptions/httpException";
import logger from "@src/middleware/logger";
import { ok } from "@src/middleware/response";
import ProductColorModel from '@src/models/products/product_color';
import { raw, transaction } from "objection";


export default class ProductColorService {
  public async getAllProductColor(): Promise<ProductColorModel[]> {
    try {
      const result = await ProductColorModel.query()
        .select(["*"]);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getDetailsProductColor(id): Promise<ProductColorModel> {
    try {
      const result = await ProductColorModel.query().findById(id);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async createProductColor(color: ProductColorModel): Promise<ProductColorModel> {
    try {
      const newColor = await ProductColorModel.query().insert(color);
      return newColor;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateProductColor(color: ProductColorModel): Promise<ProductColorModel> {
    try {
      const newColor = await ProductColorModel.query().updateAndFetchById(color.id, color);
      return newColor;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async deleteProductColor(id: any): Promise<any> {
    try {
      // check Product Color exeist in product
      // doing
      //======= delete =================
      const check = await ProductColorModel.query().delete().where("id", id);
      return check;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

}