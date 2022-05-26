import { COMMON_STATUS, IS_DELETED, PAGE_SIZE, TYPE_PRODUCT } from "@src/config";
import HttpException from "@src/middleware/exceptions/httpException";
import BlogModel from '@src/models/blog';
import logger from "@src/middleware/logger";

export default class BlogService {

  public async getAllBlog(
    blog_category,
    title,
    status = COMMON_STATUS.ALL,
    type = TYPE_PRODUCT.DEFAULT,
    orderNo = 0,
    page = 0, pageSize = PAGE_SIZE.Standand
  ): Promise<any> {
    try {
      const orderArrays = this.getOrder(typeof orderNo === 'string' ? Number.parseInt(orderNo) : orderNo);
      const orderArraysTypeBlog = this.getOrderTypeBlog(typeof type === 'string' ? Number.parseInt(type) : type);
      let query = BlogModel.query().select(["blog.*"]).where("is_deleted", IS_DELETED.No);
      if (title) {
        query = query.where(builder => builder.where("blog.title", "like", `%${title}%`))
      }
      if (status && status != COMMON_STATUS.ALL ) {
        query = query.where("blog.status", status);
      }
      if (blog_category) {
        query = query.where("blog.blog_category_id", blog_category);
      }
      if (type) {
        query = query.orderBy(orderArraysTypeBlog[0], orderArraysTypeBlog[1])
      } else {
        query = query.orderBy(orderArrays[0], orderArrays[1])
      }
      return query.page(page, pageSize);
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getAllBlogByCategory(categoryId): Promise<BlogModel[]> {
    try {
      let results = BlogModel.query().select(["*"]).where("is_deleted", IS_DELETED.No).andWhere("blog_category_id", categoryId);
      return results;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getDetailsBlog(id): Promise<BlogModel> {
    try {
      const result = await BlogModel.query().findById(id);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async createBlog(blog: BlogModel): Promise<any> {
    try {
      blog.is_deleted = IS_DELETED.No;
      blog.status = COMMON_STATUS.Active;
      const newProduct = await BlogModel.query().insert(blog);
      return newProduct;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateBlog(blog: BlogModel): Promise<BlogModel> {
    try {
      const newBlog = await BlogModel.query().updateAndFetchById(blog.id, blog);
      return newBlog;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateLikeBlog(blog: BlogModel): Promise<BlogModel> {
    try {
      blog.number_of_likes = blog.number_of_likes + 1;
      const newBlog = await BlogModel.query().updateAndFetchById(blog.id, blog);
      return newBlog;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateViewedBlog(blog: BlogModel): Promise<BlogModel> {
    try {
      blog.viewd = blog.viewd + 1;
      const newProduct = await BlogModel.query().updateAndFetchById(blog.id, blog);
      return newProduct;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async deleteBlog(blog: BlogModel): Promise<BlogModel> {
    try {
      blog.is_deleted = IS_DELETED.Yes;
      const newProduct = await BlogModel.query().updateAndFetchById(blog.id, blog);
      return newProduct;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateStatusBlog(blog: BlogModel, status): Promise<BlogModel> {
    try {
      blog.status = status;
      const newBlog = await BlogModel.query().updateAndFetchById(blog.id, blog);
      return newBlog;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public getOrderTypeBlog(type: number) {
    let orders;
    switch (type) {
      case TYPE_PRODUCT.HOT:
        orders = ["blog.number_of_likes", "desc"];
        break;
      case TYPE_PRODUCT.VIEW:
        orders = ["blog.viewd", "desc"];
        break;
      case TYPE_PRODUCT.DEFAULT:
        orders = ["blog.created_at", "desc"];
        break;
    }
    return orders;
  }

  public getOrder(orderBy: number) {
    let orders;
    switch (orderBy) {
      case 0:
        orders = ["blog.created_at", "desc"];
        break;
      case 1:
        orders = ["blog.created_at", "asc"];
        break;
      default:
        orders = ["blog.created_at", "desc"];
        break;
    }
    return orders;
  }


}