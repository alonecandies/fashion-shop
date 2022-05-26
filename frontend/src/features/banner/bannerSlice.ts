import { IBanner, IClearMsgPayload } from './banner.types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@src/configs/redux/store';
import bannerApi from './bannerApi';

export interface IBannerState {
  banners: IBanner[];

  isFetchingGetAllBanners: boolean;
  fetchGetAllBannersMsg: any;
}

const initialState: IBannerState = {
  banners: [],

  isFetchingGetAllBanners: false,
  fetchGetAllBannersMsg: null
};

export const fetchGetAllBanners = createAsyncThunk(
  'banner/fetchGetAllBanners',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await bannerApi.getAllBanners();
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    clearMsg(state: any, action: PayloadAction<IClearMsgPayload>) {
      if ([`fetchGetAllBannersMsg`].includes(action.payload)) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllBanners.rejected, (state, action) => {
        state.isFetchingGetAllBanners = false;
        state.fetchGetAllBannersMsg = action.payload || action.error.message;
        state.banners = [];
      })
      .addCase(fetchGetAllBanners.pending, (state) => {
        state.isFetchingGetAllBanners = true;
        state.fetchGetAllBannersMsg = null;
      })
      .addCase(fetchGetAllBanners.fulfilled, (state, action) => {
        state.isFetchingGetAllBanners = false;
        state.fetchGetAllBannersMsg = null;
        state.banners = action.payload;
      });
  }
});

export const { clearMsg } = bannerSlice.actions;

export const selectBanners = (state: RootState) => state.banner.banners;

export default bannerSlice.reducer;
