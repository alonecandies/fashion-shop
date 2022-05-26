import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import categoryApi from './categoryApi';
import { MESSAGES } from 'src/configs/constants';

const initialState = {
  categories: [],
  deepestCategories: [],
  currentCategory: null,

  isFetchingGetCategories: false,
  fetchGetCategoriesMsg: null,

  isFetchingGetDeepestCategories: false,
  fetchGetDeepestCategoriesMsg: null,

  isFetchingCreateCategory: false,
  fetchCreateCategoryMsg: null,

  isFetchingUpdateCategory: false,
  fetchUpdateCategoryMsg: null,

  isFetchingDeleteCategory: false,
  fetchDeleteCategoryMsg: null
};

export const fetchGetCategories = createAsyncThunk(
  'category/fetchGetCategories',
  async (params, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getCategories({ ...params, token: cookies.get('token') });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchGetDeepestCategories = createAsyncThunk(
  'category/fetchGetDeepestCategories',
  async (params, { rejectWithValue }) => {
    try {
      const categories = (
        await categoryApi.getCategories({ ...params, token: cookies.get('token') })
      ).data;
      let result = [];
      categories.forEach((categoryLevel0) => {
        if (categoryLevel0?.category_level_1?.length > 0) {
          result = result.concat(
            ...categoryLevel0.category_level_1
              .map((categoryLevel1) => categoryLevel1.category_level_2)
              .filter((item) => item.length > 0)
          );
        }
      });

      return result;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchGetCategoryById = createAsyncThunk(
  'category/fetchGetCategoryById',
  async ({ categoryId, level }, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getCategoryById({
        categoryId,
        level,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchCreateCategory = createAsyncThunk(
  'category/fetchCreateCategory',
  async (category, { rejectWithValue }) => {
    try {
      await categoryApi.createCategory({
        ...category,
        token: cookies.get('token')
      });
      const categoriesResponse = await categoryApi.getCategories({ token: cookies.get('token') });
      return categoriesResponse.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateCategory = createAsyncThunk(
  'category/fetchUpdateCategory',
  async (category, { rejectWithValue }) => {
    try {
      await categoryApi.updateCategory({
        ...category,
        token: cookies.get('token')
      });
      const categoriesResponse = await categoryApi.getCategories({ token: cookies.get('token') });
      return categoriesResponse.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchDeleteCategory = createAsyncThunk(
  'category/fetchDeleteCategory',
  async (category, { rejectWithValue }) => {
    try {
      await categoryApi.deleteCategory({
        ...category,
        token: cookies.get('token')
      });
      const categoriesResponse = await categoryApi.getCategories({ token: cookies.get('token') });
      return categoriesResponse.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearMsg(state, action) {
      if (
        [`fetchCreateCategoryMsg`, `fetchUpdateCategoryMsg`, `fetchDeleteCategoryMsg`].includes(
          action.payload
        )
      ) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle get all categories
      .addCase(fetchGetCategories.rejected, (state, action) => {
        state.fetchGetCategoriesMsg = action.payload || action.error.message;
        state.isFetchingGetCategories = false;
        state.categories = [];
      })
      .addCase(fetchGetCategories.pending, (state) => {
        state.fetchGetCategoriesMsg = null;
        state.isFetchingGetCategories = true;
      })
      .addCase(fetchGetCategories.fulfilled, (state, action) => {
        state.fetchGetCategoriesMsg = null;
        state.isFetchingGetCategories = false;
        state.categories = action.payload;
      })

      // Handle get deepest categories
      .addCase(fetchGetDeepestCategories.rejected, (state, action) => {
        state.fetchGetDeepestCategoriesMsg = action.payload || action.error.message;
        state.isFetchingGetDeepestCategories = false;
        state.deepestCategories = [];
      })
      .addCase(fetchGetDeepestCategories.pending, (state) => {
        state.fetchGetDeepestCategoriesMsg = null;
        state.isFetchingGetDeepestCategories = true;
      })
      .addCase(fetchGetDeepestCategories.fulfilled, (state, action) => {
        state.fetchGetDeepestCategoriesMsg = null;
        state.isFetchingGetDeepestCategories = false;
        state.deepestCategories = action.payload;
      })

      // Handle get category by id
      .addCase(fetchGetCategoryById.fulfilled, (state, action) => {
        state.currentCategory = action.payload;
      })

      // Handle create category
      .addCase(fetchCreateCategory.rejected, (state, action) => {
        state.fetchCreateCategoryMsg = action.payload || action.error.message;
        state.isFetchingCreateCategory = false;
      })
      .addCase(fetchCreateCategory.pending, (state) => {
        state.fetchCreateCategoryMsg = null;
        state.isFetchingCreateCategory = true;
      })
      .addCase(fetchCreateCategory.fulfilled, (state, action) => {
        state.fetchCreateCategoryMsg = MESSAGES.CREATE_SUCCESS;
        state.isFetchingCreateCategory = false;
        state.categories = action.payload;
        state.currentCategory = action.payload;
      })

      // Handle update category
      .addCase(fetchUpdateCategory.rejected, (state, action) => {
        state.fetchUpdateCategoryMsg = action.payload || action.error.message;
        state.isFetchingUpdateCategory = false;
      })
      .addCase(fetchUpdateCategory.pending, (state) => {
        state.fetchUpdateCategoryMsg = null;
        state.isFetchingUpdateCategory = true;
      })
      .addCase(fetchUpdateCategory.fulfilled, (state, action) => {
        state.fetchUpdateCategoryMsg = MESSAGES.UPDATE_SUCCESS;
        state.isFetchingUpdateCategory = false;
        state.currentCategory = action.payload;
        state.categories = action.payload;
      })

      // Handle delete category
      .addCase(fetchDeleteCategory.rejected, (state, action) => {
        state.fetchDeleteCategoryMsg = action.payload || action.error.message;
        state.isFetchingDeleteCategory = false;
      })
      .addCase(fetchDeleteCategory.pending, (state) => {
        state.fetchDeleteCategoryMsg = null;
        state.isFetchingDeleteCategory = true;
      })
      .addCase(fetchDeleteCategory.fulfilled, (state, action) => {
        state.fetchDeleteCategoryMsg = MESSAGES.DELETE_SUCCESS;
        state.isFetchingDeleteCategory = false;
        state.categories = action.payload;
      });
  }
});

export const { clearMsg } = categorySlice.actions;

export const selectCategories = (state) => state.categorySlice.categories;
export const selectDeepestCategories = (state) => state.categorySlice.deepestCategories;
export const selectCurrentCategory = (state) => state.categorySlice.currentCategory;

export default categorySlice.reducer;
