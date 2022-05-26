import { PAGE_SIZE } from "@src/config";
import HttpException from "@src/middleware/exceptions/httpException";
import logger from "@src/middleware/logger";
import { ok } from "@src/middleware/response";
import ProductTagModel from '@src/models/products/product_tag';
import { raw, transaction } from "objection";


export default class ProductTagService {
  public async getAllProductTag(
    name = "",
    page = 0,
    orderNo = 0,
    pageSize = PAGE_SIZE.Standand
  ): Promise<any> {
    try {
      const orderArrays = this.getOrder(typeof orderNo === 'string' ? Number.parseInt(orderNo) : orderNo);
      let query = ProductTagModel.query()
        .select(["*"]);
      if (name) {
        query = query.where(builder => builder.where("name", "like", `%${name}%`))
      }
      return query.orderBy(orderArrays[0], orderArrays[1]).page(page, pageSize);

    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getFullProductTag(): Promise<any> {
    try {
      let query = ProductTagModel.query()
        .select(["*"]);
      return query;

    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getDetailsProductTag(id): Promise<ProductTagModel> {
    try {
      const result = await ProductTagModel.query().findById(id);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async createProductTag(tag: ProductTagModel): Promise<ProductTagModel> {
    try {
      const newTag = await ProductTagModel.query().insert(tag);
      return newTag;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateProductTag(tag: ProductTagModel): Promise<ProductTagModel> {
    try {
      const newTag = await ProductTagModel.query().updateAndFetchById(tag.id, tag);
      return newTag;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async deleteProductTag(id: any): Promise<any> {
    try {
      const check = await ProductTagModel.query().delete().where("id", id);
      return check;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public getOrder(orderBy: number) {
    let orders;
    switch (orderBy) {
      case 0:
        orders = ["tag.id", "desc"];
        break;
      case 1:
        orders = ["tag.id", "asc"];
        break;
      default:
        orders = ["tag.id", "desc"];
        break;
    }
    return orders;
  }

}