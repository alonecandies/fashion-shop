import { configureStore } from '@reduxjs/toolkit';
import uiSlice from 'src/features/ui/uiSlice';
import authenSlice from 'src/features/authen/authenSlice';
import userSlice from 'src/features/user/userSlice';
import productSlice from 'src/features/product/product/productSlice';
import bannerSlice from 'src/features/banner/bannerSlice';
import categorySlice from 'src/features/product/category/categorySlice';
import productColorSlice from 'src/features/product/color/productColorSlice';
import productTagSlice from 'src/features/product/tag/producTagSlice';
import productSizeSlice from 'src/features/product/size/productSizeSlice';
import productImageSlice from 'src/features/product/image/productImageSlice';
import blogSlice from 'src/features/blog/blogSlice';
import blogCategorySlice from 'src/features/blog/category/blogCategorySlice';
import cartSlice from 'src/features/cart/cartSlice';
import contactSlice from 'src/features/contact/contactSlice';

export const store = configureStore({
  reducer: {
    uiSlice,
    authenSlice,
    userSlice,
    productSlice,
    bannerSlice,
    categorySlice,
    productColorSlice,
    productTagSlice,
    productSizeSlice,
    productImageSlice,
    blogSlice,
    blogCategorySlice,
    cartSlice,
    contactSlice
  }
});
