import multer from 'multer';
import appRoot from 'app-root-path';
import logger from './logger';
import FormatStringData from '@src/utils/formatString';
export default class ImageUtils {
  public upload: multer.Multer;

  constructor() {
    const imageFilter = (req, file, cb) => {
      if (file.mimetype.includes('image')) {
        cb(null, true);
      } else {
        cb({ message: 'upload only images file' }, false);
      }
    }

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `${appRoot}/src/assets/images/`);
      },
      filename(req, file, cb) {
        const formatStringData = new FormatStringData();
        const fileNameFormat = formatStringData.formatStrinVi(file.originalname).replace(/\s/g, '_');
        file.originalname = escape(fileNameFormat);
        cb(null, file.originalname);
      }
    });

    this.upload = multer({
      storage,
      limits: {
        fileSize: 5 * 1024 * 1024
      },
      fileFilter: imageFilter
    });
  }

}
