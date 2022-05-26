import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { fetchUpdateUser, fetchGetUserById, selectUser } from 'src/features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, Button, TextField, Grid, IconButton } from '@material-ui/core';
import * as Yup from 'yup';
import moment from 'moment';
import { VIETNAMESE_PHONE_REG } from 'src/configs/constants';
import CloseIcon from '@material-ui/icons/Close';

export default function UserEditDialog({ isOpened, idUser, handleClose }) {
  const [open, setOpen] = useState(isOpened);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    setOpen(isOpened);
  }, [isOpened]);

  useEffect(() => {
    if (!!idUser) {
      dispatch(fetchGetUserById({ id: idUser }));
    }
  }, [dispatch, idUser]);

  const handleSubmit = (data) => {
    dispatch(fetchUpdateUser({ id: user.id, ...data }));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Grid container sx={{ alignItems: 'center', padding: 2 }}>
        <Grid item sm={11}>
          <DialogTitle sx={{ fontSize: 20, fontWeight: 700 }}>Thông tin người dùng</DialogTitle>
        </Grid>
        <Grid item sm={1}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>

        <Grid item sm={12}>
          {user && (
            <Formik
              initialValues={{
                full_name: user.full_name,
                email: user.email,
                phone: user.phone,
                created_at: moment(user.created_at).format('DD/MM/yyyy'),
                address: user.address
              }}
              validationSchema={Yup.object().shape({
                full_name: Yup.string()
                  .min(2, 'Tên quá ngắn')
                  .max(50, 'Tên quá dài')
                  .required('Tên không được bỏ trống'),
                phone: Yup.string()
                  .matches(VIETNAMESE_PHONE_REG, 'Số điện thoại phải đúng định dạng')
                  .required('SĐT không được bỏ trống'),
                address: Yup.string().max(100, 'Quá dài').required('Bạn cần điền địa chỉ')
              })}
              onSubmit={handleSubmit}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        label="Họ tên"
                        margin="normal"
                        name="full_name"
                        error={Boolean(touched.full_name && errors.full_name)}
                        helperText={touched.full_name && errors.full_name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.full_name}
                        variant="outlined"
                      ></TextField>
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.email}
                        variant="outlined"
                        inputProps={{ readOnly: true }}
                      ></TextField>
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        label="phone"
                        margin="normal"
                        name="phone"
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.phone}
                        variant="outlined"
                      ></TextField>
                    </Grid>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        label="Ngày tạo"
                        margin="normal"
                        name="created_at"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.created_at}
                        variant="outlined"
                        inputProps={{ readOnly: true }}
                      ></TextField>
                    </Grid>
                    <Grid item sm={12}>
                      <TextField
                        fullWidth
                        label="Địa chỉ"
                        margin="normal"
                        name="address"
                        error={Boolean(touched.address && errors.address)}
                        helperText={touched.address && errors.address}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.address}
                        variant="outlined"
                      ></TextField>
                    </Grid>
                    <Grid item sm={12}>
                      <Button
                        sx={{ width: '100%' }}
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Cập nhật
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          )}
        </Grid>
      </Grid>
    </Dialog>
  );
}
