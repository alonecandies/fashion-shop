import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@src/configs/redux/store';
import authenApi from './authenApi';
import {
  ILoginBody,
  IRegisterBody,
  IChangePasswordBody,
  IClearMsgPayload,
  IUpdateUserBody,
  IForgotPasswordBody,
  IResetPasswordBody
} from './authen.types';
import { MESSAGES } from '@src/configs/constants';
import { getToken, setToken, clearToken } from '@src/utils/tokenUtil';
import { IUserInfo } from '@src/types/userInfo';
export interface IAuthenState {
  isAuth: boolean;
  userInfo: IUserInfo | null;

  isFetchingGetUserInfo: boolean;
  fetchGetUserInfoMsg: any;

  isFetchingLogin: boolean;
  fetchLoginMsg: any;

  isFetchingRegister: boolean;
  fetchRegisterMsg: any;

  isFetchingChangePassword: boolean;
  fetchChangePasswordMsg: any;

  isFetchingUpdateUserInfo: boolean;
  fetchUpdateUserInfoMsg: any;

  isFetchingForgotPassword: boolean;
  fetchForgotPasswordMsg: any;

  isFetchingResetPassword: boolean;
  fetchResetPasswordMsg: any;
}

const initialState: IAuthenState = {
  isAuth: false,
  userInfo: null,

  // state for get user info
  isFetchingGetUserInfo: false,
  fetchGetUserInfoMsg: null,

  // state for login reducer
  isFetchingLogin: false,
  fetchLoginMsg: null,

  // state for register reducer
  isFetchingRegister: false,
  fetchRegisterMsg: null,

  // state for changePassword reducer
  isFetchingChangePassword: false,
  fetchChangePasswordMsg: null,

  // state for update info reducer
  isFetchingUpdateUserInfo: false,
  fetchUpdateUserInfoMsg: null,

  // state for forgot password reducer
  isFetchingForgotPassword: false,
  fetchForgotPasswordMsg: null,

  // state for reset password reducer
  isFetchingResetPassword: false,
  fetchResetPasswordMsg: null
};

