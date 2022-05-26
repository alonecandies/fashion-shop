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
import {
  Close as CloseIcon,
  InsertPhoto as InsertPhotoIcon,
  AddAPhoto as UploadIcon
} from '@material-ui/icons';
import { CRUD_ACTIONS, MESSAGES, BANNER_TYPE } from 'src/configs/constants';
import { Formik } from 'formik';
import imageApi from 'src/features/image/imageApi';
import cookies from 'js-cookie';
import * as Yup from 'yup';
import displayToast from 'src/utils/quickDisplayToast';
import {
  fetchCreateBanner,
  fetchUpdateBanner,
  fetchGetBannerById,
  selectCurrentBanner,
  clearMsg
} from 'src/features/banner/bannerSlice';
import { useDispatch, useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BannerEditDialog = ({ open, handleClose, action, bannerId }) => {
  const dispatch = useDispatch();
  const currentBanner = useSelector(selectCurrentBanner);
  const fetchCreateBannerMsg = useSelector((state) => state.bannerSlice.fetchCreateBannerMsg);
  const fetchUpdateBannerMsg = useSelector((state) => state.bannerSlice.fetchUpdateBannerMsg);
  const isFetchingCreateBanner = useSelector((state) => state.bannerSlice.isFetchingCreateBanner);
  const isFetchingUpdateBanner = useSelector((state) => state.bannerSlice.isFetchingUpdateBanner);
  const [initialValues] = useState({
    url: null,
    title: '',
    type: 0
  });

  //get banner
  useEffect(() => {
    if (action === CRUD_ACTIONS.update) {
      dispatch(fetchGetBannerById({ id: bannerId }));
    }
  }, [action, bannerId, dispatch]);

  // local state
  const [msg, setMsg] = useState('');
  const successMsg =
    action === CRUD_ACTIONS.create ? MESSAGES.CREATE_SUCCESS : MESSAGES.UPDATE_SUCCESS;
  const msgName = action === CRUD_ACTIONS.create ? `fetchCreateBannerMsg` : `fetchUpdateBannerMsg`;

  useEffect(() => {
    setMsg(action === CRUD_ACTIONS.create ? fetchCreateBannerMsg : fetchUpdateBannerMsg);
  }, [action, fetchCreateBannerMsg, fetchUpdateBannerMsg]);

  useEffect(() => {
    ((!isFetchingCreateBanner && !!fetchCreateBannerMsg) ||
      (!isFetchingUpdateBanner && !!fetchUpdateBannerMsg)) &&
      displayToast(
        msg,
        successMsg,
        () => handleClose(),
        () => dispatch(clearMsg(msgName))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    fetchCreateBannerMsg,
    fetchUpdateBannerMsg,
    isFetchingCreateBanner,
    isFetchingUpdateBanner,
    msg,
    msgName,
    successMsg
  ]);

  //Formik
  const BannerFormik = ({ initialValues }) => {
    const [imageUrl, setImageUrl] = useState(initialValues.url);
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
        dispatch(fetchCreateBanner({ ...data, url: imageUrl }));
      } else if (action === CRUD_ACTIONS.update) {
        dispatch(fetchUpdateBanner({ ...data, url: imageUrl, id: bannerId }));
      }
    };
    return (
      <Formik
        initialValues={{ ...initialValues, url: imageUrl }}
        validationSchema={Yup.object().shape({
          title: Yup.string().max(255, `Tên quá dài`).required(`Tên banner không được bỏ trống`),
          type: Yup.number().min(1, `Phải chọn loại banner`).required('Phải chọn loại banner')
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
                  label="Tên banner"
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
                  error={Boolean(touched.type && errors.type)}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                >
                  <InputLabel>Loại Banner</InputLabel>
                  <Select
                    value={values.type}
                    name="type"
                    label="Loại Banner"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                  >
                    {Object.keys(BANNER_TYPE).map((item, index) => {
                      return (
                        <MenuItem key={index} value={BANNER_TYPE[item].id}>
                          {BANNER_TYPE[item].value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>{touched.type && errors.type}</FormHelperText>
                </FormControl>
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
                  {!!values.url || imageUrl ? (
                    <CardMedia
                      sx={{ width: '100%', height: '500px', objectFit: 'cover' }}
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
                  <Button onClick={handleClose}>Hủy</Button>
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
    <Dialog open={open} onClose={handleClose} fullScreen TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} sx={{ mr: 3 }}>
            <CloseIcon />
          </IconButton>
          <Typography>{action === CRUD_ACTIONS.create ? `Thêm banner` : `Sửa banner`}</Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        {!!action && action === CRUD_ACTIONS.create ? (
          <BannerFormik initialValues={initialValues} />
        ) : (
          !!currentBanner && (
            <BannerFormik
              initialValues={{
                url: currentBanner.url,
                title: currentBanner.title,
                type: currentBanner.type
              }}
            />
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BannerEditDialog;
