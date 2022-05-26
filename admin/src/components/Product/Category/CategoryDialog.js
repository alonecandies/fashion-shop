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
  fetchGetCategoryById,
  fetchCreateCategory,
  fetchUpdateCategory,
  selectCurrentCategory,
  clearMsg
} from 'src/features/product/category/categorySlice';
import { CRUD_ACTIONS, MESSAGES } from 'src/configs/constants';
import { Formik } from 'formik';
import * as Yup from 'yup';
import displayToast from 'src/utils/quickDisplayToast';

export default function CategoryDialog({ needOpen, handleClose, action, category }) {
  const dispatch = useDispatch();

  // global state
  const currentCategory = useSelector(selectCurrentCategory);
  const fetchCreateCategoryMsg = useSelector((state) => state.categorySlice.fetchCreateCategoryMsg);
  const fetchUpdateCategoryMsg = useSelector((state) => state.categorySlice.fetchUpdateCategoryMsg);
  const isFetchingCreateCategory = useSelector(
    (state) => state.categorySlice.isFetchingCreateCategory
  );
  const isFetchingUpdateCategory = useSelector(
    (state) => state.categorySlice.isFetchingUpdateCategory
  );

  // local state
  const [msg, setMsg] = useState('');
  const successMsg =
    action === CRUD_ACTIONS.create ? MESSAGES.CREATE_SUCCESS : MESSAGES.UPDATE_SUCCESS;
  const msgName =
    action === CRUD_ACTIONS.create ? `fetchCreateCategoryMsg` : `fetchUpdateCategoryMsg`;

  const submitFormButton = useRef(null);

  const handleFormSubmit = (data, formik) => {
    if (action === CRUD_ACTIONS.create) {
      dispatch(fetchCreateCategory({ ...data }));
    } else if (action === CRUD_ACTIONS.update) {
      dispatch(fetchUpdateCategory({ ...data, categoryId: category?.id, level: category?.level }));
    }
  };

  useEffect(() => {
    setMsg(action === CRUD_ACTIONS.create ? fetchCreateCategoryMsg : fetchUpdateCategoryMsg);
  }, [action, fetchCreateCategoryMsg, fetchUpdateCategoryMsg]);

  useEffect(() => {
    if (action === CRUD_ACTIONS.update) {
      dispatch(fetchGetCategoryById({ categoryId: category?.id, level: category?.level }));
    }
  }, [action, category, dispatch]);

  // Display toast on save
  useEffect(() => {
    ((!isFetchingCreateCategory && !!fetchCreateCategoryMsg) ||
      (!isFetchingUpdateCategory && !!fetchUpdateCategoryMsg)) &&
      displayToast(
        msg,
        successMsg,
        () => handleClose(),
        () => dispatch(clearMsg(msgName))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    fetchCreateCategoryMsg,
    fetchUpdateCategoryMsg,
    isFetchingCreateCategory,
    isFetchingUpdateCategory,
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
    <Dialog open={needOpen}>
      <DialogTitle id="alert-dialog-title">
        {action === CRUD_ACTIONS.create ? `Tạo danh mục` : `Sửa danh mục`}
      </DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        {action === CRUD_ACTIONS.create ? (
          <CustomFormik initialValues={{ name: '', ...category }} />
        ) : (
          !!currentCategory && (
            <CustomFormik
              initialValues={{ id: category.id, ...category, name: currentCategory?.name }}
            />
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
