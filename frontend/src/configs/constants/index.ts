import { IOrderStatus } from '@src/types/orderStatus';
import MESSAGES from './messages';
export { MESSAGES };

export const VIETNAMESE_PHONE_REG =
  /(\+84|0)+(3[2-9]|5[6|8|9]|9\d(?!5)|8[1-9]|7[0|6-9])+([0-9]{7})\b/;

export const PRODUCT_STATUS = { Inactive: 0, Active: 1, ALL: 2 };

export const TYPE_PRODUCT = { HOT: 1, VIEW: 2, DEFAULT: 3 };

export const TYPE_PRODUCT_PRICE = [
  {
    value: 1,
    label: 'Tất cả'
  },
  {
    value: 2,
    label: 'Dưới 500.000đ'
  },
  {
    value: 3,
    label: '500.000đ-1.000.000đ'
  },
  {
    value: 4,
    label: '1.000.000đ-2.000.000đ'
  },
  {
    value: 5,
    label: 'Trên 2.000.000đ'
  }
]; // <= 500 LEVEL_1: 3, // 500 - 1tr LEVEL_2: 4, // 1tr - 2tr LEVEL_3: 5, // >= 2tr }

export const TYPE_PRODUCT_ORDER = { DESC: 0, ASC: 1 };

export const BANNER_TYPE = {
  HOME_MAIN: {
    id: 1,
    value: 'Trang chủ (Banner chính)'
  },
  HOME_SUB: {
    id: 2,
    value: 'Trang chủ (Banner phụ)'
  },
  PRODUCTS: {
    id: 3,
    value: 'Trang Sản phẩm'
  },
  SALE: {
    id: 4,
    value: 'Trang Sale'
  },
  BLOG: {
    id: 5,
    value: 'Trang Blog'
  },
  HOME_FOOTER: {
    id: 6,
    value: 'Trang chủ (Banner footer)'
  }
};

export const ACCOUNT_ROUTER_VIEW = {
  edit: 'edit',
  orders: 'orders',
  changePassword: 'change-password',
  logout: 'logout'
};

export const LOGIN_ROUTER_ACTION = {
  none: '',
  forgorPassword: 'forgot-password',
  resetPassword: 'reset-password'
};

export const CATEGORY_LEVEL = {
  LEVEL_0: 0,
  LEVEL_1: 1,
  LEVEL_2: 2
};

export const ORDER_STATUS: IOrderStatus = {
  ALL: {
    key: 0,
    value: 'Tất cả'
  },
  NEW: {
    key: 1,
    value: 'Đơn mới'
  },
  VIEWED: {
    key: 2,
    value: 'Đã xem'
  },
  DELIVERY: {
    key: 3,
    value: 'Đang giao'
  },
  DONE: {
    key: 4,
    value: 'Hoàn thành'
  }
};

export const LOCAL_STORAGE_KEY_CART = 'cart';

export const PRODUCT_IMAGE_TYPE = {
  MAIN: {
    key: 1,
    value: 'Ảnh chính'
  },
  EXTRA: {
    key: 2,
    value: 'Ảnh phụ'
  }
};
