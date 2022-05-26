import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Grid,
  Button,
  MenuItem,
  Slide,
  Input,
  DialogTitle,
  CardMedia,
  Card,
  CardActions,
  Box,
  Skeleton
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { AddAPhoto as UploadIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CRUD_ACTIONS, PRODUCT_IMAGE_TYPE, MESSAGES } from 'src/configs/constants';
import {
  fetchCreateProductImage,
  fetchUpdateProductImage,
  fetchGetProductImageById,
  selectCurrentProuctImage,
  clearMsg
} from 'src/features/product/image/productImageSlice';
import imageApi from 'src/features/image/imageApi';
import cookies from 'js-cookie';
import { Formik } from 'formik';
import * as Yup from 'yup';
import displayToast from 'src/utils/quickDisplayToast';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddImageDialog = ({ needOpen, handleClose, action, productId, productImageId }) => {
  const dispatch = useDispatch();

  // global state
  const isFetchingCreateProductImage = useSelector(
    (state) => state.productImageSlice.isFetchingCreateProductImage
  );
  const fetchCreateProductImageMsg = useSelector(
    (state) => state.productImageSlice.fetchCreateProductImageMsg
  );
  const isFetchingUpdateProductImage = useSelector(
    (state) => state.productImageSlice.isFetchingUpdateProductImage
  );
  const fetchUpdateProductImageMsg = useSelector(
    (state) => state.productImageSlice.fetchUpdateProductImageMsg
  );
  const currentProductImage = useSelector(selectCurrentProuctImage);
  const isFetchingGetProductImageById = useSelector(
    (state) => state.productImageSlice.isFetchingGetProductImageById
  );

  // local state
  const [uploadedImage, setUploadedImage] = useState('');

  const handleAddImage = async (e) => {
    const imgUrl = (
      await imageApi.uploadImage({ file: e.target.files[0], token: cookies.get('token') })
    ).data?.url;
    setUploadedImage(imgUrl);
  };

  const handleFormSubmit = (data, formik) => {
    if (action === CRUD_ACTIONS.create) {
      dispatch(fetchCreateProductImage({ productId, image: { ...data, url: uploadedImage } }));
    } else if (action === CRUD_ACTIONS.update) {
      dispatch(fetchUpdateProductImage({ ...currentProductImage, ...data, url: uploadedImage }));
    }
  };

  useEffect(() => {
    action === CRUD_ACTIONS.create && needOpen && setUploadedImage('');
  }, [action, needOpen]);

  useEffect(() => {
    action === CRUD_ACTIONS.update && dispatch(fetchGetProductImageById({ productImageId }));
  }, [action, dispatch, productImageId]);

  useEffect(() => {
    !isFetchingGetProductImageById && setUploadedImage(currentProductImage?.url);
  }, [currentProductImage?.url, isFetchingGetProductImageById]);

  useEffect(() => {
    !isFetchingCreateProductImage &&
      !!fetchCreateProductImageMsg &&
      displayToast(
        fetchCreateProductImageMsg,
        MESSAGES.ADD_SUCCESS,
        () => handleClose(),
        () => dispatch(clearMsg(`fetchCreateProductImageMsg`))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fetchCreateProductImageMsg, isFetchingCreateProductImage]);

  useEffect(() => {
    !isFetchingUpdateProductImage &&
      !!fetchUpdateProductImageMsg &&
      displayToast(
        fetchUpdateProductImageMsg,
        MESSAGES.UPDATE_SUCCESS,
        () => handleClose(),
        () => dispatch(clearMsg(`fetchUpdateProductImageMsg`))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fetchUpdateProductImageMsg, isFetchingUpdateProductImage]);

  const CustomFormik = ({ initialValues }) => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          title: Yup.string().max(255, `Tên quá dài`).required(`Tiêu đề không được bỏ trống`),
          type: Yup.number(`Loại ảnh không hợp lệ`)
            .integer(`Loại ảnh không hợp lệ`)
            .required(`Phải chọn loại ảnh`)
        })}
        onSubmit={handleFormSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Tiêu đề ảnh"
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

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  margin="normal"
                  label="Loại ảnh"
                  required
                  name="type"
                  error={Boolean(touched.type && errors.type)}
                  helperText={touched.type && errors.type}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.type}
                  variant="outlined"
                >
                  <MenuItem value="">
                    <em>Bỏ</em>
                  </MenuItem>
                  {Object.entries(PRODUCT_IMAGE_TYPE)
                    .map((item) => item[1])
                    .map((type, index) => (
                      <MenuItem key={index} value={type.key}>
                        {type.value}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" component="label">
                  <Input sx={{ display: 'none' }} type="file" onChange={handleAddImage} />
                  <UploadIcon />
                </Button>
              </Grid>

              {!!uploadedImage && (
                <Grid item xs={12}>
                  <Card>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <CardMedia
                        component="img"
                        sx={{ height: 400, width: 'auto' }}
                        image={uploadedImage}
                        title="Product Image"
                      />
                    </Box>
                    <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button onClick={() => setUploadedImage('')}>Xóa</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )}

              <Grid item container spacing={3} justifyContent="flex-end">
                <Grid item>
                  <Button onClick={handleClose}>Hủy</Button>
                </Grid>
                <Grid item>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isFetchingCreateProductImage}
                  >
                    Lưu
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    );
  };

  return (
    <Dialog open={needOpen} TransitionComponent={Transition}>
      <DialogTitle>{action === CRUD_ACTIONS.create ? `Thêm ảnh` : `Sửa ảnh`}</DialogTitle>
      <DialogContent>
        {action === CRUD_ACTIONS.create ? (
          <CustomFormik
            initialValues={{
              title: '',
              type: ''
            }}
          />
        ) : !isFetchingGetProductImageById && !!currentProductImage ? (
          <CustomFormik initialValues={currentProductImage} />
        ) : (
          <Skeleton variant="rectangular" height={800} width={500} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddImageDialog;
