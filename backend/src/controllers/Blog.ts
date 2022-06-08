import { get } from "lodash";
import BlogModel from '@src/models/blog';
import BlogService from '@src/services/BlogService';
import { badRequest, created, ok, unAuthorize } from "@src/middleware/response";
import { NextFunction, Request, Response } from "express";
import { BLOG_MESSAGE, COMMON_SUCCESS, PRODUCT_MESSAGE } from "@src/config/message";
import { COMMON_STATUS, IS_DELETED, PAGE_SIZE } from "@src/config";
import MsValidate from "@src/utils/validate";


export default class BlogController {
  public async getAllBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const blogService = new BlogService();
      const categoryId = get(req, "query.blog_category_id", null);
      const title = get(req, "query.title", null);
      const order = get(req, "query.order", null);
      const status = get(req, "query.status", null);
      const type = get(req, "query.type", null);
      const page = parseInt(get(req, "query.page", 0));
      const pageSize = parseInt(get(req, "query.pageSize", PAGE_SIZE.Standand));
      let results = await blogService.getAllBlog(categoryId, title, status, type, order, page, pageSize);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async getBlogById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const blogService = new BlogService();
      let results = await blogService.getDetailsBlog(id);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async createBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const msValidate = new MsValidate();
      const blog = await msValidate.validateUpdateBlog(req.body);
      blog.status = COMMON_STATUS.Active;
      blog.is_deleted = IS_DELETED.No;
      const blogService = new BlogService();
      let results = await blogService.createBlog(blog);
      return created(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateStatusBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, status } = req.body;
      const blogService = new BlogService();
      const blog = await blogService.getDetailsBlog(id);
      if (!blog) return badRequest({ message: "Find not found this blog!" }, req, res);
      let results = await blogService.updateStatusBlog(blog, status);
      return created(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const blog = req.body;
      const blogService = new BlogService();
      let results = await blogService.updateBlog(blog);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateLikedBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const blogService = new BlogService();
      const blog = await blogService.getDetailsBlog(id);
      if (!blog) return badRequest({ message: BLOG_MESSAGE.productNotExist }, req, res);
      let results = await blogService.updateLikeBlog(blog);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateViewedBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const blogService = new BlogService();
      const blog = await blogService.getDetailsBlog(id);
      if (!blog) return badRequest({ message: BLOG_MESSAGE.productNotExist }, req, res);
      let results = await blogService.updateViewedBlog(blog);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async deleteBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const blogService = new BlogService();
      const blog = await blogService.getDetailsBlog(id);
      const result = await blogService.deleteBlog(blog);
      if (!result || !blog) return badRequest({ message: "Delete fail!" }, req, res);
      return ok({ message: COMMON_SUCCESS.deleted }, req, res);
    } catch (err) {
      next(err);
    }
  }
}