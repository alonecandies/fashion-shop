import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import userApi from './userApi';
import { MESSAGES } from 'src/configs/constants';

const initialState = {
  usersData: [],
  totalUser: 0,
  user: null,

  // state for get all user
  isFetchingGetAllUsers: false,
  fetchGetAllUsersMsg: null,

  // state for get user by id
  isFetchingGetUserById: false,
  fetchGetUserByIdMsg: null,

  // state for update user status
  isFetchingUpdateUserStatus: false,
  fetchUpdateUserStatusMsg: null,

  // state for update user
  isFetchingUpdateUser: false,
  fetchUpdateUserMsg: null
};

export const fetchGetAllUsers = createAsyncThunk(
  'user/fetchGetAllUsers',
  async ({ name, order, status, page, pageSize }, { rejectWithValue }) => {
    try {
      const response = await userApi.getAllUsers({
        name,
        order,
        status,
        page,
        pageSize,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchGetUserById = createAsyncThunk(
  'user/fetchGetUserById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserById({ id, token: cookies.get('token') });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateUserStatus = createAsyncThunk(
  'user/fetchUpdateUserStatus',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userApi.updateUserStatus({
        data,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userApi.updateUser({
        data,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearMsg(state, action) {
      if (
        [
          `fetchGetAllUsersMsg`,
          `fetchGetUserByIdMsg`,
          `fetchUpdateUserStatusMsg`,
          `fetchUpdateUserMsg`
        ].includes(action.payload)
      ) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle fetch get user information
      .addCase(fetchGetAllUsers.rejected, (state, action) => {
        state.usersData = [];
        state.totalUser = 0;
        state.isFetchingGetAllUsers = false;
        state.fetchGetAllUsersMsg = action.payload || action.error.message;
      })
      .addCase(fetchGetAllUsers.pending, (state) => {
        state.isFetchingGetAllUsers = true;
        state.usersData = [];
        state.totalUser = 0;
        state.fetchGetAllUsersMsg = null;
      })
      .addCase(fetchGetAllUsers.fulfilled, (state, action) => {
        state.isFetchingGetAllUsers = false;
        state.fetchGetAllUsersMsg = null;
        state.usersData = action.payload.results;
        state.totalUser = action.payload.total;
      })

      // Handle fetch get an user by id
      .addCase(fetchGetUserById.rejected, (state, action) => {
        state.isFetchingGetUserById = false;
        state.fetchGetUserByIdMsg = action.payload || action.error.message;
        state.user = null;
      })
      .addCase(fetchGetUserById.pending, (state) => {
        state.isFetchingGetUserById = true;
        state.fetchGetUserByIdMsg = null;
        state.user = null;
      })
      .addCase(fetchGetUserById.fulfilled, (state, action) => {
        state.isFetchingGetUserById = false;
        state.fetchGetUserByIdMsg = null;
        state.user = action.payload;
      })

      // Handle fetch update status of an user
      .addCase(fetchUpdateUserStatus.rejected, (state, action) => {
        state.isFetchingUpdateUserStatus = false;
        state.fetchUpdateUserStatusMsg = action.payload || action.error.message;
      })
      .addCase(fetchUpdateUserStatus.pending, (state) => {
        state.isFetchingUpdateUserStatus = true;
        state.fetchUpdateUserStatusMsg = null;
      })
      .addCase(fetchUpdateUserStatus.fulfilled, (state, action) => {
        state.isFetchingUpdateUserStatus = false;
        state.fetchUpdateUserStatusMsg = MESSAGES.UPDATE_SUCCESS;
        state.user = action.payload;
        state.usersData = state.usersData.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })

      //Handle fetch update an user
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.isFetchingUpdateUser = false;
        state.fetchUpdateUserMsg = action.payload || action.error.message;
      })
      .addCase(fetchUpdateUser.pending, (state, action) => {
        state.isFetchingUpdateUser = true;
        state.fetchUpdateUserMsg = null;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.isFetchingUpdateUser = false;
        state.fetchUpdateUserMsg = MESSAGES.UPDATE_SUCCESS;
        state.user = action.payload;
        state.usersData = state.usersData.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      });
  }
});

export const { clearMsg } = userSlice.actions;

export const selectUsersData = (state) => state.userSlice.usersData;
export const selectTotalUser = (state) => state.userSlice.totalUser;
export const selectUser = (state) => state.userSlice.user;

export default userSlice.reducer;
