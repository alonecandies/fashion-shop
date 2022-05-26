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
  fetchGetProductTagById,
  fetchCreateProductTag,
  fetchUpdateProductTag,
  selectCurrentProductTag,
  clearMsg
} from 'src/features/product/tag/producTagSlice';
import { CRUD_ACTIONS, MESSAGES } from 'src/configs/constants';
import { Formik } from 'formik';
import * as Yup from 'yup';
import displayToast from 'src/utils/quickDisplayToast';

export default function ProductTagDialog({ needOpen, handleClose, action, productTag }) {
  const dispatch = useDispatch();

  // global state
  const currentProductTag = useSelector(selectCurrentProductTag);
  const fetchCreateProductTagMsg = useSelector(
    (state) => state.productTagSlice.fetchCreateProductTagMsg
  );
  const fetchUpdateProductTagMsg = useSelector(
    (state) => state.productTagSlice.fetchUpdateProductTagMsg
  );
  const isFetchingCreateProductTag = useSelector(
    (state) => state.productTagSlice.isFetchingCreateProductTag
  );
  const isFetchingUpdateProductTag = useSelector(
    (state) => state.productTagSlice.isFetchingUpdateProductTag
  );

  // local state
  const [msg, setMsg] = useState('');
  const successMsg =
    action === CRUD_ACTIONS.create ? MESSAGES.CREATE_SUCCESS : MESSAGES.UPDATE_SUCCESS;
  const msgName =
    action === CRUD_ACTIONS.create ? `fetchCreateProductTagMsg` : `fetchUpdateProductTagMsg`;

  const submitFormButton = useRef(null);

  const handleFormSubmit = (data, formik) => {
    if (action === CRUD_ACTIONS.create) {
      dispatch(fetchCreateProductTag({ ...data }));
    } else if (action === CRUD_ACTIONS.update) {
      dispatch(fetchUpdateProductTag({ ...data, productTagId: productTag?.id }));
    }
  };

  useEffect(() => {
    setMsg(action === CRUD_ACTIONS.create ? fetchCreateProductTagMsg : fetchUpdateProductTagMsg);
  }, [action, fetchCreateProductTagMsg, fetchUpdateProductTagMsg]);

  useEffect(() => {
    if (action === CRUD_ACTIONS.update) {
      dispatch(fetchGetProductTagById(productTag?.id));
    }
  }, [action, productTag?.id, dispatch]);

  // Display toast on save
  useEffect(() => {
    ((!isFetchingCreateProductTag && !!fetchCreateProductTagMsg) ||
      (!isFetchingUpdateProductTag && !!fetchUpdateProductTagMsg)) &&
      displayToast(
        msg,
        successMsg,
        () => handleClose(),
        () => dispatch(clearMsg(msgName))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    fetchCreateProductTagMsg,
    fetchUpdateProductTagMsg,
    isFetchingCreateProductTag,
    isFetchingUpdateProductTag,
    msg,
    msgName,
    successMsg
  ]);

  const CustomFormik = ({ initialValues }) => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string().nullable().max(255).required('Tên tag không được để trống')
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
          !!currentProductTag && (
            <CustomFormik initialValues={{ id: productTag.id, name: currentProductTag?.name }} />
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
