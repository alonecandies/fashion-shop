export type ILoginBody = {
  email: string;
  password: string;
  remember_me?: 1 | 0;
};

export type IRegisterBody = {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

export type IUpdateUserBody = {
  id: number;
  full_name: string;
  phone: string;
  address: string;
};

export type IChangePasswordBody = {
  old_pass: string;
  new_pass: string;
};

export type IForgotPasswordBody = {
  email: string;
};

export type IResetPasswordBody = {
  token: string;
  password: string;
};

export type IClearMsgPayload =
  | `fetchGetUserInfoMsg`
  | `fetchLoginMsg`
  | `fetchRegisterMsg`
  | `fetchChangePasswordMsg`
  | `fetchUpdateUserInfoMsg`;
