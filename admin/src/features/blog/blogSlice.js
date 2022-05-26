import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import blogApi from './blogApi';
import { MESSAGES } from 'src/configs/constants';

const initialState = {
  blogsData: [],
  currentBlog: null,
  totalBlog: 0,

  //state for get all Blog
  isFetchingGetAllBlogs: false,
  fetchGetAllBlogsMsg: null,

  //state for get Blog by id
  isFetchingGetBlogById: false,
  fetchGetBlogByIdMsg: null,

  //state for create blog
  isFetchingCreateBlog: false,
  fetchCreateBlogMsg: null,

  //state for update blog
  isFetchingUpdateBlog: false,
  fetchUpdateBlogMsg: null,

  //state for update blog status
  isFetchingUpdateBlogStatus: false,
  fetchUpdateBlogStatusMsg: null,

  //state for delete blog
  isFetchingDeleteBlog: false,
  fetchDeleteBlogMsg: null
};

export const fetchGetAllBlogs = createAsyncThunk(
  'blog/fetchGetAllBlogs',
  async ({ blogCategoryId, title, status, order, type, page, pageSize }, { rejectWithValue }) => {
    try {
      const response = await blogApi.getAllBlogs({
        blogCategoryId,
        title,
        status,
        order,
        type,
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

export const fetchGetBlogById = createAsyncThunk(
  'blog/fetchGetBlogById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await blogApi.getBlogById({
        id,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchCreateBlog = createAsyncThunk(
  'blog/fetchCreateBlog',
  async ({ title, content, blog_category_id }, { rejectWithValue }) => {
    try {
      const response = await blogApi.createBlog({
        title,
        content,
        blog_category_id,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateBlog = createAsyncThunk(
  'blog/fetchUpdateBlog',
  async (data, { rejectWithValue }) => {
    try {
      const response = await blogApi.updateBlog({
        data,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchUpdateBlogStatus = createAsyncThunk(
  'blog/fetchUpdateBlogStatus',
  async (data, { rejectWithValue }) => {
    try {
      const response = await blogApi.updateBlogStatus({
        data,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchDeleteBlog = createAsyncThunk(
  'blog/fetchDeleteBlog',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await blogApi.deleteBlog({
        id,
        token: cookies.get('token')
      });
      return { id, data: response.data };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearMsg(state, action) {
      if (
        [
          `fetchGetAllBlogsMsg`,
          `fetchGetBlogByIdMsg`,
          `fetchCreateBlogMsg`,
          `fetchUpdateBlogMsg`,
          `fetchUpdateBlogStatusMsg`,
          `fetchDeleteBlogMsg`
        ].includes(action.payload)
      ) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle fetch get all blogs
      .addCase(fetchGetAllBlogs.rejected, (state, action) => {
        state.blogsData = [];
        state.totalBlog = 0;
        state.isFetchingGetAllBlogs = false;
        state.fetchGetAllBlogsMsg = action.payload || action.error.message;
      })
      .addCase(fetchGetAllBlogs.pending, (state) => {
        state.isFetchingGetAllBlogs = true;
        state.blogsData = [];
        state.totalBlog = 0;
        state.fetchGetAllBlogsMsg = null;
      })
      .addCase(fetchGetAllBlogs.fulfilled, (state, action) => {
        state.isFetchingGetAllBlogs = false;
        state.fetchGetAllBlogsMsg = null;
        state.blogsData = action.payload.results;
        state.totalBlog = action.payload.total;
      })

      // Handle fetch get an blog by id
      .addCase(fetchGetBlogById.rejected, (state, action) => {
        state.isFetchingGetBlogById = false;
        state.fetchGetBlogByIdMsg = action.payload || action.error.message;
        state.currentBlog = null;
      })
      .addCase(fetchGetBlogById.pending, (state) => {
        state.isFetchingGetBlogById = true;
        state.fetchGetBlogByIdMsg = null;
        state.currentBlog = null;
      })
      .addCase(fetchGetBlogById.fulfilled, (state, action) => {
        state.isFetchingGetBlogById = false;
        state.fetchGetBlogByIdMsg = null;
        state.currentBlog = action.payload;
      })

      // Handle fetch update status of blog
      .addCase(fetchUpdateBlogStatus.rejected, (state, action) => {
        state.isFetchingUpdateBlogStatus = false;
        state.fetchUpdateBlogStatusMsg = action.payload || action.error.message;
      })
      .addCase(fetchUpdateBlogStatus.pending, (state) => {
        state.isFetchingUpdateBlogStatus = true;
        state.fetchUpdateBlogStatusMsg = null;
      })
      .addCase(fetchUpdateBlogStatus.fulfilled, (state, action) => {
        state.isFetchingUpdateBlogStatus = false;
        state.fetchUpdateBlogStatusMsg = MESSAGES.UPDATE_SUCCESS;
        state.currentBlog = action.payload;
        state.blogsData = state.blogsData.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })

      //Handle fetch update a blog
      .addCase(fetchUpdateBlog.rejected, (state, action) => {
        state.isFetchingUpdateBlog = false;
        state.fetchUpdateBlogMsg = action.payload || action.error.message;
      })
      .addCase(fetchUpdateBlog.pending, (state, action) => {
        state.isFetchingUpdateBlog = true;
        state.fetchUpdateBlogMsg = null;
      })
      .addCase(fetchUpdateBlog.fulfilled, (state, action) => {
        state.isFetchingUpdateBlog = false;
        state.fetchUpdateBlogMsg = MESSAGES.UPDATE_SUCCESS;
        state.currentBlog = action.payload;
        state.blogsData = state.blogsData.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })

      //Handle fetch create a blog
      .addCase(fetchCreateBlog.rejected, (state, action) => {
        state.isFetchingCreateBlog = false;
        state.fetchCreateBlogMsg = action.payload || action.error.message;
      })
      .addCase(fetchCreateBlog.pending, (state, action) => {
        state.isFetchingCreateBlog = true;
        state.fetchCreateBlogMsg = null;
      })
      .addCase(fetchCreateBlog.fulfilled, (state, action) => {
        state.isFetchingCreateBlog = false;
        state.fetchCreateBlogMsg = MESSAGES.CREATE_SUCCESS;
        state.currentBlog = action.payload;
        state.blogsData.unshift(action.payload);
      })

      //Handle fetch delete blog
      .addCase(fetchDeleteBlog.rejected, (state, action) => {
        state.isFetchingDeleteBlog = false;
        state.fetchDeleteBlogMsg = action.payload || action.error.message;
      })
      .addCase(fetchDeleteBlog.pending, (state, action) => {
        state.isFetchingDeleteBlog = true;
        state.fetchDeleteBlogMsg = null;
      })
      .addCase(fetchDeleteBlog.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.blogsData = state.blogsData.filter((blog) => blog.id !== id);
        state.isFetchingDeleteBlog = false;
        state.fetchDeleteBlogMsg = MESSAGES.DELETE_SUCCESS;
      });
  }
});

export const { clearMsg } = blogSlice.actions;

export const selectBlogsData = (state) => state.blogSlice.blogsData;
export const selectTotalBlog = (state) => state.blogSlice.totalBlog;
export const selectCurrentBlog = (state) => state.blogSlice.currentBlog;

export default blogSlice.reducer;
