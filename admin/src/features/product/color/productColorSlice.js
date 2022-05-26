import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import productColorApi from './productColorApi';
import { MESSAGES } from 'src/configs/constants';

const initialState = {
  productColors: [],
  currentProductColor: null,

  isFetchingGetProductColors: false,
  fetchGetProductColorsMsg: null,

  isFetchingCreateProductColor: false,
  fetchCreateProductColorMsg: null,

  isFetchingUpdateProductColor: false,
  fetchUpdateProductColorMsg: null,

  isFetchingDeleteProductColor: false,
  fetchDeleteProductColorMsg: null
};

export const fetchGetProductColors = createAsyncThunk(
  'productColor/fetchGetProductColors',
  async (params, { rejectWithValue }) => {
    try {
      const response = await productColorApi.getProductColors({
        ...params,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchGetProductColorById = createAsyncThunk(
  'productColor/fetchGetProductColorById',
  async ({ productColorId }, { rejectWithValue }) => {
    try {
      const response = await productColorApi.getProductColorById({
        productColorId,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchCreateProductColor = createAsyncThunk(
  'productColor/fetchCreateProductColor',
  async (productColor, { rejectWithValue }) => {
    try {
      const response = await productColorApi.createProductColor({
        ...productColor,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateProductColor = createAsyncThunk(
  'productColor/fetchUpdateProductColor',
  async (productColor, { rejectWithValue }) => {
    try {
      const response = await productColorApi.updateProductColor({
        ...productColor,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchDeleteProductColor = createAsyncThunk(
  'productColor/fetchDeleteProductColor',
  async (productColor, { rejectWithValue }) => {
    try {
      const response = await productColorApi.deleteProductColor({
        ...productColor,
        token: cookies.get('token')
      });
      return { ...productColor, result: response.data };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const productColorSlice = createSlice({
  name: 'productColor',
  initialState,
  reducers: {
    clearMsg(state, action) {
      if (
        [
          `fetchCreateProductColorMsg`,
          `fetchUpdateProductColorMsg`,
          `fetchDeleteProductColorMsg`
        ].includes(action.payload)
      ) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle get all product colors
      .addCase(fetchGetProductColors.rejected, (state, action) => {
        state.fetchGetProductColorsMsg = action.payload || action.error.message;
        state.isFetchingGetProductColors = false;
        state.productColors = [];
      })
      .addCase(fetchGetProductColors.pending, (state) => {
        state.fetchGetProductColorsMsg = null;
        state.isFetchingGetProductColors = true;
      })
      .addCase(fetchGetProductColors.fulfilled, (state, action) => {
        state.fetchGetProductColorsMsg = null;
        state.isFetchingGetProductColors = false;
        state.productColors = action.payload;
      })

      // Handle get product color by id
      .addCase(fetchGetProductColorById.fulfilled, (state, action) => {
        state.currentProductColor = action.payload;
      })

      // Handle create product color
      .addCase(fetchCreateProductColor.rejected, (state, action) => {
        state.fetchCreateProductColorMsg = action.payload || action.error.message;
        state.isFetchingCreateProductColor = false;
      })
      .addCase(fetchCreateProductColor.pending, (state) => {
        state.fetchCreateProductColorMsg = null;
        state.isFetchingCreateProductColor = true;
      })
      .addCase(fetchCreateProductColor.fulfilled, (state, action) => {
        state.fetchCreateProductColorMsg = MESSAGES.CREATE_SUCCESS;
        state.isFetchingCreateProductColor = false;
        state.currentProductColor = action.payload;
        state.productColors.unshift(action.payload);
      })

      // Handle update product color
      .addCase(fetchUpdateProductColor.rejected, (state, action) => {
        state.fetchUpdateProductColorMsg = action.payload || action.error.message;
        state.isFetchingUpdateProductColor = false;
      })
      .addCase(fetchUpdateProductColor.pending, (state) => {
        state.fetchUpdateProductColorMsg = null;
        state.isFetchingUpdateProductColor = true;
      })
      .addCase(fetchUpdateProductColor.fulfilled, (state, action) => {
        state.fetchUpdateProductColorMsg = MESSAGES.UPDATE_SUCCESS;
        state.isFetchingUpdateProductColor = false;
        state.currentProductColor = action.payload;
        state.productColors = state.productColors.map((productColor) => {
          if (productColor.id === action.payload.id) {
            return action.payload;
          } else {
            return productColor;
          }
        });
      })

      // Handle delete product color
      .addCase(fetchDeleteProductColor.rejected, (state, action) => {
        state.fetchDeleteProductColorMsg = action.payload || action.error.message;
        state.isFetchingDeleteProductColor = false;
      })
      .addCase(fetchDeleteProductColor.pending, (state) => {
        state.fetchDeleteProductColorMsg = null;
        state.isFetchingDeleteProductColor = true;
      })
      .addCase(fetchDeleteProductColor.fulfilled, (state, action) => {
        state.fetchDeleteProductColorMsg = MESSAGES.DELETE_SUCCESS;
        state.isFetchingDeleteProductColor = false;
        state.productColors = state.productColors.filter(
          (productColor) => productColor.id !== action.payload.productColorId
        );
      });
  }
});

export const { clearMsg } = productColorSlice.actions;

export const selectProductColors = (state) => state.productColorSlice.productColors;
export const selectCurrentProductColor = (state) => state.productColorSlice.currentProductColor;

export default productColorSlice.reducer;
