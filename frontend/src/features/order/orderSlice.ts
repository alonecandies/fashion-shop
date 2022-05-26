import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@src/configs/redux/store';
import { getToken } from '@src/utils/tokenUtil';
import { IClearMsg, IGetAllParams, IOrder, IOrderBody, CartItem } from './order.types';
import orderApi from './orderApi';
import { LOCAL_STORAGE_KEY_CART } from '@src/configs/constants';

export interface IOrderState {
  orders: Array<IOrder>;
  orderCount: number;
  currentOrder: IOrder | null;
  localStorageCart: Array<CartItem> | null;
  totalLocalCart: number;

  isFetchingGetAllOrders: boolean;

  isFetchingGetOrderDetail: boolean;

  isFetchingCreateOrder: boolean;
  fetchCreateOrderMsg: any;
}

const initialState: IOrderState = {
  orders: [],
  orderCount: 0,
  currentOrder: null,
  localStorageCart: null,
  totalLocalCart: 0,

  isFetchingGetAllOrders: false,

  isFetchingGetOrderDetail: false,

  isFetchingCreateOrder: false,
  fetchCreateOrderMsg: null
};

export const fetchGetAllOrders = createAsyncThunk(
  'order/fetchGetAllOrders',
  async (payload: IGetAllParams, { rejectWithValue }) => {
    try {
      const response = await orderApi.getAll(payload, getToken());
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchGetOrderDetail = createAsyncThunk(
  'order/fetchGetOrderDetail',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await orderApi.getDetail(id, getToken());

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchCreateOrder = createAsyncThunk(
  'order/fetchCreateOrder',
  async (data: IOrderBody, { rejectWithValue }) => {
    try {
      const response = await orderApi.createOrder(data, getToken());

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearMsg(state: any, action: PayloadAction<IClearMsg>) {
      if ([`fetchCreateOrderMsg`].includes(action.payload)) {
        state[action.payload] = null;
      }
    },
    loadCart(state: any) {
      let currentLocalCart = [];
      if (!!localStorage.getItem(LOCAL_STORAGE_KEY_CART)) {
        currentLocalCart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CART) || '');
      }
      state.localStorageCart = currentLocalCart;
      state.totalLocalCart = state.localStorageCart.reduce((total: number, current: CartItem) => {
        return total + current.quantity;
      }, 0);
    },
    addItemToCart(state: any, action: PayloadAction<CartItem>) {
      let currentLocalCart = [];
      if (!!localStorage.getItem(LOCAL_STORAGE_KEY_CART)) {
        currentLocalCart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CART) || '');
      }
      const newItem = action.payload;
      const index = currentLocalCart.findIndex(
        (item: CartItem) =>
          newItem.product_id === item.product_id &&
          newItem.size === item.size &&
          newItem.color === item.color
      );
      index >= 0 ? currentLocalCart[index].quantity++ : currentLocalCart.push(newItem);
      state.localStorageCart = currentLocalCart;
      localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(currentLocalCart));
      state.totalLocalCart = state.localStorageCart.reduce((total: number, current: CartItem) => {
        return total + current.quantity;
      }, 0);
    },
    getCartFromLocalStorage(state: any) {
      state.localStorageCart = localStorage.getItem(LOCAL_STORAGE_KEY_CART)
        ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CART) || '')
        : [];
    },
    increase(state: any, action: PayloadAction<number>) {
      state.localStorageCart[action.payload].quantity += 1;
      localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(state.localStorageCart));
      state.totalLocalCart += 1;
    },
    decrease(state: any, action: PayloadAction<number>) {
      state.localStorageCart[action.payload].quantity > 1
        ? (state.localStorageCart[action.payload].quantity -= 1)
        : null;
      localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(state.localStorageCart));
      state.totalLocalCart -= 1;
    },
    setQuantity(state: any, action: PayloadAction<{index: number, value: number}>) {
      action.payload.value >= 1
        ? (state.localStorageCart[action.payload.index].quantity = action.payload.value)
        : null;
      localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(state.localStorageCart));
      state.totalLocalCart = state.localStorageCart.reduce((total: number, current: CartItem) => {
        return total + current.quantity;
      }, 0);
    },
    removeOrderItem(state: any, action: PayloadAction<number>) {
      state.localStorageCart.splice(action.payload, 1);
      localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(state.localStorageCart));
      state.totalLocalCart = state.localStorageCart.reduce((total: number, current: CartItem) => {
        return total + current.quantity;
      }, 0);
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle fetch get all orders
      .addCase(fetchGetAllOrders.pending, (state) => {
        state.isFetchingGetAllOrders = true;
      })
      .addCase(fetchGetAllOrders.fulfilled, (state, action) => {
        state.isFetchingGetAllOrders = false;
        state.orders = action.payload.results;
        state.orderCount = action.payload.total;
      })

      // Handle fetch get order detail
      .addCase(fetchGetOrderDetail.pending, (state) => {
        state.isFetchingGetOrderDetail = true;
      })
      .addCase(fetchGetOrderDetail.fulfilled, (state, action) => {
        state.isFetchingGetOrderDetail = false;
        state.currentOrder = action.payload;
      })

      // Handle fetch create order
      .addCase(fetchCreateOrder.rejected, (state, action) => {
        state.isFetchingCreateOrder = false;
        state.fetchCreateOrderMsg = action.payload || action.error.message;
      })
      .addCase(fetchCreateOrder.pending, (state) => {
        state.isFetchingCreateOrder = true;
      })
      .addCase(fetchCreateOrder.fulfilled, (state, action) => {
        state.fetchCreateOrderMsg = null;
        state.isFetchingCreateOrder = false;

        // clear cart
        state.totalLocalCart = 0;
        state.localStorageCart = [];
        localStorage.removeItem('cart');
      });
  }
});

export const {
  clearMsg,
  addItemToCart,
  getCartFromLocalStorage,
  increase,
  decrease,
  setQuantity,
  removeOrderItem,
  loadCart
} = orderSlice.actions;

export const selectOrders = (state: RootState) => state.order.orders;
export const selectCurrentOrder = (state: RootState) => state.order.currentOrder;
export const selectLocalCart = (state: RootState) => state.order.localStorageCart;

export default orderSlice.reducer;
