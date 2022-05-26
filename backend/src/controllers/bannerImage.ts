import { get } from "lodash";
import BannerImageModel from '@src/models/banner_image';
import BannerImageService from '@src/services/bannerImageService';
import { badRequest, created, ok, unAuthorize } from "@src/middleware/response";
import { NextFunction, Request, Response } from "express";
import { COMMON_SUCCESS } from "@src/config/message";

export default class BannerImageController {

  public async getAllBannerImage(req: Request, res: Response, next: NextFunction) {
    try {
      const title = get(req, "query.title", null);
      const type = get(req, "query.type", null);
      const bannerImageService = new BannerImageService();
      let results = await bannerImageService.getAllBannerImage(title, type);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async getBannerImageById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const bannerImageService = new BannerImageService();
      let results = await bannerImageService.getDetailsBannerImage(id);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async createBannerImage(req: Request, res: Response, next: NextFunction) {
    try {
      const bannerImage: BannerImageModel = req.body;
      const bannerImageService = new BannerImageService();
      let results = await bannerImageService.createBannerImage(bannerImage);
      return created(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async updateBannerImage(req: Request, res: Response, next: NextFunction) {
    try {
      const bannerImage = req.body;
      const bannerImageService = new BannerImageService();
      let results = await bannerImageService.updateBannerImage(bannerImage);
      return ok(results, req, res);
    } catch (err) {
      next(err);
    }
  }

  public async deleteBannerImage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id", 0);
      const bannerImageService = new BannerImageService();
      const banner = await bannerImageService.getDetailsBannerImage(id);
      const check = await bannerImageService.deleteBannerImage(id);
      if (check < 0 || !banner) return badRequest({ message: "Delete fail!" }, req, res);
      return ok({ message: COMMON_SUCCESS.deleted }, req, res);
    } catch (err) {
      next(err);
    }
  }

}