import fs from 'fs';
import AWS from 'aws-sdk';
import config from "@src/config";
import HttpException from "@src/middleware/exceptions/httpException";

export default class S3Service {


  public generateFileNameWithSuffix(fileName, filePath, bucketName, isNeedSuffix) {
    if (!isNeedSuffix) return;
    let suffix = `-${new Date().toISOString().replace(/\\..+/, '')}`;
    suffix = suffix.slice(0, suffix.lastIndexOf('.'));
    if (fileName.lastIndexOf('.')) {
      let index = fileName.lastIndexOf('.');
      fileName = fileName.slice(0, index) + suffix + fileName.slice(index);
    } else {
      fileName += suffix;
    }
    return fileName;
  }

  public async uploadFile(fileName, bucketName, filePath): Promise<any>{
    const s3 = new AWS.S3({
      region: config.AWS_S3_REGION,
      accessKeyId: config.AWS_ACCESS_KEY,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY
    });

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fs.readFileSync(filePath)
    }
    const stored = await s3.upload(params).promise();
    return  { url: stored.Location };
  }
}