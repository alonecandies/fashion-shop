import { IS_DELETED } from "@src/config";
import HttpException from "@src/middleware/exceptions/httpException";
import logger from "@src/middleware/logger";
import { ok } from "@src/middleware/response";
import BlogCategoryModel from '@src/models/blog_category';
import { raw, transaction } from "objection";


export default class BlogCategoryService {
  public async getAllBlogCategory(): Promise<BlogCategoryModel[]> {
    try {
      const result = await BlogCategoryModel.query()
        .select([
          "blog_category.id", "blog_category.name"
        ]).where("blog_category.is_deleted", IS_DELETED.No);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getDetailsBlogCategory(id): Promise<BlogCategoryModel> {
    try {
      const result = await BlogCategoryModel.query().findById(id);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async createBlogCategory(category: BlogCategoryModel): Promise<BlogCategoryModel> {
    try {
      category.is_deleted = IS_DELETED.No;
      const newCategory = await BlogCategoryModel.query().insert(category);
      return newCategory;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateBlogCategory(category: BlogCategoryModel): Promise<BlogCategoryModel> {
    try {
      const newCategory = await BlogCategoryModel.query().updateAndFetchById(category.id, category);
      return newCategory;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async deleteBlogCategory(category: BlogCategoryModel): Promise<BlogCategoryModel> {
    try {
      category.is_deleted = IS_DELETED.Yes;
      const newCategory = await BlogCategoryModel.query().updateAndFetchById(category.id, category);
      return newCategory;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

}