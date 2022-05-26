import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import bannerApi from './bannerApi';
import { MESSAGES } from 'src/configs/constants';

const initialState = {
  bannersData: [],
  currentBanner: null,

  //state for get all Banner
  isFetchingGetAllBanners: false,
  fetchGetAllBannersMsg: null,

  //state for get Banner by id
  isFetchingGetBannerById: false,
  fetchGetBannerByIdMsg: null,

  //state for create Banner
  isFetchingCreateBanner: false,
  fetchCreateBannerMsg: null,

  //state for update Banner
  isFetchingUpdateBanner: false,
  fetchUpdateBannerMsg: null,

  //state for delete Banner
  isFetchingDeleteBanner: false,
  fetchDeleteBannerMsg: null
};

export const fetchGetAllBanners = createAsyncThunk(
  'banner/fetchGetAllBanners',
  async ({ title, type }, { rejectWithValue }) => {
    try {
      const response = await bannerApi.getAllBanners({ title, type, token: cookies.get('token') });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchGetBannerById = createAsyncThunk(
  'banner/fetchGetBannerById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await bannerApi.getBannerById({
        id,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchCreateBanner = createAsyncThunk(
  'banner/fetchCreateBanner',
  async ({ title, type, url }, { rejectWithValue }) => {
    try {
      const response = await bannerApi.createBanner({
        title,
        type,
        url,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateBanner = createAsyncThunk(
  'banner/fetchUpdateBanner',
  async (data, { rejectWithValue }) => {
    try {
      const response = await bannerApi.updateBanner({
        data,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchDeleteBanner = createAsyncThunk(
  'banner/fetchDeleteBanner',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await bannerApi.deleteBanner({
        id,
        token: cookies.get('token')
      });
      return { bannerId: id, result: response.data };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    clearMsg(state, action) {
      if (
        [
          `fetchGetAllBannersMsg`,
          `fetchGetBannerByIdMsg`,
          `fetchCreateBannerMsg`,
          `fetchUpdateBannerMsg`,
          `fetchDeleteBannerMsg`
        ].includes(action.payload)
      ) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle fetch get all Banners
      .addCase(fetchGetAllBanners.rejected, (state, action) => {
        state.bannersData = [];
        state.isFetchingGetAllBanners = false;
        state.fetchGetAllBannersMsg = action.payload || action.error.message;
      })
      .addCase(fetchGetAllBanners.pending, (state) => {
        state.isFetchingGetAllBanners = true;
        state.bannersData = [];
        state.fetchGetAllBannersMsg = null;
      })
      .addCase(fetchGetAllBanners.fulfilled, (state, action) => {
        state.isFetchingGetAllBanners = false;
        state.fetchGetAllBannersMsg = null;
        state.bannersData = action.payload;
      })

      // Handle fetch get an Banner by id
      .addCase(fetchGetBannerById.rejected, (state, action) => {
        state.isFetchingGetBannerById = false;
        state.fetchGetBannerByIdMsg = action.payload || action.error.message;
        state.currentBanner = null;
      })
      .addCase(fetchGetBannerById.pending, (state) => {
        state.isFetchingGetBannerById = true;
        state.fetchGetBannerByIdMsg = null;
        state.currentBanner = null;
      })
      .addCase(fetchGetBannerById.fulfilled, (state, action) => {
        state.isFetchingGetBannerById = false;
        state.fetchGetBannerByIdMsg = null;
        state.currentBanner = action.payload;
      })

      //Handle fetch update a banner
      .addCase(fetchCreateBanner.rejected, (state, action) => {
        state.isFetchingCreateBanner = false;
        state.fetchCreateBannerMsg = action.payload || action.error.message;
      })
      .addCase(fetchCreateBanner.pending, (state, action) => {
        state.isFetchingCreateBanner = true;
        state.fetchCreateBannerMsg = null;
      })
      .addCase(fetchCreateBanner.fulfilled, (state, action) => {
        state.isFetchingCreateBanner = false;
        state.fetchCreateBannerMsg = MESSAGES.CREATE_SUCCESS;
        state.currentBanner = action.payload;
        state.bannersData.push(state.currentBanner);
      })

      //Handle fetch update a banner
      .addCase(fetchUpdateBanner.rejected, (state, action) => {
        state.isFetchingUpdateBanner = false;
        state.fetchUpdateBannerMsg = action.payload || action.error.message;
      })
      .addCase(fetchUpdateBanner.pending, (state, action) => {
        state.isFetchingUpdateBanner = true;
        state.fetchUpdateBannerMsg = null;
      })
      .addCase(fetchUpdateBanner.fulfilled, (state, action) => {
        state.isFetchingUpdateBanner = false;
        state.fetchUpdateBannerMsg = MESSAGES.UPDATE_SUCCESS;
        state.currentBanner = action.payload;
        state.bannersData = state.bannersData.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })

      //Handle fetch delete Banner
      .addCase(fetchDeleteBanner.rejected, (state, action) => {
        state.isFetchingDeleteBanner = false;
        state.fetchDeleteBannerMsg = action.payload || action.error.message;
      })
      .addCase(fetchDeleteBanner.pending, (state, action) => {
        state.isFetchingDeleteBanner = true;
        state.fetchDeleteBannerMsg = null;
      })
      .addCase(fetchDeleteBanner.fulfilled, (state, action) => {
        const { bannerId } = action.payload;
        state.isFetchingDeleteBanner = false;
        state.fetchDeleteBannerMsg = MESSAGES.DELETE_SUCCESS;
        state.bannersData = state.bannersData.filter((banner) => banner.id !== bannerId);
      });
  }
});

export const { clearMsg } = bannerSlice.actions;

export const selectBannersData = (state) => state.bannerSlice.bannersData;
export const selectCurrentBanner = (state) => state.bannerSlice.currentBanner;

export default bannerSlice.reducer;
