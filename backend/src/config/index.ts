
import dotenv from "dotenv";
const envFound = dotenv.config({ path: `./.env` });
if (!envFound) throw new Error("Couldn't find .env file");

export default {
  port: process.env.APP_PORT,

  logs: { level: process.env.LOG_LEVEL || "silly" },

  DB_ADMIN_USERNAME: process.env.DB_ADMIN_USERNAME,
  DB_ADMIN_PASSWORD: process.env.DB_ADMIN_PASSWORD,

  DB_HOST_NAME: process.env.DB_HOST_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,

  MAIL_DRIVER: process.env.MAIL_DRIVER,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_ENCRYPTION: process.env.MAIL_ENCRYPTION,
  MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
  MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,

  CLIENT_ID: process.env.CLIENT_ID,
  CLEINT_SECRET: process.env.CLEINT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,

  DATABASE_POOL_MIN: process.env.DATABASE_POOL_MIN,
  DATABASE_POOL_MAX: process.env.DATABASE_POOL_MAX,
  DATABASE_POOL_IDLE: process.env.DATABASE_POOL_IDLE,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH,
  JWT_SECRET_EXPIRES: process.env.JWT_SECRET_EXPIRES,
  JWT_SECRET_EXPIRES_NO_REMEMBER_ME: process.env.JWT_SECRET_EXPIRES_NO_REMEMBER_ME,


  WEBSITE_URL: process.env.WEBSITE_URL,

  API_URL: process.env.API_URL,
  API_BASE_URL: process.env.API_BASE_URL,
  NODE_ENV: process.env.NODE_ENV,

  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET: process.env.AWS_BUCKET,
  S3_URL: process.env.S3_URL
};

export const USER_STATUS = {
  draft: 0,
  active: 1,
  deactive: 2
};

export const USER_ROLE = {
  Admin: 1,
  Customer: 2
}

export const PAGE_SIZE = {
  Standand: 10,
};

export const COMMON_STATUS = {
  Inactive: 0,
  Active: 1,
  ALL: 2
};

export const STATUS_ORDER = {
  Inactive: 0,
  Active: 1,
  Done: 2,
  All: 3
}

export const IS_DELETED = {
  Yes: 1,
  No: 0
}

export const TYPE_IMAGE = {
  BANNER_TOP: 1,
  BANNER_BOTTOM: 2,
  PRODUCT: 3
}

export const SALE_PRODUCT = {
  SALE_35: 1,
  SALE_50: 2,
  SALE_SHOCK: 3
}

export const TYPE_PRODUCT = {
  HOT: 1,
  VIEW: 2,
  DEFAULT: 3
}

export const TYPE_PRODUCT_PRICE = {
  ALL: 1,
  LEVEL_0: 2, // <= 500
  LEVEL_1: 3, // 500 - 1tr
  LEVEL_2: 4, // 1tr - 2tr
  LEVEL_3: 5, // >= 2tr
}

export const TYPE_UPDATE_RELATIONS_PRODUCT = {
  ADD: 1,
  UPDATE: 3,
  REMOVE: 2
}

export const STORAGE_TYPE = {
  S3: 's3'
}

export const STORAGE_FOLDER = {
  LASY: 'lasy',
}

export const PRODUCT_QUANTITY = {
  AVAILABBLE: 0,
  NONE_AVAILABLE: 1
}
export const CATEGORY_LEVEL = {
  LEVEL0: 0,
  LEVEL1: 1,
  LEVEL2: 2
}

export const TYPE_IMAGE_PRODUCT = {
  MAIN: 1,
  EXTRA: 2,
}