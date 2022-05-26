import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Grid,
  Container,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slide,
  Chip,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import Editor from 'src/components/Editor';
import { CategorySelect } from 'src/components/Product/List/CustomSelect';
import { StopRounded as SquareIcon, Close as CloseIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCreateProduct,
  fetchUpdateProduct,
  clearMsg as clearProductMsg
} from 'src/features/product/product/productSlice';
import CustomImageList from './CustomImageList';
import { CRUD_ACTIONS, MESSAGES } from 'src/configs/constants';
import { Formik } from 'formik';
import * as Yup from 'yup';
import displayToast from 'src/utils/quickDisplayToast';
import _ from 'lodash';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const findCategory = (categoryId, categories) => {
  return (
    categories.find((category) => category.level === 2 && category.id === categoryId) || {
      id: '',
      name: '',
      level: ''
    }
  );
};

const ProductEditDialog = ({
  needOpen,
  handleClose,
  action,
  product,
  filter,
  categories,
  tags,
  colors,
  sizes
}) => {
  const dispatch = useDispatch();

  // global state
  const fetchCreateProductMsg = useSelector((state) => state.productSlice.fetchCreateProductMsg);
  const fetchUpdateProductMsg = useSelector((state) => state.productSlice.fetchUpdateProductMsg);
  const isFetchingCreateProduct = useSelector(
    (state) => state.productSlice.isFetchingCreateProduct
  );
  const isFetchingUpdateProduct = useSelector(
    (state) => state.productSlice.isFetchingUpdateProduct
  );

  // local state
  const [msg, setMsg] = useState('');
  const successMsg =
    action === CRUD_ACTIONS.create ? MESSAGES.CREATE_SUCCESS : MESSAGES.UPDATE_SUCCESS;
  const msgName =
    action === CRUD_ACTIONS.create ? `fetchCreateProductMsg` : `fetchUpdateProductMsg`;

  const handleFormSubmit = (data, formik) => {
    if (action === CRUD_ACTIONS.create) {
      dispatch(fetchCreateProduct({ product: data, filter }));
    } else if (action === CRUD_ACTIONS.update) {
      dispatch(fetchUpdateProduct({ product: { ...data, id: product?.id }, filter }));
    }
  };

  useEffect(() => {
    setMsg(action === CRUD_ACTIONS.create ? fetchCreateProductMsg : fetchUpdateProductMsg);
  }, [action, fetchCreateProductMsg, fetchUpdateProductMsg]);

  // Display toast on save
  useEffect(() => {
    ((!isFetchingCreateProduct && !!fetchCreateProductMsg) ||
      (!isFetchingUpdateProduct && !!fetchUpdateProductMsg)) &&
      displayToast(
        msg,
        successMsg,
        () => handleClose(),
        () => dispatch(clearProductMsg(msgName))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    fetchCreateProductMsg,
    fetchUpdateProductMsg,
    isFetchingCreateProduct,
    isFetchingUpdateProduct,
    msg,
    msgName,
    successMsg
  ]);

  const CustomFormik = ({ initialValues }) => {
    const formatedInitialValues = _.omit(
      {
        ...initialValues,
        webPrice: initialValues.web_price,
        category: findCategory(initialValues.category_id, categories),
        tags: initialValues.tags.map((tag) => tag.id),
        colors: initialValues.colors.map((color) => color.id),
        sizes: initialValues.sizes.map((size) => size.id)
      },
      ['web_price', 'category_id']
    );

    return (
      <Formik
        initialValues={formatedInitialValues}
        validationSchema={Yup.object().shape({
          title: Yup.string().max(255, `Tên quá dài`).required(`Tên sản phẩm không được bỏ trống`),
          webPrice: Yup.number(`Giả tiền không hợp lệ`)
            .integer(`Giá tiền không hợp lệ`)
            .required(`Giá tiền không được bỏ trống`),
          sale: Yup.number(`Sale không hợp lệ`)
            .integer(`Sale không hợp lệ`)
            .required(`Sale không được bỏ trống`),
          description: Yup.string(),
          category: Yup.object()
            .shape(
              {
                id: Yup.number().integer(),
                name: Yup.string().required(),
                level: Yup.number().oneOf([0, 1, 2])
              },
              ['Danh mục không hợp lệ']
            )
            .required(`Danh mục không được bỏ trống`),
          tags: Yup.array().of(Yup.number().integer(), `Tag không hợp lệ`),
          colors: Yup.array().of(Yup.number().integer(), `Màu không hợp lệ`),
          sizes: Yup.array().of(Yup.number().integer(), `Kích thước không hợp lệ`)
        })}
        onSubmit={handleFormSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Tên sản phẩm"
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

              <Grid item xs={12}>
                <Editor
                  content={values.description}
                  handleChange={handleChange}
                  targetName={'description'}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Giá Web"
                  name="webPrice"
                  type="number"
                  error={Boolean(touched.webPrice && errors.webPrice)}
                  helperText={touched.webPrice && errors.webPrice}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.webPrice}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Sale"
                  name="sale"
                  type="number"
                  error={Boolean(touched.sale && errors.sale)}
                  helperText={touched.sale && errors.sale}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.sale}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <CategorySelect
                  key="form"
                  name="category"
                  margin="normal"
                  categories={categories}
                  value={values.category}
                  handleChange={(e) => setFieldValue('category', JSON.parse(e.target.value))}
                  onBlur={handleBlur}
                  error={Boolean(touched.category && errors.category)}
                  helperText={touched.category && errors.category}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="sizes-label">Kích cỡ</InputLabel>
                  <Select
                    labelId="sizes-label"
                    id="sizes-select"
                    multiple
                    name="sizes"
                    value={values.sizes}
                    onChange={handleChange}
                    input={<OutlinedInput label="Kích cỡ" />}
                    renderValue={(selected) =>
                      selected
                        .map((selectedItem) => sizes.find((size) => size.id === selectedItem))
                        .map((size) => size.type)
                        .join(', ')
                    }
                  >
                    {sizes.map((size, index) => (
                      <MenuItem key={index} value={size.id}>
                        <Checkbox checked={values.sizes.indexOf(size.id) > -1} />
                        <ListItemText primary={size.type} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="tags-label">Tag</InputLabel>
                  <Select
                    labelId="tags-label"
                    id="tags-select"
                    multiple
                    name="tags"
                    value={values.tags}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) =>
                      selected
                        .map((selectedItem) => tags.find((tag) => tag.id === selectedItem))
                        .map((tag, index) => (
                          <Chip key={index} sx={{ mr: 0.25 }} label={tag.name} />
                        ))
                    }
                  >
                    {tags.map((tag, index) => (
                      <MenuItem key={index} value={tag.id}>
                        <Checkbox checked={values.tags.indexOf(tag.id) > -1} />
                        <ListItemText primary={tag.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="colors-label">Màu sắc</InputLabel>
                  <Select
                    labelId="colors-label"
                    id="colors-select"
                    multiple
                    name="colors"
                    value={values.colors}
                    onChange={handleChange}
                    input={<OutlinedInput label="Màu sắc" />}
                    renderValue={(selected) =>
                      selected
                        .map((selectedItem) => colors.find((color) => color.id === selectedItem))
                        .map((color, index) => <SquareIcon key={index} sx={{ color: color }} />)
                    }
                  >
                    {colors.map((color, index) => (
                      <MenuItem key={index} value={color.id}>
                        <Checkbox checked={values.colors.indexOf(color.id) > -1} />
                        <ListItemText primary={color.color.toUpperCase()} />
                        <ListItemIcon>
                          <SquareIcon sx={{ color: color.color }} />
                        </ListItemIcon>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {action === CRUD_ACTIONS.update && (
                <Grid item xs={12}>
                  <CustomImageList productId={product.id} />
                </Grid>
              )}

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
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={isFetchingCreateProduct || isFetchingUpdateProduct}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog open={needOpen} fullScreen TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} sx={{ mr: 3 }}>
              <CloseIcon />
            </IconButton>
            <Typography>
              {action === CRUD_ACTIONS.create ? `Thêm sản phẩm` : `Sửa sản phẩm`}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Container>
            {action === CRUD_ACTIONS.create ? (
              <CustomFormik
                initialValues={{
                  title: '',
                  webPrice: 0,
                  sale: 0,
                  description: '',
                  category: {
                    id: '',
                    name: '',
                    level: ''
                  },
                  tags: [],
                  colors: [],
                  sizes: []
                }}
              />
            ) : (
              !!product && <CustomFormik initialValues={{ ...product }} />
            )}
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductEditDialog;
