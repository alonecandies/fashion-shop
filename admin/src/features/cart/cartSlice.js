import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import cartApi from './cartApi';
import { MESSAGES } from 'src/configs/constants';

const initialState = {
  cartsData: [],
  currentCart: null,
  totalCart: 0,

  //state for get all Cart
  isFetchingGetAllCarts: false,
  fetchGetAllCartsMsg: null,

  //state for get Cart by id
  isFetchingGetCartById: false,
  fetchGetCartByIdMsg: null,

  //state for update Cart status
  isFetchingUpdateCartStatus: false,
  fetchUpdateCartStatusMsg: null,

  //state for delete Cart
  isFetchingDeleteCart: false,
  fetchDeleteCartMsg: null
};

export const fetchGetAllCarts = createAsyncThunk(
  'cart/fetchGetAllCarts',
  async (
    { userId, phone, status, order, fromDate, toDate, page, pageSize },
    { rejectWithValue }
  ) => {
    try {
      const response = await cartApi.getAllCarts({
        userId,
        phone,
        status,
        order,
        fromDate,
        toDate,
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

export const fetchGetCartById = createAsyncThunk(
  'cart/fetchGetCartById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await cartApi.getCartById({
        id,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateCartStatus = createAsyncThunk(
  'cart/fetchUpdateCartStatus',
  async (data, { rejectWithValue }) => {
    try {
      const response = await cartApi.updateCartStatus({
        data,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchDeleteCart = createAsyncThunk(
  'cart/fetchDeleteCart',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await cartApi.deleteCart({
        id,
        token: cookies.get('token')
      });
      return { id, data: response.data };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearMsg(state, action) {
      if (
        [
          `fetchGetAllCartsMsg`,
          `fetchGetCartByIdMsg`,
          `fetchUpdateCartStatusMsg`,
          `fetchDeleteCartMsg`
        ].includes(action.payload)
      ) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle fetch get all Carts
      .addCase(fetchGetAllCarts.rejected, (state, action) => {
        state.cartsData = [];
        state.totalCart = 0;
        state.isFetchingGetAllCarts = false;
        state.fetchGetAllCartsMsg = action.payload || action.error.message;
      })
      .addCase(fetchGetAllCarts.pending, (state) => {
        state.isFetchingGetAllCarts = true;
        state.cartsData = [];
        state.totalCart = 0;
        state.fetchGetAllCartsMsg = null;
      })
      .addCase(fetchGetAllCarts.fulfilled, (state, action) => {
        state.isFetchingGetAllCarts = false;
        state.fetchGetAllCartsMsg = null;
        state.cartsData = action.payload.results;
        state.totalCart = action.payload.total;
      })

      // Handle fetch get an Cart by id
      .addCase(fetchGetCartById.rejected, (state, action) => {
        state.isFetchingGetCartById = false;
        state.fetchGetCartByIdMsg = action.payload || action.error.message;
        state.currentCart = null;
      })
      .addCase(fetchGetCartById.pending, (state) => {
        state.isFetchingGetCartById = true;
        state.fetchGetCartByIdMsg = null;
        state.currentCart = null;
      })
      .addCase(fetchGetCartById.fulfilled, (state, action) => {
        state.isFetchingGetCartById = false;
        state.fetchGetCartByIdMsg = null;
        state.currentCart = action.payload;
      })

      // Handle fetch update status of Cart
      .addCase(fetchUpdateCartStatus.rejected, (state, action) => {
        state.isFetchingUpdateCartStatus = false;
        state.fetchUpdateCartStatusMsg = action.payload || action.error.message;
      })
      .addCase(fetchUpdateCartStatus.pending, (state) => {
        state.isFetchingUpdateCartStatus = true;
        state.fetchUpdateCartStatusMsg = null;
      })
      .addCase(fetchUpdateCartStatus.fulfilled, (state, action) => {
        state.isFetchingUpdateCartStatus = false;
        state.fetchUpdateCartStatusMsg = MESSAGES.UPDATE_SUCCESS;
        state.currentCart = action.payload;
        state.cartsData = state.cartsData.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })

      //Handle fetch delete Cart
      .addCase(fetchDeleteCart.rejected, (state, action) => {
        state.isFetchingDeleteCart = false;
        state.fetchDeleteCartMsg = action.payload || action.error.message;
      })
      .addCase(fetchDeleteCart.pending, (state, action) => {
        state.isFetchingDeleteCart = true;
        state.fetchDeleteCartMsg = null;
      })
      .addCase(fetchDeleteCart.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.cartsData = state.cartsData.filter((cart) => cart.id !== id);
        state.isFetchingDeleteCart = false;
        state.fetchDeleteCartMsg = MESSAGES.DELETE_SUCCESS;
      });
  }
});

export const { clearMsg } = cartSlice.actions;

export const selectCartsData = (state) => state.cartSlice.cartsData;
export const selectTotalCart = (state) => state.cartSlice.totalCart;
export const selectCurrentCart = (state) => state.cartSlice.currentCart;

export default cartSlice.reducer;
