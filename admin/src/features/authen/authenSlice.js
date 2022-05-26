import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import authenApi from './authenApi';
import { MESSAGES } from 'src/configs/constants';

const initialState = {
  isAuth: false,
  userData: null,

  // state for get user info
  isFetchingUserData: false,
  fetchUserDataMsg: null,

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
  isFetchingUpdateInfo: false,
  fetchUpdateInfoMsg: null
};

export const fetchGetUserData = createAsyncThunk(
  'authen/fetchGetUserInfo',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authenApi.getInformation({ token: cookies.get('token') });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  'authen/fetchLogin',
  async ({ email, password, remember }, { rejectWithValue }) => {
    try {
      const response = await authenApi.login({ email, password, remember });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  'authen/fetchRegister',
  async ({ name, email, password, phone, address }, { rejectWithValue }) => {
    try {
      const response = await authenApi.register({ name, email, password, phone, address });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchChangePassword = createAsyncThunk(
  'authen/fetchChangePassword',
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await authenApi.changePassword({
        token: cookies.get('token'),
        oldPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateInfo = createAsyncThunk(
  'authen/fetchUpdateInfo',
  async ({ id, name, phone, address }, { rejectWithValue }) => {
    try {
      const response = await authenApi.updateInfo({
        token: cookies.get('token'),
        id,
        name,
        phone,
        address
      });
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
      cookies.remove('token');
      state.isAuth = false;
      state.userData = null;
    },

    clearMsg(state, action) {
      if (
        [
          `fetchUserDataMsg`,
          `fetchLoginMsg`,
          `fetchRegisterMsg`,
          `fetchChangePasswordMsg`,
          `fetchUpdateInfoMsg`
        ].includes(action.payload)
      ) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle fetch get user information
      .addCase(fetchGetUserData.rejected, (state, action) => {
        state.isAuth = false;
        state.isFetchingUserData = false;
        state.fetchUserDataMsg = action.payload || action.error.message;
        state.userData = null;
      })
      .addCase(fetchGetUserData.pending, (state) => {
        state.isFetchingUserData = true;
        state.fetchUserDataMsg = null;
      })
      .addCase(fetchGetUserData.fulfilled, (state, action) => {
        state.isFetchingUserData = false;
        state.fetchUserDataMsg = null;
        state.userData = action.payload;
      })

      // Handle fetch login
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isAuth = false;
        state.userData = null;
        state.isFetchingLogin = false;
        state.fetchLoginMsg = action.payload || action.error.message;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.isFetchingLogin = true;
        state.fetchLoginMsg = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        cookies.set('token', action.payload.auth_info.access_token);
        state.isAuth = true;
        state.isFetchingLogin = false;
        state.fetchLoginMsg = null;
        state.userData = action.payload.user_info;
      })

      // Handle fetch register
      .addCase(fetchRegister.rejected, (state, action) => {
        state.isAuth = false;
        state.userData = null;
        state.isFetchingRegister = false;
        state.fetchRegisterMsg = action.payload || action.error.message;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.isFetchingRegister = true;
        state.fetchRegisterMsg = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        cookies.set('token', action.payload.auth_info.access_token);
        state.isAuth = true;
        state.isFetchingRegister = false;
        state.fetchRegisterMsg = null;
        state.userData = action.payload.user_info;
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
      .addCase(fetchChangePassword.fulfilled, (state, action) => {
        state.fetchChangePasswordMsg = MESSAGES.UPDATE_SUCCESS;
        state.isFetchingChangePassword = false;
      })

      // Handle fetch update info password
      .addCase(fetchUpdateInfo.rejected, (state, action) => {
        state.isFetchingUpdateInfo = false;
        state.fetchUpdateInfoMsg = action.payload || action.error.message;
      })
      .addCase(fetchUpdateInfo.pending, (state) => {
        state.fetchUpdateInfoMsg = null;
        state.isFetchingUpdateInfo = true;
      })
      .addCase(fetchUpdateInfo.fulfilled, (state, action) => {
        state.fetchUpdateInfoMsg = MESSAGES.UPDATE_SUCCESS;
        state.isFetchingUpdateInfo = false;
        state.userData = action.payload;
      });
  }
});

export const { logout, clearMsg } = authenSlice.actions;

export const selectIsAuth = (state) => state.authenSlice.isAuth;
export const selectUserInfo = (state) => state.authenSlice.userData;

export default authenSlice.reducer;
