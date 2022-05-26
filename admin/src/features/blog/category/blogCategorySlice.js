import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import blogCategoryApi from './blogCategoryApi';
import { MESSAGES } from 'src/configs/constants';

const initialState = {
  blogCategoriesData: [],
  currentBlogCategory: null,

  //state for get all Blog categories
  isFetchingGetAllBlogCategories: false,
  fetchGetAllBlogCategoriesMsg: null,

  //state for create Blog Category
  isFetchingCreateBlogCategory: false,
  fetchCreateBlogCategoryMsg: null,

  //state for update Blog Category
  isFetchingUpdateBlogCategory: false,
  fetchUpdateBlogCategoryMsg: null,

  //state for delete Blog Category
  isFetchingDeleteBlogCategory: false,
  fetchDeleteBlogCategoryMsg: null
};

export const fetchGetAllBlogCategories = createAsyncThunk(
  'blogCategory/fetchGetAllBlogCategories',
  async (data, { rejectWithValue }) => {
    try {
      const response = await blogCategoryApi.getAllBlogCategories({ token: cookies.get('token') });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchCreateBlogCategory = createAsyncThunk(
  'blogCategory/fetchCreateBlogCategory',
  async ({ name }, { rejectWithValue }) => {
    try {
      const response = await blogCategoryApi.createBlogCategory({
        name,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateBlogCategory = createAsyncThunk(
  'blogCategory/fetchUpdateBlogCategory',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const response = await blogCategoryApi.updateBlogCategory({
        id,
        name,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchDeleteBlogCategory = createAsyncThunk(
  'blogCategory/fetchDeleteBlogCategory',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await blogCategoryApi.deleteBlogCategory({
        id,
        token: cookies.get('token')
      });
      return { id, data: response.data };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const blogCategorySlice = createSlice({
  name: 'blogCategory',
  initialState,
  reducers: {
    clearMsg(state, action) {
      if (
        [
          `fetchGetAllBlogCategoriesMsg`,
          `fetchCreateBlogCategoryMsg`,
          `fetchUpdateBlogCategoryMsg`,
          `fetchDeleteBlogCategoryMsg`
        ].includes(action.payload)
      ) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle fetch get all blog categories
      .addCase(fetchGetAllBlogCategories.rejected, (state, action) => {
        state.blogCategoriesData = [];
        state.isFetchingGetAllBlogCategories = false;
        state.fetchGetAllBlogCategoriesMsg = action.payload || action.error.message;
      })
      .addCase(fetchGetAllBlogCategories.pending, (state) => {
        state.isFetchingGetAllBlogCategories = true;
        state.blogCategoriesData = [];
        state.fetchGetAllBlogCategoriesMsg = null;
      })
      .addCase(fetchGetAllBlogCategories.fulfilled, (state, action) => {
        state.isFetchingGetAllBlogCategories = false;
        state.fetchGetAllBlogCategoriesMsg = null;
        state.blogCategoriesData = action.payload;
      })

      // Handle create blog category
      .addCase(fetchCreateBlogCategory.rejected, (state, action) => {
        state.fetchCreateCategoryMsg = action.payload || action.error.message;
        state.isFetchingCreateCategory = false;
      })
      .addCase(fetchCreateBlogCategory.pending, (state) => {
        state.fetchCreateCategoryMsg = null;
        state.isFetchingCreateCategory = true;
      })
      .addCase(fetchCreateBlogCategory.fulfilled, (state, action) => {
        state.fetchCreateCategoryMsg = MESSAGES.CREATE_SUCCESS;
        state.isFetchingCreateCategory = false;
        state.blogCategoriesData.push(action.payload);
        state.currentBlogCategory = action.payload;
      })

      //Handle fetch update a blog category
      .addCase(fetchUpdateBlogCategory.rejected, (state, action) => {
        state.isFetchingUpdateBlogCategory = false;
        state.fetchUpdateBlogCategoryMsg = action.payload || action.error.message;
      })
      .addCase(fetchUpdateBlogCategory.pending, (state, action) => {
        state.isFetchingUpdateBlogCategory = true;
        state.fetchUpdateBlogCategoryMsg = null;
      })
      .addCase(fetchUpdateBlogCategory.fulfilled, (state, action) => {
        state.isFetchingUpdateBlogCategory = false;
        state.fetchUpdateBlogCategoryMsg = MESSAGES.UPDATE_SUCCESS;
        state.currentBlogCategory = action.payload;
        state.blogCategoriesData = state.blogCategoriesData.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })

      //Handle fetch delete blog category
      .addCase(fetchDeleteBlogCategory.rejected, (state, action) => {
        state.isFetchingDeleteBlogCategory = false;
        state.fetchDeleteBlogCategoryMsg = action.payload || action.error.message;
      })
      .addCase(fetchDeleteBlogCategory.pending, (state, action) => {
        state.isFetchingDeleteBlogCategory = true;
        state.fetchDeleteBlogCategoryMsg = null;
      })
      .addCase(fetchDeleteBlogCategory.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.blogCategoriesData = state.blogCategoriesData.filter(
          (blogCategory) => blogCategory.id !== id
        );
        state.isFetchingDeleteBlogCategory = false;
        state.fetchDeleteBlogCategoryMsg = MESSAGES.DELETE_SUCCESS;
      });
  }
});

export const { clearMsg } = blogCategorySlice.actions;

export const selectBlogCategoriesData = (state) => state.blogCategorySlice.blogCategoriesData;
export const selectCurrentBlogCategory = (state) => state.blogCategorySlice.currentBlogCategory;

export default blogCategorySlice.reducer;
