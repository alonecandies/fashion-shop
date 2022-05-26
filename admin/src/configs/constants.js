export const VIETNAMESE_PHONE_REG =
  /(\+84|0)+(3[2-9]|5[6|8|9]|9\d(?!5)|8[1-9]|7[0|6-9])+([0-9]{7})\b/;

export const MESSAGES = {
  CREATE_SUCCESS: `Tạo thành công`,
  UPDATE_SUCCESS: `Cập nhật thành công`,
  DELETE_SUCCESS: `Xóa thành công`,
  ADD_SUCCESS: `Thêm thành công`
};

export const UI_CONFIGS = {
  THEME_TYPE: {
    light: 'light',
    dark: 'dark'
  }
};

export const USER_STATUS = {
  ALL: {
    id: 0,
    value: 'Tất cả'
  },
  ACTIVE: {
    id: 1,
    value: 'Hoạt động'
  },
  NON_ACTIVE: {
    id: 2,
    value: 'Đóng băng'
  }
};
export const CRUD_ACTIONS = {
  create: 1,
  update: 2,
  view: 3,
  delete: 4
};

export const PRODUCT_STATUS = {
  INACTIVE: {
    key: 0,
    value: `Không mở bán`
  },
  ACTIVE: {
    key: 1,
    value: `Mở bán`
  }
};

export const PRODUCT_TYPE = {
  HOT: { key: 1, value: `Hot` },
  VIEW: { key: 2, value: `View` },
  DEFAULT: { key: 3, value: `Default` }
};

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

export const BANNERS_PER_LIST = [3, 6, 9];

export const BLOG_STATUS = {
  ALL: {
    id: 0,
    value: 'Tất cả'
  },
  PUBLIC: {
    id: 1,
    value: 'Công khai'
  },
  HIDE: {
    id: 2,
    value: 'Đã ẩn'
  }
};

export const PRODUCT_CATEGORY_LEVEL = {
  LEVEL_0: 0,
  LEVEL_1: 1,
  LEVEL_2: 2
};

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

export const CART_STATUS = {
  ALL: {
    id: 0,
    value: 'Tất cả'
  },
  NEW: {
    id: 1,
    value: 'Đơn mới',
    color: 'secondary'
  },
  VIEWED: {
    id: 2,
    value: 'Đã xem',
    color: 'warning'
  },
  DELIVERY: {
    id: 3,
    value: 'Đang giao',
    color: 'primary'
  },
  DONE: {
    id: 4,
    value: 'Hoàn thành',
    color: 'success'
  }
};
export const CONTACT_STATUS = {
  ALL: {
    id: -1,
    value: 'Tất cả'
  },
  NOT_SEEN: {
    id: 0,
    value: 'Chưa xem'
  },
  SEEN: {
    id: 1,
    value: 'Đã xem'
  }
};