import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authenReducer from '@src/features/authen/authenSlice';
import categoryReducer from '@src/features/product/category/categorySlice';
import contactReducer from '@src/features/contact/contactSlide';
import productReducer from '@src/features/product/productSlice';
import orderReducer from '@src/features/order/orderSlice';
import bannerReducer from '@src/features/banner/bannerSlice';

export const store = configureStore({
  reducer: {
    authen: authenReducer,
    contact: contactReducer,
    product: productReducer,
    category: categoryReducer,
    order: orderReducer,
    banner: bannerReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
