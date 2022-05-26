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
  fetchGetProductSizeById,
  fetchCreateProductSize,
  fetchUpdateProductSize,
  selectCurrentProductSize,
  clearMsg
} from 'src/features/product/size/productSizeSlice';
import { CRUD_ACTIONS, MESSAGES } from 'src/configs/constants';
import { Formik } from 'formik';
import * as Yup from 'yup';
import displayToast from 'src/utils/quickDisplayToast';

export default function ProductSizeDialog({ needOpen, handleClose, action, productSize }) {
  const dispatch = useDispatch();

  // global state
  const currentProductSize = useSelector(selectCurrentProductSize);
  const fetchCreateProductSizeMsg = useSelector(
    (state) => state.productSizeSlice.fetchCreateProductSizeMsg
  );
  const fetchUpdateProductSizeMsg = useSelector(
    (state) => state.productSizeSlice.fetchUpdateProductSizeMsg
  );
  const isFetchingCreateProductSize = useSelector(
    (state) => state.productSizeSlice.isFetchingCreateProductSize
  );
  const isFetchingUpdateProductSize = useSelector(
    (state) => state.productSizeSlice.isFetchingUpdateProductSize
  );

  // local state
  const [msg, setMsg] = useState('');
  const successMsg =
    action === CRUD_ACTIONS.create ? MESSAGES.CREATE_SUCCESS : MESSAGES.UPDATE_SUCCESS;
  const msgName =
    action === CRUD_ACTIONS.create ? `fetchCreateProductSizeMsg` : `fetchUpdateProductSizeMsg`;

  const submitFormButton = useRef(null);

  const handleFormSubmit = (data, formik) => {
    if (action === CRUD_ACTIONS.create) {
      dispatch(fetchCreateProductSize({ ...data }));
    } else if (action === CRUD_ACTIONS.update) {
      dispatch(fetchUpdateProductSize({ ...data, productSizeId: productSize?.id }));
    }
  };

  useEffect(() => {
    setMsg(action === CRUD_ACTIONS.create ? fetchCreateProductSizeMsg : fetchUpdateProductSizeMsg);
  }, [action, fetchCreateProductSizeMsg, fetchUpdateProductSizeMsg]);

  useEffect(() => {
    if (action === CRUD_ACTIONS.update) {
      dispatch(fetchGetProductSizeById(productSize?.id));
    }
  }, [action, productSize?.id, dispatch]);

  // Display toast on save
  useEffect(() => {
    ((!isFetchingCreateProductSize && !!fetchCreateProductSizeMsg) ||
      (!isFetchingUpdateProductSize && !!fetchUpdateProductSizeMsg)) &&
      displayToast(
        msg,
        successMsg,
        () => handleClose(),
        () => dispatch(clearMsg(msgName))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    fetchCreateProductSizeMsg,
    fetchUpdateProductSizeMsg,
    isFetchingCreateProductSize,
    isFetchingUpdateProductSize,
    msg,
    msgName,
    successMsg
  ]);

  const CustomFormik = ({ initialValues }) => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          type: Yup.string().nullable().max(255).required('Kích cỡ không được để trống')
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
                  label="Kích cỡ"
                  name="type"
                  error={Boolean(touched.type && errors.type)}
                  helperText={touched.type && errors.type}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.type}
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
          <CustomFormik initialValues={{ type: '' }} />
        ) : (
          !!currentProductSize && (
            <CustomFormik initialValues={{ id: productSize.id, type: currentProductSize?.type }} />
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
