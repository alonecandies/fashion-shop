import { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateInfo, clearMsg } from 'src/features/authen/authenSlice';
import { Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@material-ui/core';
import { VIETNAMESE_PHONE_REG, MESSAGES } from 'src/configs/constants';
import CustomDialog from 'src/components/CustomDialog';
import displayToast from 'src/utils/quickDisplayToast';

const AccountProfileDetails = (props) => {
  const { userData } = props;
  const submitFormButton = useRef(null);

  const dispatch = useDispatch();

  // global state
  const fetchUpdateInfoMsg = useSelector((state) => state.authenSlice.fetchUpdateInfoMsg);
  const isFetchingUpdateInfo = useSelector((state) => state.authenSlice.isFetchingUpdateInfo);

  // local state
  const [needOpenDialog_ls, setNeedOpenDialog_ls] = useState(false);

  const handleFormSubmit = (data, formik) => {
    dispatch(fetchUpdateInfo({ ...data }));
    formik.setSubmitting(isFetchingUpdateInfo);
  };

  useEffect(() => {
    !isFetchingUpdateInfo &&
      !!fetchUpdateInfoMsg &&
      displayToast(fetchUpdateInfoMsg, MESSAGES.UPDATE_SUCCESS, null, () =>
        dispatch(clearMsg(`fetchUpdateInfoMsg`))
      );
  }, [dispatch, fetchUpdateInfoMsg, isFetchingUpdateInfo]);

  return (
    <Card>
      <CardHeader subheader="Có thể sửa thông tin và lưu lại" title="Thông tin tài khoản" />
      <Divider />
      <CardContent>
        <Formik
          initialValues={{
            id: userData.id,
            email: userData.email,
            name: userData.full_name,
            phone: userData.phone,
            address: userData.address
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().nullable().max(255).required('Tên không được để trống'),
            phone: Yup.string()
              .nullable()
              .matches(VIETNAMESE_PHONE_REG, 'Số điện thoại không đúng')
              .required('Số điện thoại không được để trống'),
            address: Yup.string().nullable().max(255).required('Địa chỉ không được để trống')
          })}
          onSubmit={handleFormSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isValid }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Họ tên"
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

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    required
                    inputProps={{ readOnly: true }}
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    helperText={touched.phone && errors.phone}
                    label="Số điện thoại"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.address && errors.address)}
                    fullWidth
                    helperText={touched.address && errors.address}
                    label="Địa chỉ"
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    variant="outlined"
                  />
                </Grid>
                <Button sx={{ xs: 'none', lg: 'none' }} type="submit" ref={submitFormButton} />

                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <Button variant="contained" onClick={() => isValid && setNeedOpenDialog_ls(true)}>
                    Lưu
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </CardContent>
      <CustomDialog
        needOpen={needOpenDialog_ls}
        title={`Sửa thông tin`}
        content={`Bạn có chắc muốn sửa thông tin của tài khoản không?`}
        button1={{ title: `Hủy`, action: () => setNeedOpenDialog_ls(false) }}
        button2={{
          title: `Có`,
          action: () => {
            submitFormButton.current.click();
            setNeedOpenDialog_ls(false);
          }
        }}
      />
    </Card>
  );
};

export default AccountProfileDetails;
