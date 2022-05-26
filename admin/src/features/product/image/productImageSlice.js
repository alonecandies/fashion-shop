import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import productImageApi from './productImageApi';
import { MESSAGES } from 'src/configs/constants';

const initialState = {
  currentProductImages: [],
  currentProductImage: null,

  isFetchingCreateProductImage: false,
  fetchCreateProductImageMsg: null,

  isFetchingUpdateProductImage: false,
  fetchUpdateProductImageMsg: null,

  isFetchingDeleteProductImage: false,
  fetchDeleteProductImageMsg: null,

  isFetchingGetProductImages: false,

  isFetchingGetProductImageById: false
};

export const fetchCreateProductImage = createAsyncThunk(
  'productImage/fetchCreateProductImage',
  async ({ productId, image }, { rejectWithValue }) => {
    try {
      const response = await productImageApi.createProductImage({
        productId,
        image,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateProductImage = createAsyncThunk(
  'productImage/fetchUpdateProductImage',
  async (productImage, { rejectWithValue }) => {
    try {
      const response = await productImageApi.updateProductImage({
        ...productImage,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchDeleteProductImage = createAsyncThunk(
  'productImage/fetchDeleteProductImage',
  async ({ productImageId }, { rejectWithValue }) => {
    try {
      await productImageApi.deleteProductImage({
        productImageId,
        token: cookies.get('token')
      });
      return { productImageId };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchGetProductImages = createAsyncThunk(
  'productImage/fetchGetProductImages',
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await productImageApi.getProductImages({
        productId,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchGetProductImageById = createAsyncThunk(
  'productImage/fetchGetProductImageById',
  async ({ productImageId }, { rejectWithValue }) => {
    try {
      const response = await productImageApi.getProductImageById({
        productImageId,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const productImageSlice = createSlice({
  name: 'productImage',
  initialState,
  reducers: {
    clearMsg(state, action) {
      if (
        [
          `fetchCreateProductImageMsg`,
          `fetchDeleteProductImageMsg`,
          `fetchUpdateProductImageMsg`
        ].includes(action.payload)
      ) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle create product image
      .addCase(fetchCreateProductImage.rejected, (state, action) => {
        state.fetchCreateProductImageMsg = action.payload || action.error.message;
        state.isFetchingCreateProductImage = false;
      })
      .addCase(fetchCreateProductImage.pending, (state) => {
        state.fetchCreateProductImageMsg = null;
        state.isFetchingCreateProductImage = true;
      })
      .addCase(fetchCreateProductImage.fulfilled, (state, action) => {
        state.fetchCreateProductImageMsg = MESSAGES.ADD_SUCCESS;
        state.isFetchingCreateProductImage = false;
        state.currentProductImages.push(action.payload);
      })

      // Handle update product image
      .addCase(fetchUpdateProductImage.rejected, (state, action) => {
        state.fetchUpdateProductImageMsg = action.payload || action.error.message;
        state.isFetchingUpdateProductImage = false;
      })
      .addCase(fetchUpdateProductImage.pending, (state) => {
        state.fetchUpdateProductImageMsg = null;
        state.isFetchingUpdateProductImage = true;
      })
      .addCase(fetchUpdateProductImage.fulfilled, (state, action) => {
        state.fetchUpdateProductImageMsg = MESSAGES.UPDATE_SUCCESS;
        state.isFetchingUpdateProductImage = false;
        state.currentProductImages = state.currentProductImages.map((productImage) => {
          if (productImage.id === action.payload.id) {
            return action.payload;
          } else {
            return productImage;
          }
        });
      })

      // Handle delete product image
      .addCase(fetchDeleteProductImage.rejected, (state, action) => {
        state.fetchDeleteProductImageMsg = action.payload || action.error.message;
        state.isFetchingDeleteProductImage = false;
      })
      .addCase(fetchDeleteProductImage.pending, (state) => {
        state.fetchDeleteProductImageMsg = null;
        state.isFetchingDeleteProductImage = true;
      })
      .addCase(fetchDeleteProductImage.fulfilled, (state, action) => {
        state.fetchDeleteProductImageMsg = MESSAGES.DELETE_SUCCESS;
        state.isFetchingDeleteProductImage = false;
        state.currentProductImages = state.currentProductImages.filter(
          (image) => image.id !== action.payload.productImageId
        );
      })

      // Handle get product images
      .addCase(fetchGetProductImages.pending, (state) => {
        state.isFetchingGetProductImages = true;
      })
      .addCase(fetchGetProductImages.fulfilled, (state, action) => {
        state.isFetchingGetProductImages = false;
        state.currentProductImages = action.payload;
      })

      // Handle get product image by id
      .addCase(fetchGetProductImageById.pending, (state) => {
        state.isFetchingGetProductImageById = true;
      })
      .addCase(fetchGetProductImageById.fulfilled, (state, action) => {
        state.isFetchingGetProductImageById = false;
        state.currentProductImage = action.payload;
      });
  }
});

export const { clearMsg } = productImageSlice.actions;

export const selectCurrentProuctImages = (state) => state.productImageSlice.currentProductImages;
export const selectCurrentProuctImage = (state) => state.productImageSlice.currentProductImage;

export default productImageSlice.reducer;
