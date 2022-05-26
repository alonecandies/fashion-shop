import { get } from "lodash";
import CategoryModel from '@src/models/category';
import CategoryLevel1Model from '@src/models/category_level1';
import CategoryLevel0Model from '@src/models/category_level0';
import CategoryService from '@src/services/categoryService';
import ProductService from '@src/services/product/productService';
import { badRequest, created, ok, unAuthorize } from "@src/middleware/response";
import { NextFunction, Request, Response } from "express";
import { COMMON_SUCCESS } from "@src/config/message";
import { CATEGORY_LEVEL } from "@src/config";
import MsValidate from "@src/utils/validate";

export default class CategoryController {

  public async getAllCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryService = new CategoryService();
      let results = await categoryService.getAllCategory();
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  // public async getAllCategoryLevel1(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const categoryService = new CategoryService();
  //     let results = await categoryService.getAllCategoryLevel1();
  //     return ok(results, req, res);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // public async getAllCategoryLevel0(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const categoryService = new CategoryService();
  //     let results = await categoryService.getAllCategoryLevel0();
  //     return ok(results, req, res);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  public async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const level = get(req, "params.level", 0);
      let results;
      const categoryService = new CategoryService();
      switch (Number.parseInt(level)) {
        case CATEGORY_LEVEL.LEVEL0:
          results = await categoryService.getDetailsCategoryLevel0(id);
          break;
        case CATEGORY_LEVEL.LEVEL1:
          results = await categoryService.getDetailsCategoryLevel1(id);
          break;
        case CATEGORY_LEVEL.LEVEL2:
          results = await categoryService.getDetailsCategory(id);
          break;
      }
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  // public async getCategoryLevel1ById(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const id = get(req, "params.id", 0);
  //     const categoryService = new CategoryService();
  //     let results = await categoryService.getDetailsCategoryLevel1(id);
  //     return ok(results, req, res);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // public async getCategoryLevel0ById(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const id = get(req, "params.id", 0);
  //     const categoryService = new CategoryService();
  //     let results = await categoryService.getDetailsCategoryLevel0(id);
  //     return ok(results, req, res);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  public async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const msValidate = new MsValidate();
      const bodyParams = await msValidate.validateUpdateCategory(req.body);
      const { level, parent_id, name } = bodyParams;
      let category: any;
      let results: any;
      const categoryService = new CategoryService();
      switch (Number.parseInt(level)) {
        case CATEGORY_LEVEL.LEVEL0:
          category = {
            name: name,
          } as CategoryLevel0Model;
          results = await categoryService.createCategoryLevel0(category);
          break;
        case CATEGORY_LEVEL.LEVEL1:
          category = {
            name: name,
            category_level_0_id: parent_id
          } as CategoryLevel1Model;
          results = await categoryService.createCategoryLevel1(category);
          break;
        case CATEGORY_LEVEL.LEVEL2:
          category = {
            name: name,
            category_level_1_id: parent_id
          } as CategoryModel;
          results = await categoryService.createCategory(category);
          break;
      }
      return created(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async createCategoryLevel1(req: Request, res: Response, next: NextFunction) {
    try {
      const category: CategoryLevel1Model = req.body;
      const categoryService = new CategoryService();
      let results = await categoryService.createCategoryLevel1(category);
      return created(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async createCategoryLevel0(req: Request, res: Response, next: NextFunction) {
    try {
      const category: CategoryLevel0Model = req.body;
      const categoryService = new CategoryService();
      let results = await categoryService.createCategoryLevel0(category);
      return created(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.body;
      const level = get(req, "params.level", 0);
      let results;
      const categoryService = new CategoryService();
      switch (Number.parseInt(level)) {
        case CATEGORY_LEVEL.LEVEL0:
          results = await categoryService.updateCategoryLevel0(category);
          break;
        case CATEGORY_LEVEL.LEVEL1:
          results = await categoryService.updateCategoryLevel1(category);
          break;
        case CATEGORY_LEVEL.LEVEL2:
          results = await categoryService.updateCategory(category);
          break;
      }
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  // public async updateCategoryLevel1(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const category = req.body;
  //     const categoryService = new CategoryService();
  //     let results = await categoryService.updateCategoryLevel1(category);
  //     return ok(results, req, res);
  //   } catch (err) {
  //     next(err);
  //   }
  // }
  // public async updateCategoryLevel0(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const category = req.body;
  //     const categoryService = new CategoryService();
  //     let results = await categoryService.updateCategoryLevel0(category);
  //     return ok(results, req, res);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  public async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const level = get(req, "params.level", 0);
      const categoryService = new CategoryService();
      const productService = new ProductService();
      switch (Number.parseInt(level)) {
        case CATEGORY_LEVEL.LEVEL0:
          const categoryLv0 = await categoryService.getDetailsCategoryLevel0(id);
          if (!categoryLv0) return badRequest({ message: "Delete fail!" }, req, res);
          await categoryService.deleteCategoryLevel0(categoryLv0);
          break;
        case CATEGORY_LEVEL.LEVEL1:
          const categoryLv1 = await categoryService.getDetailsCategoryLevel1(id);
          if (!categoryLv1) return badRequest({ message: "Delete fail!" }, req, res);
          await categoryService.deleteCategoryLevel1(categoryLv1);
          break;
        case CATEGORY_LEVEL.LEVEL2:
          const listProduct = await productService.getAllProductByCategory(id);
          if (listProduct && listProduct.length > 0) return badRequest({ message: "This Category already exists in the product!" }, req, res);
          const categoryLv2 = await categoryService.getDetailsCategory(id);
          if (!categoryLv2) return badRequest({ message: "Delete fail!" }, req, res);
          await categoryService.deleteCategory(categoryLv2);
          break;
      }
      return ok({ message: COMMON_SUCCESS.deleted }, req, res);
    } catch (err) {
      next(err);
    }
  }

  // public async deleteCategoryLevel1(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const id = get(req, "params.id", 0);
  //     const categoryService = new CategoryService();
  //     const category = await categoryService.getDetailsCategoryLevel1(id);
  //     if (!category) return badRequest({ message: "Delete fail!" }, req, res);
  //     await categoryService.deleteCategoryLevel1(category);
  //     return ok({ message: COMMON_SUCCESS.deleted }, req, res);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // public async deleteCategoryLevel0(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const id = get(req, "params.id", 0);
  //     const categoryService = new CategoryService();
  //     const category = await categoryService.getDetailsCategoryLevel0(id);
  //     if (!category) return badRequest({ message: "Delete fail!" }, req, res);
  //     await categoryService.deleteCategoryLevel0(category);
  //     return ok({ message: COMMON_SUCCESS.deleted }, req, res);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

}