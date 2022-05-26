import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import productSizeApi from './productSizeApi';
import { MESSAGES } from 'src/configs/constants';

const initialState = {
  productSizes: [],
  currentProductSize: null,

  isFetchingGetProductSizes: false,
  fetchGetProductSizesMsg: null,

  isFetchingCreateProductSize: false,
  fetchCreateProductSizeMsg: null,

  isFetchingUpdateProductSize: false,
  fetchUpdateProductSizeMsg: null,

  isFetchingDeleteProductSize: false,
  fetchDeleteProductSizeMsg: null
};

export const fetchGetProductSizes = createAsyncThunk(
  'productSize/fetchGetProductSizes',
  async (params, { rejectWithValue }) => {
    try {
      const response = await productSizeApi.getSizes({ ...params, token: cookies.get('token') });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchGetProductSizeById = createAsyncThunk(
  'productSize/fetchGetProductSizeById',
  async (productSizeId, { rejectWithValue }) => {
    try {
      const response = await productSizeApi.getSizeById({
        productSizeId,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchCreateProductSize = createAsyncThunk(
  'productSize/fetchCreateProductSize',
  async (productSize, { rejectWithValue }) => {
    try {
      const response = await productSizeApi.createSize({
        ...productSize,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateProductSize = createAsyncThunk(
  'productSize/fetchUpdateProductSize',
  async (productSize, { rejectWithValue }) => {
    try {
      const response = await productSizeApi.updateSize({
        ...productSize,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchDeleteProductSize = createAsyncThunk(
  'productSize/fetchDeleteProductSize',
  async (productSize, { rejectWithValue }) => {
    try {
      const response = await productSizeApi.deleteSize({
        ...productSize,
        token: cookies.get('token')
      });
      return { productSizeId: productSize.productSizeId, result: response.data };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const productSizeSlice = createSlice({
  name: 'productSize',
  initialState,
  reducers: {
    clearMsg(state, action) {
      if (
        [
          `fetchCreateProductSizeMsg`,
          `fetchUpdateProductSizeMsg`,
          `fetchDeleteProductSizeMsg`
        ].includes(action.payload)
      ) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle get all product sizes
      .addCase(fetchGetProductSizes.rejected, (state, action) => {
        state.fetchGetProductSizesMsg = action.payload || action.error.message;
        state.isFetchingGetProductSizes = false;
        state.productSizes = [];
      })
      .addCase(fetchGetProductSizes.pending, (state) => {
        state.fetchGetProductSizesMsg = null;
        state.isFetchingGetProductSizes = true;
      })
      .addCase(fetchGetProductSizes.fulfilled, (state, action) => {
        state.fetchGetProductSizesMsg = null;
        state.isFetchingGetProductSizes = false;
        state.productSizes = action.payload;
      })

      // Handle get product size by id
      .addCase(fetchGetProductSizeById.fulfilled, (state, action) => {
        state.currentProductSize = action.payload;
      })

      // Handle create product size
      .addCase(fetchCreateProductSize.rejected, (state, action) => {
        state.fetchCreateProductSizeMsg = action.payload || action.error.message;
        state.isFetchingCreateProductSize = false;
      })
      .addCase(fetchCreateProductSize.pending, (state) => {
        state.fetchCreateProductSizeMsg = null;
        state.isFetchingCreateProductSize = true;
      })
      .addCase(fetchCreateProductSize.fulfilled, (state, action) => {
        state.fetchCreateProductSizeMsg = MESSAGES.CREATE_SUCCESS;
        state.isFetchingCreateProductSize = false;
        state.productSizes.unshift(action.payload);
        state.currentProductSize = action.payload;
      })

      // Handle update product size
      .addCase(fetchUpdateProductSize.rejected, (state, action) => {
        state.fetchUpdateProductSizeMsg = action.payload || action.error.message;
        state.isFetchingUpdateProductSize = false;
      })
      .addCase(fetchUpdateProductSize.pending, (state) => {
        state.fetchUpdateProductSizeMsg = null;
        state.isFetchingUpdateProductSize = true;
      })
      .addCase(fetchUpdateProductSize.fulfilled, (state, action) => {
        state.fetchUpdateProductSizeMsg = MESSAGES.UPDATE_SUCCESS;
        state.isFetchingUpdateProductSize = false;
        state.currentProductSize = action.payload;
        state.productSizes = state.productSizes.map((productSize) => {
          if (productSize.id === action.payload.id) {
            return action.payload;
          } else {
            return productSize;
          }
        });
      })

      // Handle delete product size
      .addCase(fetchDeleteProductSize.rejected, (state, action) => {
        state.fetchDeleteProductSizeMsg = action.payload || action.error.message;
        state.isFetchingDeleteProductSize = false;
      })
      .addCase(fetchDeleteProductSize.pending, (state) => {
        state.fetchDeleteProductSizeMsg = null;
        state.isFetchingDeleteProductSize = true;
      })
      .addCase(fetchDeleteProductSize.fulfilled, (state, action) => {
        const { productSizeId } = action.payload;
        state.productSizes = state.productSizes.filter(
          (productSize) => productSize.id !== productSizeId
        );
        state.fetchDeleteProductSizeMsg = MESSAGES.DELETE_SUCCESS;
        state.isFetchingDeleteProductSize = false;
      });
  }
});

export const { clearMsg } = productSizeSlice.actions;

export const selectProductSizes = (state) => state.productSizeSlice.productSizes;
export const selectCurrentProductSize = (state) => state.productSizeSlice.currentProductSize;

export default productSizeSlice.reducer;
