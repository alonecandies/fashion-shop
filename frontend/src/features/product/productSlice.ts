import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@src/configs/redux/store';
import productApi from './productApi';
import { IGetAllProductParams, IProduct, IClearMsgPayload } from './product.types';

export interface IProductState {
  products: Array<IProduct>;
  currentProduct: IProduct | null;
  totalProducts: number;

  isFetchingGetAllProducts: boolean;
  fetchGetAllProductsMsg: any;

  isFetchingGetProductById: boolean;
  fetchGetProductByIdMsg: any;

  isFetchingLikeProduct: boolean;
  fetchLikeProductMsg: any;
}

const initialState: IProductState = {
  products: [],
  currentProduct: null,
  totalProducts: 0,

  isFetchingGetAllProducts: false,
  fetchGetAllProductsMsg: null,

  isFetchingGetProductById: false,
  fetchGetProductByIdMsg: null,

  isFetchingLikeProduct: false,
  fetchLikeProductMsg: null
};

export const fetchGetAllProducts = createAsyncThunk(
  'product/fetchGetAllProducts',
  async (payload: IGetAllProductParams, { rejectWithValue }) => {
    try {
      const response = await productApi.getAllProducts(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchGetProductById = createAsyncThunk(
  'product/fetchGetProductById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await productApi.getProductById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchLikeProduct = createAsyncThunk(
  'product/fetchLikeProduct',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await productApi.likeProduct(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearMsg(state: any, action: PayloadAction<IClearMsgPayload>) {
      if (
        [`fetchGetAllProductsMsg`, `fetchGetProductByIdMsg`, `fetchLikedProductMsg`].includes(
          action.payload
        )
      ) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle fetch get all products
      .addCase(fetchGetAllProducts.rejected, (state, action) => {
        state.isFetchingGetAllProducts = false;
        state.fetchGetAllProductsMsg = action.payload || action.error.message;
        state.products = [];
        state.totalProducts = 0;
      })
      .addCase(fetchGetAllProducts.pending, (state) => {
        state.isFetchingGetAllProducts = true;
        state.fetchGetAllProductsMsg = null;
      })
      .addCase(fetchGetAllProducts.fulfilled, (state, action) => {
        state.isFetchingGetAllProducts = false;
        state.fetchGetAllProductsMsg = null;
        state.products = action.payload.results;
        state.totalProducts = action.payload.total;
      })

      // Handle get product detail
      .addCase(fetchGetProductById.rejected, (state, action) => {
        state.isFetchingGetProductById = false;
        state.fetchGetProductByIdMsg = action.payload || action.error.message;
        state.currentProduct = null;
      })
      .addCase(fetchGetProductById.pending, (state) => {
        state.isFetchingGetProductById = true;
        state.fetchGetProductByIdMsg = null;
      })
      .addCase(fetchGetProductById.fulfilled, (state, action) => {
        state.isFetchingGetProductById = false;
        state.fetchGetProductByIdMsg = null;
        state.currentProduct = action.payload;
      })

      // Handle like product
      .addCase(fetchLikeProduct.rejected, (state, action) => {
        state.isFetchingLikeProduct = false;
        state.fetchLikeProductMsg = action.payload || action.error.message;
      })
      .addCase(fetchLikeProduct.pending, (state) => {
        state.isFetchingLikeProduct = true;
        state.fetchLikeProductMsg = null;
      })
      .addCase(fetchLikeProduct.fulfilled, (state, action) => {
        state.isFetchingLikeProduct = false;
        state.fetchLikeProductMsg = null;
        state.currentProduct = action.payload;
      });
  }
});

export const { clearMsg } = productSlice.actions;

export const selectProducts = (state: RootState) => state.product.products;
export const selectCurrentProduct = (state: RootState) => state.product.currentProduct;
export const selectTotalProducts = (state: RootState) => state.product.totalProducts;

export default productSlice.reducer;
