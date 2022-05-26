import { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangePassword, clearMsg } from 'src/features/authen/authenSlice';
import { Button, Card, CardContent, CardHeader, Divider, TextField, Grid } from '@material-ui/core';
import CustomDialog from 'src/components/CustomDialog';
import { MESSAGES } from 'src/configs/constants';
import displayToast from 'src/utils/quickDisplayToast';

const ChangePassword = () => {
  const dispatch = useDispatch();

  // global state
  const isPendingChangPassword = useSelector((state) => state.authenSlice.isFetchingChangePassword);
  const fetchChangePasswordMsg = useSelector((state) => state.authenSlice.fetchChangePasswordMsg);

  // local state
  const [openDialog_ls, setOpenDialog_ls] = useState(false);

  const submitFormButton = useRef(null);

  const handleFormSubmit = (data, formik) => {
    dispatch(fetchChangePassword({ ...data }));
    formik.setSubmitting(isPendingChangPassword);
  };

  useEffect(() => {
    !isPendingChangPassword &&
      !!fetchChangePasswordMsg &&
      displayToast(fetchChangePasswordMsg, MESSAGES.UPDATE_SUCCESS, null, () =>
        dispatch(clearMsg(`fetchChangePasswordMsg`))
      );
  }, [dispatch, isPendingChangPassword, fetchChangePasswordMsg]);

  return (
    <Card>
      <CardHeader subheader="Thay đổi mật khẩu" title="Bảo mật" />
      <Divider />
      <CardContent>
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: ''
          }}
          validationSchema={Yup.object().shape({
            oldPassword: Yup.string().max(255).required('Bạn chưa điền mật khẩu hiện tại'),
            newPassword: Yup.string()
              .min(6, 'Mật khẩu phải dài từ 6 ký tự trở lên')
              .max(255)
              .required('Bạn chưa điền mật khẩu mới')
          })}
          onSubmit={handleFormSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isValid, touched, values }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mật khẩu hiện tại"
                    name="oldPassword"
                    error={Boolean(touched.oldPassword && errors.oldPassword)}
                    helperText={touched.oldPassword && errors.oldPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="password"
                    value={values.oldPassword}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mật khẩu mới"
                    name="newPassword"
                    error={Boolean(touched.newPassword && errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="password"
                    value={values.newPassword}
                    variant="outlined"
                  />
                </Grid>
                <Button
                  sx={{ display: { xl: 'none', xs: 'none' } }}
                  type="submit"
                  ref={submitFormButton}
                />

                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    onClick={() => values.oldPassword && isValid && setOpenDialog_ls(true)}
                  >
                    Lưu
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </CardContent>
      <Divider />

      <CustomDialog
        needOpen={openDialog_ls}
        title={`Xác nhận đổi mật khẩu`}
        content={`Bạn có chắc muốn đổi mật khẩu?`}
        button1={{ title: `Hủy`, action: () => setOpenDialog_ls(false) }}
        button2={{
          title: `Có`,
          action: () => {
            submitFormButton.current.click();
            setOpenDialog_ls(false);
          }
        }}
      />
    </Card>
  );
};

export default ChangePassword;
