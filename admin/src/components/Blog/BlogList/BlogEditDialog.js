import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slide,
  Grid,
  TextField,
  Button,
  CardMedia,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Input
} from '@material-ui/core';
import Editor from 'src/components/Editor';
import {
  Close as CloseIcon,
  InsertPhoto as InsertPhotoIcon,
  AddAPhoto as UploadIcon
} from '@material-ui/icons';
import { CRUD_ACTIONS, MESSAGES } from 'src/configs/constants';
import { Formik } from 'formik';
import imageApi from 'src/features/image/imageApi';
import cookies from 'js-cookie';
import * as Yup from 'yup';
import displayToast from 'src/utils/quickDisplayToast';
import {
  fetchCreateBlog,
  fetchUpdateBlog,
  fetchGetBlogById,
  selectCurrentBlog,
  clearMsg
} from 'src/features/blog/blogSlice';
import {
  fetchGetAllBlogCategories,
  selectBlogCategoriesData
} from 'src/features/blog/category/blogCategorySlice';
import { useDispatch, useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlogEditDialog = ({ open, handleCloseDialog, action, blogId }) => {
  const dispatch = useDispatch();
  const currentBlog = useSelector(selectCurrentBlog);
  const blogCategories = useSelector(selectBlogCategoriesData);

  const fetchCreateBlogMsg = useSelector((state) => state.blogSlice.fetchCreateBlogMsg);
  const fetchUpdateBlogMsg = useSelector((state) => state.blogSlice.fetchUpdateBlogMsg);
  const isFetchingCreateBlog = useSelector((state) => state.blogSlice.isFetchingCreateBlog);
  const isFetchingUpdateBlog = useSelector((state) => state.blogSlice.isFetchingUpdateBlog);
  const [initialValues] = useState({
    title: '',
    content: '',
    image: null,
    blog_category_id: 0
  });

  //get blog
  useEffect(() => {
    if (action === CRUD_ACTIONS.update) {
      dispatch(fetchGetBlogById({ id: blogId }));
    }
  }, [action, blogId, dispatch]);
  useEffect(() => {
    dispatch(fetchGetAllBlogCategories({}));
  }, [dispatch]);

  //Toast
  // local state
  const [msg, setMsg] = useState('');
  const successMsg =
    action === CRUD_ACTIONS.create ? MESSAGES.CREATE_SUCCESS : MESSAGES.UPDATE_SUCCESS;
  const msgName = action === CRUD_ACTIONS.create ? `fetchCreateBlogMsg` : `fetchUpdateBlogMsg`;

  useEffect(() => {
    setMsg(action === CRUD_ACTIONS.create ? fetchCreateBlogMsg : fetchUpdateBlogMsg);
  }, [action, fetchCreateBlogMsg, fetchUpdateBlogMsg]);

  useEffect(() => {
    ((!isFetchingCreateBlog && !!fetchCreateBlogMsg) ||
      (!isFetchingUpdateBlog && !!fetchUpdateBlogMsg)) &&
      displayToast(
        msg,
        successMsg,
        () => handleCloseDialog(),
        () => dispatch(clearMsg(msgName))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    fetchCreateBlogMsg,
    fetchUpdateBlogMsg,
    handleCloseDialog,
    isFetchingCreateBlog,
    isFetchingUpdateBlog,
    msg,
    msgName,
    successMsg
  ]);

  //Formik
  const BlogFormik = ({ initialValues }) => {
    const [imageUrl, setImageUrl] = useState(initialValues.image);
    const handleImageChange = (e) => {
      e.preventDefault();
      imageApi
        .uploadImage({ file: e.target.files[0], token: cookies.get('token') })
        .then((result) => {
          setImageUrl(result.data?.url);
        });
    };

    const handleFormSubmit = (data, formik) => {
      if (action === CRUD_ACTIONS.create) {
        dispatch(fetchCreateBlog({ ...data, image: imageUrl }));
      } else if (action === CRUD_ACTIONS.update) {
        dispatch(fetchUpdateBlog({ ...data, image: imageUrl, id: blogId }));
      }
    };
    return (
      <Formik
        initialValues={{ ...initialValues, image: imageUrl }}
        validationSchema={Yup.object().shape({
          title: Yup.string().max(255, `Tên quá dài`).required(`Tên blog không được bỏ trống`),
          content: Yup.string(),
          blog_category_id: Yup.number()
            .min(1, `Phải chọn danh mục`)
            .integer(`Danh mục không hợp lệ`)
            .required(`Danh mục không được bỏ trống`)
        })}
        onSubmit={handleFormSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Tên Blog"
                  name="title"
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.title}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl
                  error={Boolean(touched.blog_category_id && errors.blog_category_id)}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                >
                  <InputLabel>Danh mục blog</InputLabel>
                  <Select
                    value={values.blog_category_id}
                    name="blog_category_id"
                    label="Danh mục blog"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                  >
                    {!!blogCategories &&
                      blogCategories.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText>
                    {touched.blog_category_id && errors.blog_category_id}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">Nội dung Blog</Typography>
                <Editor
                  content={values.content}
                  handleChange={handleChange}
                  targetName={'content'}
                />
              </Grid>
              <Grid item xs={12} container justifyContent="flex-start" alignItems="center">
                <Typography variant="h4" marginRight="15px">
                  Ảnh nền Blog
                </Typography>
                <Button variant="contained" color="primary" component="label">
                  <Input
                    sx={{ display: 'none' }}
                    id="contained-button-file"
                    type="file"
                    onChange={handleImageChange}
                    draggable
                    accept="image/*"
                  />
                  <UploadIcon />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ width: '100%', justifyContent: 'center' }}>
                  {!!values.image || imageUrl ? (
                    <CardMedia
                      sx={{ width: '100%', height: '550px', objectFit: 'cover' }}
                      image={imageUrl}
                      title={values.title}
                    />
                  ) : (
                    <InsertPhotoIcon sx={{ width: '100%', height: '550px' }} />
                  )}
                </Card>
              </Grid>

              <Grid item container spacing={3} justifyContent="flex-end">
                <Grid item>
                  <Button onClick={handleCloseDialog}>Hủy</Button>
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained">
                    Lưu
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    );
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullScreen TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleCloseDialog} sx={{ mr: 3 }}>
            <CloseIcon />
          </IconButton>
          <Typography>{action === CRUD_ACTIONS.create ? `Thêm Blog` : `Sửa Blog`}</Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        {!!action && action === CRUD_ACTIONS.create ? (
          <BlogFormik initialValues={initialValues} />
        ) : (
          !!currentBlog && (
            <BlogFormik
              initialValues={{
                image: currentBlog.image,
                title: currentBlog.title,
                content: currentBlog.content,
                blog_category_id: currentBlog.blog_category_id
              }}
            />
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BlogEditDialog;