export const fetchGetUserInfo = createAsyncThunk(
  'authen/fetchGetUserInfo',
  async (payload: any = null, { rejectWithValue }) => {
    try {
      const response = await authenApi.getInformation(getToken());

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  'authen/fetchLogin',
  async (payload: ILoginBody, { rejectWithValue }) => {
    try {
      const response = await authenApi.login(payload);

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  'authen/fetchRegister',
  async (payload: IRegisterBody, { rejectWithValue }) => {
    try {
      const response = await authenApi.register(payload);

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateUserInfo = createAsyncThunk(
  'authen/fetchUpdateUserInfo',
  async (payload: IUpdateUserBody, { rejectWithValue }) => {
    try {
      const response = await authenApi.updateInfo(getToken(), payload);

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchChangePassword = createAsyncThunk(
  'authen/fetchChangePassword',
  async (payload: IChangePasswordBody, { rejectWithValue }) => {
    try {
      const response = await authenApi.changePassword(getToken(), payload);

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchForfotPassword = createAsyncThunk(
  'authen/fetchForfotPassword',
  async (payload: IForgotPasswordBody, { rejectWithValue }) => {
    try {
      const response = await authenApi.forgotPassword(payload);

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchResetPassword = createAsyncThunk(
  'authen/fetchResetPassword',
  async (payload: IResetPasswordBody, { rejectWithValue }) => {
    try {
      const response = await authenApi.resetPassword(payload);

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const authenSlice = createSlice({
  name: 'authen',
  initialState,
  reducers: {
    logout(state) {
      clearToken();
      state.isAuth = false;
      state.userInfo = null;
    },

    clearMsg(state: any, action: PayloadAction<IClearMsgPayload>) {
      if ([`fetchChangePasswordMsg`, `fetchUpdateUserInfoMsg`].includes(action.payload)) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle fetch get user information
      .addCase(fetchGetUserInfo.rejected, (state, action) => {
        state.isAuth = false;
        state.isFetchingGetUserInfo = false;
        state.fetchGetUserInfoMsg = action.payload || action.error.message;
        state.userInfo = null;
      })
      .addCase(fetchGetUserInfo.pending, (state) => {
        state.isFetchingGetUserInfo = true;
        state.fetchGetUserInfoMsg = null;
      })
      .addCase(fetchGetUserInfo.fulfilled, (state, action) => {
        state.isFetchingGetUserInfo = false;
        state.fetchGetUserInfoMsg = null;
        state.isAuth = true;
        state.userInfo = action.payload;
      })

      // Handle fetch login
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isAuth = false;
        state.userInfo = null;
        state.isFetchingLogin = false;
        state.fetchLoginMsg = action.payload || action.error.message;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.isFetchingLogin = true;
        state.fetchLoginMsg = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        setToken(action.payload.auth_info.access_token);
        state.isAuth = true;
        state.isFetchingLogin = false;
        state.fetchLoginMsg = null;
        state.userInfo = action.payload.user_info;
      })

      // Handle fetch register
      .addCase(fetchRegister.rejected, (state, action) => {
        state.isAuth = false;
        state.userInfo = null;
        state.isFetchingRegister = false;
        state.fetchRegisterMsg = action.payload || action.error.message;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.isFetchingRegister = true;
        state.fetchRegisterMsg = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        setToken(action.payload.auth_info.access_token);
        state.isAuth = true;
        state.isFetchingRegister = false;
        state.fetchRegisterMsg = null;
        state.userInfo = action.payload.user_info;
      })

      // Handle update user info
      .addCase(fetchUpdateUserInfo.rejected, (state, action) => {
        state.isFetchingUpdateUserInfo = false;
        state.fetchUpdateUserInfoMsg = action.payload || action.error.message;
      })
      .addCase(fetchUpdateUserInfo.pending, (state) => {
        state.isFetchingUpdateUserInfo = true;
        state.fetchUpdateUserInfoMsg = null;
      })
      .addCase(fetchUpdateUserInfo.fulfilled, (state, action) => {
        state.isFetchingUpdateUserInfo = false;
        state.fetchUpdateUserInfoMsg = MESSAGES.UPDATE_SUCCESS;
        state.userInfo = action.payload;
      })

      // Handle fetch change password
      .addCase(fetchChangePassword.rejected, (state, action) => {
        state.isFetchingChangePassword = false;
        state.fetchChangePasswordMsg = action.payload || action.error.message;
      })
      .addCase(fetchChangePassword.pending, (state) => {
        state.isFetchingChangePassword = true;
        state.fetchChangePasswordMsg = null;
      })
      .addCase(fetchChangePassword.fulfilled, (state) => {
        state.fetchChangePasswordMsg = MESSAGES.UPDATE_SUCCESS;
        state.isFetchingChangePassword = false;
      })

      // Handle fetch forgot password
      .addCase(fetchForfotPassword.rejected, (state, action) => {
        state.isFetchingForgotPassword = false;
        state.fetchForgotPasswordMsg = action.payload || action.error.message;
      })
      .addCase(fetchForfotPassword.pending, (state) => {
        state.isFetchingForgotPassword = true;
        state.fetchForgotPasswordMsg = null;
      })
      .addCase(fetchForfotPassword.fulfilled, (state) => {
        state.isFetchingForgotPassword = false;
        state.fetchForgotPasswordMsg = MESSAGES.CONFIRM_SUCCESS;
      })

      // Handle fetch reset password
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.isFetchingResetPassword = false;
        state.fetchResetPasswordMsg = action.payload || action.error.message;
      })
      .addCase(fetchResetPassword.pending, (state) => {
        state.isFetchingResetPassword = true;
        state.fetchResetPasswordMsg = null;
      })
      .addCase(fetchResetPassword.fulfilled, (state) => {
        state.isFetchingResetPassword = false;
        state.fetchResetPasswordMsg = MESSAGES.UPDATE_SUCCESS;
      });
  }
});

export const { logout, clearMsg } = authenSlice.actions;

export const selectIsAuth = (state: RootState) => state.authen.isAuth;
export const selectUserInfo = (state: RootState) => state.authen.userInfo;

export default authenSlice.reducer;
