import { ICategoryLevel0, IClearMsgPayload } from './category.types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@src/configs/redux/store';
import categoryApi from './categoryApi';

export interface IProductState {
  categories: ICategoryLevel0[];

  isFetchingGetAllCategories: boolean;
  fetchGetAllCategoriesMsg: any;
}

const initialState: IProductState = {
  categories: [],

  isFetchingGetAllCategories: false,
  fetchGetAllCategoriesMsg: null
};

export const fetchGetAllCategories = createAsyncThunk(
  'category/fetchGetAllCategoriess',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getAllCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearMsg(state: any, action: PayloadAction<IClearMsgPayload>) {
      if ([`fetchGetAllCategoriesMsg`].includes(action.payload)) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle fetch get all categories
      .addCase(fetchGetAllCategories.rejected, (state, action) => {
        state.isFetchingGetAllCategories = false;
        state.fetchGetAllCategoriesMsg = action.payload || action.error.message;
        state.categories = [];
      })
      .addCase(fetchGetAllCategories.pending, (state) => {
        state.isFetchingGetAllCategories = true;
        state.fetchGetAllCategoriesMsg = null;
      })
      .addCase(fetchGetAllCategories.fulfilled, (state, action) => {
        state.isFetchingGetAllCategories = false;
        state.fetchGetAllCategoriesMsg = null;
        state.categories = action.payload;
      });
  }
});

export const { clearMsg } = categorySlice.actions;

export const selectCategories = (state: RootState) => state.category.categories;

export default categorySlice.reducer;
