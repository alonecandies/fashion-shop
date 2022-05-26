import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import productApi from './productApi';
import { MESSAGES } from 'src/configs/constants';

const initialState = {
  productsCount: 0,
  products: [],
  currentProduct: null,

  isFetchingGetAllProducts: false,
  fetchGetAllProductsMsg: null,

  isFetchingGetProductById: false,

  isFetchingCreateProduct: false,
  fetchCreateProductMsg: null,

  isFetchingCreateProductImage: false,
  fetchCreateProductImageMsg: null,

  isFetchingUpdateProduct: false,
  fetchUpdateProductMsg: null,

  isFetchingUpdateStatusProduct: false,
  fetchUpdateStatusProductMsg: null,

  isFetchingDeleteProduct: false,
  fetchDeleteProductMsg: null,

  isFetchingUpdateStock: false,
  fetchUpdateStockMsg: null
};

export const fetchGetAllProducts = createAsyncThunk(
  'product/fetchGetAllProducts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await productApi.getAllProducts({ ...params, token: cookies.get('token') });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchGetProductById = createAsyncThunk(
  'product/fetchGetProductById',
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await productApi.getProductById({ productId, token: cookies.get('token') });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchCreateProduct = createAsyncThunk(
  'product/fetchCreateProduct',
  async ({ product, filter }, { rejectWithValue }) => {
    try {
      const productResult = (
        await productApi.createProduct({ product, token: cookies.get('token') })
      ).data;
      const productResults = (
        await productApi.getAllProducts({
          ...filter,
          token: cookies.get('token')
        })
      ).data;

      return { currentProduct: productResult, products: productResults };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchCreateProductImage = createAsyncThunk(
  'product/fetchCreateProductImage',
  async ({ productId, image }, { rejectWithValue }) => {
    try {
      const response = await productApi.createProductImage({
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

export const fetchUpdateProduct = createAsyncThunk(
  'product/fetchUpdateProduct',
  async ({ product, filter }, { rejectWithValue }) => {
    try {
      const productResult = (
        await productApi.updateProduct({ product, token: cookies.get('token') })
      ).data;
      const productResults = (
        await productApi.getAllProducts({
          ...filter,
          token: cookies.get('token')
        })
      ).data;

      return { currentProduct: productResult, products: productResults };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateStatusProduct = createAsyncThunk(
  'product/fetchUpdateStatusProduct',
  async (product, { rejectWithValue }) => {
    try {
      const response = await productApi.updateStatus({ product, token: cookies.get('token') });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchDeleteProduct = createAsyncThunk(
  'product/fetchDeleteProduct',
  async ({ productId, filter }, { rejectWithValue }) => {
    try {
      await productApi.deleteProduct({ productId, token: cookies.get('token') });
      const products = (await productApi.getAllProducts({ ...filter, token: cookies.get('token') }))
        .data;

      return products;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateStock = createAsyncThunk(
  'product/fetchUpdateStock',
  async (product, { rejectWithValue }) => {
    try {
      const response = await productApi.updateStock({ product, token: cookies.get('token') });
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
    clearMsg(state, action) {
      if (
        [
          `fetchCreateProductMsg`,
          `fetchUpdateProductMsg`,
          `fetchUpdateStatusProductMsg`,
          `fetchUpdateStockMsg`,
          `fetchDeleteProductMsg`
        ].includes(action.payload)
      ) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle get all products
      .addCase(fetchGetAllProducts.rejected, (state, action) => {
        state.fetchGetAllProductsMsg = action.payload || action.error.message;
        state.isFetchingGetAllProducts = false;
        state.productsCount = 0;
        state.products = [];
      })
      .addCase(fetchGetAllProducts.pending, (state) => {
        state.fetchGetAllProductsMsg = null;
        state.isFetchingGetAllProducts = true;
        state.productsCount = 0;
        state.products = [];
      })
      .addCase(fetchGetAllProducts.fulfilled, (state, action) => {
        state.fetchGetAllProductsMsg = null;
        state.isFetchingGetAllProducts = false;
        state.productsCount = action.payload.total;
        state.products = action.payload.results;
      })

      // Handle get product by id
      .addCase(fetchGetProductById.pending, (state) => {
        state.isFetchingGetProductById = true;
      })
      .addCase(fetchGetProductById.fulfilled, (state, action) => {
        state.isFetchingGetProductById = false;
        state.currentProduct = action.payload;
      })

      // Handle create product
      .addCase(fetchCreateProduct.rejected, (state, action) => {
        state.fetchCreateProductMsg = action.payload || action.error.message;
        state.isFetchingCreateProduct = false;
      })
      .addCase(fetchCreateProduct.pending, (state) => {
        state.fetchCreateProductMsg = null;
        state.isFetchingCreateProduct = true;
      })
      .addCase(fetchCreateProduct.fulfilled, (state, action) => {
        state.fetchCreateProductMsg = MESSAGES.CREATE_SUCCESS;
        state.isFetchingCreateProduct = false;
        state.currentProduct = action.payload.currentProduct;
        state.products = action.payload.products.results;
        state.productsCount = action.payload.products.total;
      })

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
        state.fetchCreateProductImageMsg = MESSAGES.CREATE_SUCCESS;
        state.isFetchingCreateProductImage = false;
      })

      // Handle update product
      .addCase(fetchUpdateProduct.rejected, (state, action) => {
        state.fetchUpdateProductMsg = action.payload || action.error.message;
        state.isFetchingUpdateProduct = false;
      })
      .addCase(fetchUpdateProduct.pending, (state) => {
        state.fetchUpdateProductMsg = null;
        state.isFetchingUpdateProduct = true;
      })
      .addCase(fetchUpdateProduct.fulfilled, (state, action) => {
        state.fetchUpdateProductMsg = MESSAGES.UPDATE_SUCCESS;
        state.isFetchingUpdateProduct = false;
        state.currentProduct = action.payload.currentProduct;
        state.products = action.payload.products.results;
        state.productsCount = action.payload.products.total;
      })

      // Handle update status product
      .addCase(fetchUpdateStatusProduct.rejected, (state, action) => {
        state.fetchUpdateStatusProductMsg = action.payload || action.error.message;
        state.isFetchingUpdateStatusProduct = false;
      })
      .addCase(fetchUpdateStatusProduct.pending, (state) => {
        state.fetchUpdateStatusProductMsg = null;
        state.isFetchingUpdateStatusProduct = true;
      })
      .addCase(fetchUpdateStatusProduct.fulfilled, (state, action) => {
        state.fetchUpdateStatusProductMsg = MESSAGES.UPDATE_SUCCESS;
        state.isFetchingUpdateStatusProduct = false;
        state.currentProduct = action.payload;
        state.products = state.products.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, ...action.payload };
          } else {
            return product;
          }
        });
      })

      // Handle update status product
      .addCase(fetchUpdateStock.rejected, (state, action) => {
        state.fetchUpdateStockMsg = action.payload || action.error.message;
        state.isFetchingUpdateStock = false;
      })
      .addCase(fetchUpdateStock.pending, (state) => {
        state.fetchUpdateStockMsg = null;
        state.isFetchingUpdateStock = true;
      })
      .addCase(fetchUpdateStock.fulfilled, (state, action) => {
        state.fetchUpdateStockMsg = MESSAGES.UPDATE_SUCCESS;
        state.isFetchingUpdateStock = false;
        state.currentProduct = action.payload;
        state.products = state.products.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, ...action.payload };
          } else {
            return product;
          }
        });
      })

      // Handle delete product
      .addCase(fetchDeleteProduct.rejected, (state, action) => {
        state.fetchDeleteProductMsg = action.payload || action.error.message;
        state.isFetchingDeleteProduct = false;
      })
      .addCase(fetchDeleteProduct.pending, (state) => {
        state.fetchDeleteProductMsg = null;
        state.isFetchingDeleteProduct = true;
      })
      .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
        state.fetchDeleteProductMsg = MESSAGES.DELETE_SUCCESS;
        state.isFetchingDeleteProduct = false;
        state.products = action.payload.results;
        state.productsCount = action.payload.total;
      });
  }
});

export const { clearMsg } = productSlice.actions;

export const selectProductsCount = (state) => state.productSlice.productsCount;
export const selectProducts = (state) => state.productSlice.products;
export const selectCurrentProduct = (state) => state.productSlice.currentProduct;

export default productSlice.reducer;
