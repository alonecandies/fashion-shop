import multer from 'multer';
import fs from 'fs/promises';
import appRoot from 'app-root-path';
import { NextFunction, Request, Response } from "express";
import { badRequest, created, ok, unAuthorize } from "@src/middleware/response";
import { logger } from '@src/middleware';
import ImageService from '@src/services/ImageService';
import S3Service from '@src/services/storage/s3';
import { STORAGE_FOLDER, STORAGE_TYPE } from '@src/config';
import config from "@src/config";
import FormatStringData from '@src/utils/formatString';

export default class ImageController {
  public async uploadImage(req: any, res: Response, next: NextFunction) {
    try {
      const file = req?.file;
      if (!file) next({ message: 'Not Found File Upload' });
      const { originalname: fileName } = file;
      const filePath = `${appRoot}/src/assets/images/${fileName}`;
      const bucketName = `${config.AWS_BUCKET}/${STORAGE_FOLDER.LASY}`;
      const newFileName = await new ImageService().uploadImageToS3Service(STORAGE_TYPE.S3, fileName, filePath, bucketName, true);
      const result = await new S3Service().uploadFile(newFileName, bucketName, filePath);
      // Xóa ảnh sau khi up lên s3
      await fs.unlink(filePath);
      return ok(result, req, res);
    } catch (err) {
      next(err);
    }
  }
}