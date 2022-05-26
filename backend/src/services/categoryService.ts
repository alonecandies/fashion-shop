import { IS_DELETED } from "@src/config";
import HttpException from "@src/middleware/exceptions/httpException";
import logger from "@src/middleware/logger";
import { ok } from "@src/middleware/response";
import CategoryModel from '@src/models/category';
import CategoryLevel1Model from '@src/models/category_level1';
import CategoryLevel0Model from '@src/models/category_level0';
import { raw, transaction } from "objection";
import { isReturnStatement } from "typescript";


export default class CategoryService {

  public async getAllCategory(): Promise<any[]> {
    try {
      let results = await this.getAllCategoryFromLevel1();
      const listCategoryLevel2 = await this.getAllCategoryLevel2();
      results.map((data, index) => {
        data["category_level_1"].length > 0 && data["category_level_1"].map((categoryLevel1, i) => {
          const listData = listCategoryLevel2.filter(ca => ca.category_level_1_id === categoryLevel1.id);
          results[index]["category_level_1"][i]["category_level_2"] = listData;
        })
      })
      return results;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getAllCategoryFromLevel1(): Promise<any[]> {
    try {
      let results = await CategoryLevel0Model.query()
        .select(["category_level_0.name", "category_level_0.id"])
        .where("category_level_0.is_deleted", IS_DELETED.No);

      await Promise.all(
        results.map(async (category: CategoryLevel0Model, index) => {
          const listCategoryLevel1 = await this.getAllCategoryLevel1ByLevel0(category.id);
          results[index]["category_level_1"] = listCategoryLevel1;
        })
      );
      return results;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }
  public async getAllCategoryLevel1(): Promise<CategoryLevel1Model[]> {
    try {
      const result = await CategoryLevel1Model.query()
        .select(["category_level_1.*"])
        .leftJoin("category_level_0 AS CLV0", "CLV0.id", "category_level_1.category_level_0_id")
        .andWhere("category_level_1.is_deleted", IS_DELETED.No)
        .andWhere("CLV0.is_deleted", IS_DELETED.No);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getAllCategoryLevel1ByLevel0(id): Promise<any[]> {
    try {
      const result = await CategoryLevel1Model.query()
        .select(["category_level_1.name", "category_level_1.id"])
        .where("category_level_1.category_level_0_id", id)
        .andWhere("category_level_1.is_deleted", IS_DELETED.No);
      return result || [];
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }


  public async getAllCategoryLevel0(): Promise<CategoryLevel0Model[]> {
    try {
      const result = await CategoryLevel0Model.query()
        .select(["category_level_0.*"])
        .where("category_level_0.is_deleted", IS_DELETED.No)
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getAllCategoryLevel2(): Promise<CategoryModel[]> {
    try {
      const result = await CategoryModel.query()
        .select(["category.id", "category.name", "category.category_level_1_id"])
        .where("category.is_deleted", IS_DELETED.No)
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getDetailsCategory(id): Promise<CategoryModel> {
    try {
      const result = await CategoryModel.query().findById(id);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }
  public async getDetailsCategoryLevel1(id): Promise<CategoryLevel1Model> {
    try {
      const result = await CategoryLevel1Model.query().findById(id);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }
  public async getDetailsCategoryLevel0(id): Promise<CategoryLevel0Model> {
    try {
      const result = await CategoryLevel0Model.query().findById(id);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async createCategory(category: CategoryModel): Promise<CategoryModel> {
    try {
      category.is_deleted = IS_DELETED.No;
      const newCategory = await CategoryModel.query().insert(category);
      return newCategory;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }
  public async createCategoryLevel1(category: CategoryLevel1Model): Promise<CategoryLevel1Model> {
    try {
      category.is_deleted = IS_DELETED.No;
      const newCategory = await CategoryLevel1Model.query().insert(category);
      return newCategory;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }
  public async createCategoryLevel0(category: CategoryLevel0Model): Promise<CategoryLevel0Model> {
    try {
      category.is_deleted = IS_DELETED.No;
      const newCategory = await CategoryLevel0Model.query().insert(category);
      return newCategory;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateCategory(category: CategoryModel): Promise<CategoryModel> {
    try {
      const newCategory = await CategoryModel.query().updateAndFetchById(category.id, category);
      return newCategory;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateCategoryLevel1(category: CategoryLevel1Model): Promise<CategoryLevel1Model> {
    try {
      const newCategory = await CategoryLevel1Model.query().updateAndFetchById(category.id, category);
      return newCategory;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateCategoryLevel0(category: CategoryLevel0Model): Promise<CategoryLevel0Model> {
    try {
      const newCategory = await CategoryLevel0Model.query().updateAndFetchById(category.id, category);
      return newCategory;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async deleteCategory(category: CategoryModel): Promise<CategoryModel> {
    try {
      category.is_deleted = IS_DELETED.Yes;
      const newCategory = await CategoryModel.query().updateAndFetchById(category.id, category);
      return newCategory;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }
  public async deleteCategoryLevel1(category: CategoryLevel1Model): Promise<CategoryLevel1Model> {
    try {
      category.is_deleted = IS_DELETED.Yes;
      const newCategory = await CategoryLevel1Model.query().updateAndFetchById(category.id, category);
      return newCategory;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }
  public async deleteCategoryLevel0(category: CategoryLevel0Model): Promise<CategoryLevel0Model> {
    try {
      category.is_deleted = IS_DELETED.Yes;
      const newCategory = await CategoryLevel0Model.query().updateAndFetchById(category.id, category);
      return newCategory;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

}