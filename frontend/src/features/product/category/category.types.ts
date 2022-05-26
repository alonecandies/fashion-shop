export interface ICategoryLevel2 {
  category_level_1_id: number;
  name: string;
  id: number;
} //Đầm suông
export interface ICategoryLevel1 {
  name: string;
  id: number;
  category_level_2: Array<ICategoryLevel2>;
} //Đầm
export interface ICategoryLevel0 {
  name: string;
  id: number;
  category_level_1: Array<ICategoryLevel1>;
} //Thời trang nữ

export type IClearMsgPayload = `fetchGetAllCategoriesMsg`;
