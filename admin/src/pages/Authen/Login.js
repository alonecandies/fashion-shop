import { useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, selectIsAuth } from 'src/features/authen/authenSlice';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  CircularProgress,
  Checkbox
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const previousPage = location?.state?.previousPage;

  // global state
  const isAuth_gs = useSelector(selectIsAuth);
  const isPendingLogin_gs = useSelector((state) => state.authenSlice.isFetchingLogin);
  const loginMsg_gs = useSelector((state) => state.authenSlice.fetchLoginMsg);

  useEffect(() => {
    isAuth_gs && navigate(previousPage || `/app/products/list`, { replace: true });
  }, [isAuth_gs, navigate, previousPage]);

  const handleFormSubmit = (data, formik) => {
    dispatch(fetchLogin({ ...data }));
    formik.setSubmitting(isPendingLogin_gs);
  };

  return (
    <>
      <Helmet>
        <title>Đăng nhập | HPL shop</title>
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
              password: '',
              remember: false
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Định dạng email chưa đúng')
                .max(255)
                .required('Email không được để trống'),
              password: Yup.string().max(255).required('Mật khẩu không được để trống')
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
                    Đăng nhập
                  </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Đăng nhập bằng mạng xã hội
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Facebook
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Google
                    </Button>
                  </Grid>
                </Grid>
                <Box sx={{ pb: 1, pt: 3 }}>
                  <Typography color="textSecondary" variant="body1">
                    {`hoặc đăng nhập với email`}
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email"
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
                {loginMsg_gs && (
                  <Box sx={{ py: 2 }}>
                    <Typography color="error">{loginMsg_gs}</Typography>
                  </Box>
                )}

                <Box sx={{ alignItems: 'center', display: 'flex', ml: -1 }}>
                  <Checkbox checked={values.remember} name="remember" onChange={handleChange} />
                  <Typography color="textSecondary" variant="body1">
                    {`Giữ đăng nhập`}
                  </Typography>
                </Box>

                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {isPendingLogin_gs ? <CircularProgress size={30} /> : `Đăng nhập`}
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  {`Chưa có tài khoản? `}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Đăng ký ngay
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

export default Login;
