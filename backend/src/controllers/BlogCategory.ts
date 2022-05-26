import { get } from "lodash";
import BlogCategoryModel from '@src/models/blog_category';
import BlogCategoryService from '@src/services/BlogCategoryServcie';
import BlogService from '@src/services/BlogService';
import { badRequest, created, ok, unAuthorize } from "@src/middleware/response";
import { NextFunction, Request, Response } from "express";
import { COMMON_SUCCESS } from "@src/config/message";

export default class BlogCategoryController {

  public async getAllBlogCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryService = new BlogCategoryService();
      let results = await categoryService.getAllBlogCategory();
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async getBlogCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const categoryService = new BlogCategoryService();
      let results = await categoryService.getDetailsBlogCategory(id);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async createBlogCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category: BlogCategoryModel = req.body;
      const categoryService = new BlogCategoryService();
      let results = await categoryService.createBlogCategory(category);
      return created(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateBlogCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.body;
      const categoryService = new BlogCategoryService();
      let results = await categoryService.updateBlogCategory(category);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async deleteBlogCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const blogService = new BlogService();
      const listBlog = await blogService.getAllBlogByCategory(id);
      if(listBlog && listBlog.length > 0) return badRequest({ message: "This Blog Category already exists in the Blog!" }, req, res);
      //=================================
      const categoryService = new BlogCategoryService();
      const category = await categoryService.getDetailsBlogCategory(id);
      if (!category) return badRequest({ message: "Delete fail!" }, req, res);
      await categoryService.deleteBlogCategory(category);
      return ok({ message: COMMON_SUCCESS.deleted }, req, res);
    } catch (err) {
      next(err);
    }
  }

}