// import { ADMIN_ACCOUNT_TYPE } from '@src/config/index';
// import UserModel from "@src/models/user";

// export const checkAdminPermission = (admin: UserModel, permitted: number) => {
//   const listPermission = admin.permission ? admin.permission.split(",").map(p => parseInt(p)) : [];
//   return listPermission.includes(permitted) || admin.acc_type === ADMIN_ACCOUNT_TYPE.SuperAdmin;
// };