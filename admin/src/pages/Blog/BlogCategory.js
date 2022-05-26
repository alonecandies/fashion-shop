import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid, Skeleton } from '@material-ui/core';
import {
  fetchGetAllBlogCategories,
  selectBlogCategoriesData
} from 'src/features/blog/category/blogCategorySlice';
import BlogCategoryToolbar from 'src/components/Blog/Category/BlogCategoryToolbar';
import BlogCategoryTable from 'src/components/Blog/Category/BlogCategoryTable';
import BlogCategoryDialog from 'src/components/Blog/Category/BlogCategoryDialog';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { CRUD_ACTIONS } from 'src/configs/constants';

const BlogCategory = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useCheckAuth({ navigate, currentPage: `/app/blogs/category` });

  // global state
  const blogCategories = useSelector(selectBlogCategoriesData);
  const isFetchingGetBlogCategories = useSelector(
    (state) => state.blogCategorySlice.isFetchingGetBlogCategories
  );

  // local state
  const [dialogData, setDialogData] = useState({
    open: false,
    action: CRUD_ACTIONS.create,
    currentBlogCategory: null
  });

  useEffect(() => {
    dispatch(fetchGetAllBlogCategories({}));
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Blog - Danh mục | Lasy Shop</title>
      </Helmet>

      <BlogCategoryDialog
        needOpen={dialogData.open}
        action={dialogData.action}
        handleClose={() => setDialogData({ ...dialogData, open: false })}
        blogCategory={dialogData.currentBlogCategory}
      />
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <BlogCategoryToolbar
            handleCreateButton={() => setDialogData({ open: true, action: CRUD_ACTIONS.create })}
          />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              <Grid item lg={12}>
                {isFetchingGetBlogCategories ? (
                  <Skeleton variant="rectangular" width="100%" height={600} />
                ) : (
                  <BlogCategoryTable
                    blogCategories={blogCategories}
                    openDialog={(blogCategory) =>
                      setDialogData({
                        open: true,
                        action: CRUD_ACTIONS.update,
                        currentBlogCategory: blogCategory
                      })
                    }
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BlogCategory;
