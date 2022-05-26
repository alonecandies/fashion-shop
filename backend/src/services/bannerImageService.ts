import HttpException from "@src/middleware/exceptions/httpException";
import logger from "@src/middleware/logger";
import BannerImageModel from '@src/models/banner_image';

export default class BannerImageService {
  public async getAllBannerImage(title, type): Promise<BannerImageModel[]> {
    try {
      let query = BannerImageModel.query()
        .select([
          "id", "url", "title", "type"
        ]);
      if (title) {
        query = query.where(builder => builder.where("title", "like", `%${title}%`))
      }
      if (type) {
        query = query.where("type", type);
      }
      return query;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async getDetailsBannerImage(id): Promise<BannerImageModel> {
    try {
      const result = await BannerImageModel.query().findById(id);
      return result;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async createBannerImage(banner: BannerImageModel): Promise<BannerImageModel> {
    try {
      const newBanner = await BannerImageModel.query().insert(banner);
      return newBanner;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async updateBannerImage(banner: BannerImageModel): Promise<BannerImageModel> {
    try {
      const newBanner = await BannerImageModel.query().updateAndFetchById(banner.id, banner);
      return newBanner;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

  public async deleteBannerImage(id: any): Promise<any> {
    try {
      const check = await BannerImageModel.query().delete().where("id", id);
      return check;
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }

}