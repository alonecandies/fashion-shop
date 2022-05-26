import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import productTagApi from './productTagApi';
import { MESSAGES } from 'src/configs/constants';

const initialState = {
  productTags: [],
  currentProductTag: null,

  isFetchingGetProductTags: false,
  fetchGetProductTagsMsg: null,

  isFetchingCreateProductTag: false,
  fetchCreateProductTagMsg: null,

  isFetchingUpdateProductTag: false,
  fetchUpdateProductTagMsg: null,

  isFetchingDeleteProductTag: false,
  fetchDeleteProductTagMsg: null
};

export const fetchGetProductTags = createAsyncThunk(
  'productTag/fetchGetProductTags',
  async (params, { rejectWithValue }) => {
    try {
      const response = await productTagApi.getProductTags({
        ...params,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchGetProductTagById = createAsyncThunk(
  'productTag/fetchGetProductTagById',
  async (tagId, { rejectWithValue }) => {
    try {
      const response = await productTagApi.getProductTagById({
        tagId,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchCreateProductTag = createAsyncThunk(
  'productTag/fetchCreateProductTag',
  async (productTag, { rejectWithValue }) => {
    try {
      const response = await productTagApi.createProductTag({
        ...productTag,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateProductTag = createAsyncThunk(
  'productTag/fetchUpdateProductTag',
  async (productTag, { rejectWithValue }) => {
    try {
      const response = await productTagApi.updateProductTag({
        ...productTag,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchDeleteProductTag = createAsyncThunk(
  'productTag/fetchDeleteProductTag',
  async (productTag, { rejectWithValue }) => {
    try {
      const response = await productTagApi.deleteProductTag({
        ...productTag,
        token: cookies.get('token')
      });
      return { productTagId: productTag.productTagId, result: response.data };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const productTagSlice = createSlice({
  name: 'productTag',
  initialState,
  reducers: {
    clearMsg(state, action) {
      if (
        [
          `fetchCreateProductTagMsg`,
          `fetchUpdateProductTagMsg`,
          `fetchDeleteProductTagMsg`
        ].includes(action.payload)
      ) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle get all product tags
      .addCase(fetchGetProductTags.rejected, (state, action) => {
        state.fetchGetProductTagsMsg = action.payload || action.error.message;
        state.isFetchingCreateProductTag = false;
        state.productTags = [];
      })
      .addCase(fetchGetProductTags.pending, (state) => {
        state.fetchGetProductTagsMsg = null;
        state.isFetchingCreateProductTag = true;
      })
      .addCase(fetchGetProductTags.fulfilled, (state, action) => {
        state.fetchGetProductTagsMsg = null;
        state.isFetchingCreateProductTag = false;
        state.productTags = action.payload.results;
      })

      // Handle get product tag by id
      .addCase(fetchGetProductTagById.fulfilled, (state, action) => {
        state.currentProductTag = action.payload;
      })

      // Handle create product tag
      .addCase(fetchCreateProductTag.rejected, (state, action) => {
        state.fetchCreateProductTagMsg = action.payload || action.error.message;
        state.isFetchingCreateProductTag = false;
      })
      .addCase(fetchCreateProductTag.pending, (state) => {
        state.fetchCreateProductTagMsg = null;
        state.isFetchingCreateProductTag = true;
      })
      .addCase(fetchCreateProductTag.fulfilled, (state, action) => {
        state.fetchCreateProductTagMsg = MESSAGES.CREATE_SUCCESS;
        state.isFetchingCreateProductTag = false;
        state.productTags.unshift(action.payload);
        state.currentProductTag = action.payload;
      })

      // Handle update product tag
      .addCase(fetchUpdateProductTag.rejected, (state, action) => {
        state.fetchUpdateProductTagMsg = action.payload || action.error.message;
        state.isFetchingUpdateProductTag = false;
      })
      .addCase(fetchUpdateProductTag.pending, (state) => {
        state.fetchUpdateProductTagMsg = null;
        state.isFetchingUpdateProductTag = true;
      })
      .addCase(fetchUpdateProductTag.fulfilled, (state, action) => {
        state.fetchUpdateProductTagMsg = MESSAGES.UPDATE_SUCCESS;
        state.isFetchingUpdateProductTag = false;
        state.currentProductTag = action.payload;
        state.productTags = state.productTags.map((productTag) => {
          if (productTag.id === action.payload.id) {
            return action.payload;
          } else {
            return productTag;
          }
        });
      })

      // Handle delete product tag
      .addCase(fetchDeleteProductTag.rejected, (state, action) => {
        state.fetchDeleteProductTagMsg = action.payload || action.error.message;
        state.isFetchingDeleteProductTag = false;
      })
      .addCase(fetchDeleteProductTag.pending, (state) => {
        state.fetchDeleteProductTagMsg = null;
        state.isFetchingDeleteProductTag = true;
      })
      .addCase(fetchDeleteProductTag.fulfilled, (state, action) => {
        const { productTagId } = action.payload;
        state.productTags = state.productTags.filter(
          (productTag) => productTag.id !== productTagId
        );
        state.fetchDeleteProductTagMsg = MESSAGES.DELETE_SUCCESS;
        state.isFetchingDeleteProductTag = false;
      });
  }
});

export const { clearMsg } = productTagSlice.actions;

export const selectProductTags = (state) => state.productTagSlice.productTags;
export const selectCurrentProductTag = (state) => state.productTagSlice.currentProductTag;

export default productTagSlice.reducer;
