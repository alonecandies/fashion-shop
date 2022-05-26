import { STORAGE_TYPE } from "@src/config";
import HttpException from "@src/middleware/exceptions/httpException";
import logger from "@src/middleware/logger";
import { ok } from "@src/middleware/response";
import { raw, transaction } from "objection";
import S3Service from '@src/services/storage/s3';
export default class ImageService {
  public async uploadImageToS3Service(type, fileName, filePath, bucketName, isNeedSuffix): Promise<any> {
    try {
      // remove all space in file name
      fileName = fileName.replace(/\s/g, '');
      switch (type) {
        case STORAGE_TYPE.S3:
          return new S3Service().generateFileNameWithSuffix(fileName, filePath, bucketName, isNeedSuffix);
        default:
          throw new HttpException(500, `Storage type ${type} not support`);
      }
    } catch (err) {
      throw new HttpException(500, err.message);
    }
  }
}
