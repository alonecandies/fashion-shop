import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container, Row, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { fetchResetPassword } from '@src/features/authen/authenSlice';
import { ROUTES } from '@src/configs';
import { IResetPasswordBody } from '@src/features/authen/authen.types';
import { MESSAGES } from '@src/configs/constants';

const validationSchema = Yup.object().shape({
  token: Yup.string().defined('Token không hợp lệ'),
  password: Yup.string()
    .max(255)
    .min(8, 'Mật khẩu phải dài 8 ký tự trở lên')
    .defined('Mật khẩu không được để trống'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Nhập lại mật khẩu không khớp')
    .defined('Nhập lại mật khẩu không được để trống')
});

export default function ResetPassword() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // global state
  const isFetchingResetPassword = useAppSelector((state) => state.authen.isFetchingResetPassword);
  const fetchResetPasswordMsg = useAppSelector((state) => state.authen.fetchResetPasswordMsg);

  // local state
  const token = router.query?.token as string;

  const handleSubmitForm = (values: IResetPasswordBody) => {
    dispatch(fetchResetPassword(values));
  };

  useEffect(() => {
    !isFetchingResetPassword &&
      fetchResetPasswordMsg === MESSAGES.UPDATE_SUCCESS &&
      router.push(ROUTES.login);
  }, [fetchResetPasswordMsg, isFetchingResetPassword, router]);

  return (
    <Container>
      <Row className="mb-3">
        <h1>KHÔI PHỤC MẬT KHẨU</h1>
      </Row>
      <Row>
        <Formik
          initialValues={{
            token: token || '',
            password: '',
            confirm_password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl
                  type="password"
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập vào mật khẩu mới"
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                <FormControl.Feedback type="invalid">{errors.password}</FormControl.Feedback>
              </FormGroup>

              <FormGroup className={!!fetchResetPasswordMsg ? `mb-3` : `mb-5`}>
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <FormControl
                  type="password"
                  name="confirm_password"
                  value={values.confirm_password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Mật khẩu khớp với bên trên"
                  isValid={touched.confirm_password && !errors.confirm_password}
                  isInvalid={touched.confirm_password && !!errors.confirm_password}
                />
                <FormControl.Feedback type="invalid">
                  {errors.confirm_password}
                </FormControl.Feedback>
              </FormGroup>

              {!!fetchResetPasswordMsg && (
                <div className="mb-5">
                  <span className="login__text--error">{fetchResetPasswordMsg}</span>
                </div>
              )}

              <button
                className="login__button login__button--fullwidth"
                type="submit"
                disabled={isFetchingResetPassword}
              >
                Xác nhận
              </button>
            </Form>
          )}
        </Formik>
      </Row>
    </Container>
  );
}
