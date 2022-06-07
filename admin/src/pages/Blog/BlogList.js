import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetAllBlogs, selectBlogsData, selectTotalBlog } from 'src/features/blog/blogSlice';
import { useNavigate } from 'react-router-dom';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { Box, Container, Skeleton } from '@material-ui/core';
import BlogListResults from 'src/components/Blog/BlogList/BlogListResults';
import BlogListToolbar from 'src/components/Blog/BlogList/BlogListToolbar';
import BlogEditDialog from 'src/components/Blog/BlogList/BlogEditDialog';
import BlogStatusEditDialog from 'src/components/Blog/BlogList/BlogStatusEditDialog';
import { CRUD_ACTIONS } from 'src/configs/constants';
import {
  fetchGetAllBlogCategories,
  selectBlogCategoriesData
} from 'src/features/blog/category/blogCategorySlice';

const BlogList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //check authorized
  useCheckAuth({ navigate, currentPage: `/app/blogs/list` });

  // redux state
  const blogs = useSelector(selectBlogsData);
  const total = useSelector(selectTotalBlog);
  const isFetchingGetAllBlogs = useSelector((state) => state.blogSlice.isFetchingGetAllBlogs);
  const blogCategories = useSelector(selectBlogCategoriesData);
  // pagination
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
    blogCategoryId: '',
    title: '',
    order: '',
    status: ''
  });

  //Edit blog dialog
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [idBlogEdit, setIdBlogEdit] = useState(null);

  const [dialogData, setDialogData] = useState({
    open: false,
    action: CRUD_ACTIONS.create,
    blogId: null
  });
  const handleOpenDialog = (blogId, action) => {
    setDialogData({
      action,
      open: true,
      blogId
    });
  };

  const handleCloseDialog = () => {
    setDialogData({
      ...dialogData,
      open: false
    });
  };

  const handleOpenStatusDialog = (blogId) => {
    setOpenStatusDialog(true);
    setIdBlogEdit(blogId);
  };

  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
  };

  // call api

  useEffect(() => {
    dispatch(fetchGetAllBlogs(pagination));
  }, [dispatch, pagination]);

  useEffect(() => {
    dispatch(fetchGetAllBlogCategories());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Blog | HPL Shop</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <BlogEditDialog
          open={dialogData.open}
          handleCloseDialog={handleCloseDialog}
          blogId={dialogData.blogId}
          action={dialogData.action}
        />
        <Container maxWidth={false}>
          <BlogListToolbar
            setPagination={setPagination}
            handleOpenDialog={handleOpenDialog}
            blogCategories={blogCategories}
          />
          <Box sx={{ pt: 3 }}>
            {isFetchingGetAllBlogs ? (
              <Skeleton variant="rectangular" width="100%" height={600} />
            ) : (
              <BlogListResults
                pagination={pagination}
                setPagination={setPagination}
                blogs={blogs}
                totalBlog={total}
                blogCategories={blogCategories}
                handleOpenDialog={handleOpenDialog}
                handleOpenStatusDialog={handleOpenStatusDialog}
              />
            )}
            <BlogStatusEditDialog
              isOpened={openStatusDialog}
              idBlog={idBlogEdit}
              handleClose={handleCloseStatusDialog}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BlogList;
