import { useRef, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Grid,
  Button
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCreateBlogCategory,
  fetchUpdateBlogCategory,
  clearMsg
} from 'src/features/blog/category/blogCategorySlice';
import { CRUD_ACTIONS, MESSAGES } from 'src/configs/constants';
import { Formik } from 'formik';
import * as Yup from 'yup';
import displayToast from 'src/utils/quickDisplayToast';

export default function BlogCategoryDialog({ needOpen, handleClose, action, blogCategory }) {
  const dispatch = useDispatch();

  // global state
  const fetchCreateBlogCategoryMsg = useSelector(
    (state) => state.blogCategorySlice.fetchCreateBlogCategoryMsg
  );
  const fetchUpdateBlogCategoryMsg = useSelector(
    (state) => state.blogCategorySlice.fetchUpdateBlogCategoryMsg
  );
  const isFetchingCreateBlogCategory = useSelector(
    (state) => state.blogCategorySlice.isFetchingCreateBlogCategory
  );
  const isFetchingUpdateBlogCategory = useSelector(
    (state) => state.blogCategorySlice.isFetchingUpdateBlogCategory
  );

  // local state
  const [msg, setMsg] = useState('');
  const successMsg =
    action === CRUD_ACTIONS.create ? MESSAGES.CREATE_SUCCESS : MESSAGES.UPDATE_SUCCESS;
  const msgName =
    action === CRUD_ACTIONS.create ? `fetchCreateBlogCategoryMsg` : `fetchUpdateBlogCategoryMsg`;

  const submitFormButton = useRef(null);

  const handleFormSubmit = (data, formik) => {
    if (action === CRUD_ACTIONS.create) {
      dispatch(fetchCreateBlogCategory({ ...data }));
    } else if (action === CRUD_ACTIONS.update) {
      dispatch(fetchUpdateBlogCategory({ ...data, id: blogCategory?.id }));
    }
  };

  useEffect(() => {
    setMsg(
      action === CRUD_ACTIONS.create ? fetchCreateBlogCategoryMsg : fetchUpdateBlogCategoryMsg
    );
  }, [action, fetchCreateBlogCategoryMsg, fetchUpdateBlogCategoryMsg]);

  // Display toast on save
  useEffect(() => {
    ((!isFetchingCreateBlogCategory && !!fetchCreateBlogCategoryMsg) ||
      (!isFetchingUpdateBlogCategory && !!fetchUpdateBlogCategoryMsg)) &&
      displayToast(
        msg,
        successMsg,
        () => handleClose(),
        () => dispatch(clearMsg(msgName))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    fetchCreateBlogCategoryMsg,
    fetchUpdateBlogCategoryMsg,
    isFetchingCreateBlogCategory,
    isFetchingUpdateBlogCategory,
    msg,
    msgName,
    successMsg
  ]);

  const CustomFormik = ({ initialValues }) => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string().nullable().max(255).required('Tên danh mục không được để trống')
        })}
        onSubmit={handleFormSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Tên"
                  name="name"
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.name}
                  variant="outlined"
                />
              </Grid>

              <Button
                sx={{ display: { xl: 'none', xs: 'none' } }}
                type="submit"
                ref={submitFormButton}
              />
            </Grid>
          </form>
        )}
      </Formik>
    );
  };

  return (
    <Dialog
      open={needOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {action === CRUD_ACTIONS.create ? `Tạo tag` : `Sửa tag`}
      </DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        {action === CRUD_ACTIONS.create ? (
          <CustomFormik initialValues={{ name: '' }} />
        ) : (
          !!blogCategory && (
            <CustomFormik initialValues={{ id: blogCategory?.id, name: blogCategory?.name }} />
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button
          variant="contained"
          onClick={() => {
            submitFormButton.current.click();
            handleClose();
          }}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
