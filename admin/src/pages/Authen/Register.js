import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from 'src/features/authen/authenSlice';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { VIETNAMESE_PHONE_REG } from 'src/configs/constants';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // global state
  const isAuth_gs = useSelector(selectIsAuth);
  const isPendingRegister_gs = useSelector((state) => state.authenSlice.isFetchingRegister);
  const registerMsg_gs = useSelector((state) => state.authenSlice.fetchRegisterMsg);

  useEffect(() => {
    isAuth_gs && navigate(`/app/dashboard`, { replace: true });
  }, [isAuth_gs, navigate]);

  const handleFormSubmit = (data, formik) => {
    dispatch(fetchRegister({ ...data }));
    formik.setSubmitting(isPendingRegister_gs);
  };

  return (
    <>
      <Helmet>
        <title>Đăng ký | HPL Shop</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              name: '',
              password: '',
              confirmPassword: '',
              phone: '',
              address: '',
              policy: false
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Định dạng email không hợp lệ')
                .max(255)
                .required('Email không được để trống'),
              name: Yup.string().max(255).required('Tên không được để trống'),
              password: Yup.string()
                .min(6, 'Mật khẩu phải dài từ 6 ký tự trở lên')
                .max(255)
                .required('Mật khẩu không được để trống'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Nhập lại mật khẩu không khớp')
                .required('Bạn chưa nhập lại mật khẩu'),
              phone: Yup.string()
                .matches(VIETNAMESE_PHONE_REG, 'Số điện thoại không đúng')
                .required('Số điện thoại không được để trống'),
              address: Yup.string().max(255).required('Địa chỉ không được để trống'),
              policy: Yup.boolean().oneOf([true], 'Bạn chưa đồng ý với điều khoản')
            })}
            onSubmit={handleFormSubmit}
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
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    {`Tạo tài khoản`}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    {`Dùng email của bạn để tạo tài khoản`}
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Họ tên"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  label="Số điện thoại"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.address && errors.address)}
                  fullWidth
                  helperText={touched.address && errors.address}
                  label="Địa chỉ"
                  margin="normal"
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Địa chỉ Email"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Mật khẩu"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  fullWidth
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  label="Nhập lại mật khẩu"
                  margin="normal"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.confirmPassword}
                  variant="outlined"
                />
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox checked={values.policy} name="policy" onChange={handleChange} />
                  <Typography color="textSecondary" variant="body1">
                    {`Tôi đồng ý với `}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      {`Điều khoản`}
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                {registerMsg_gs && (
                  <Box sx={{ py: 2 }}>
                    <Typography color="error">{registerMsg_gs}</Typography>
                  </Box>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {isPendingRegister_gs ? <CircularProgress size={30} /> : `Đăng ký ngay`}
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  {`Đã có tài khoản? `}
                  <Link component={RouterLink} to="/login" variant="h6">
                    {`Đăng nhập tại đây`}
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
