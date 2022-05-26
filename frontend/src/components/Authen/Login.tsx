import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  FormCheck
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { ROUTES } from '@src/configs';
import { fetchLogin, selectIsAuth } from '@src/features/authen/authenSlice';
import { ILoginBody } from '@src/features/authen/authen.types';
import { LOGIN_ROUTER_ACTION } from '@src/configs/constants';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Địa chỉ email không hợp lệ').defined('Email không được để trống'),
  password: Yup.string().max(255).defined('Mật khẩu không được để trống'),
  remember_me: Yup.number().oneOf([0, 1])
});

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // global state
  const isAuth = useAppSelector(selectIsAuth);
  const isFetchingLogin = useAppSelector((state) => state.authen.isFetchingLogin);
  const fetchLoginMsg = useAppSelector((state) => state.authen.fetchLoginMsg);

  const handleSubmitForm = (values: ILoginBody) => {
    dispatch(fetchLogin(values));
  };

  useEffect(() => {
    isAuth && router.push(ROUTES.home);
  }, [isAuth, router]);

  return (
    <Container>
      <Row className="mb-3">
        <h1>ĐĂNG NHẬP</h1>
      </Row>
      <Row>
        <Formik
          initialValues={{ email: '', password: '', remember_me: 1 }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <FormLabel>Email</FormLabel>
                <FormControl
                  type="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  isValid={touched.email && !errors.email}
                  isInvalid={(touched.email && !!errors.email) || !!fetchLoginMsg}
                />
                <FormControl.Feedback type="invalid">{errors.email}</FormControl.Feedback>
              </FormGroup>

              <FormGroup className="mb-3">
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl
                  type="password"
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Mật khẩu của bạn"
                  isValid={touched.password && !errors.password}
                  isInvalid={(touched.password && !!errors.password) || !!fetchLoginMsg}
                />
                <FormControl.Feedback type="invalid">{errors.password}</FormControl.Feedback>
              </FormGroup>

              <FormGroup className="mb-5">
                <Row>
                  <Col>
                    <FormCheck
                      name="remember_me"
                      type="checkbox"
                      label="Ghi nhớ đăng nhập"
                      value={values.remember_me}
                      onChange={(e) => setFieldValue('remember_me', e.target.checked ? 1 : 0, true)}
                      isInvalid={!!errors.remember_me}
                      feedback={errors.remember_me}
                    />
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Link href={`${ROUTES.login}/?action=${LOGIN_ROUTER_ACTION.forgorPassword}`}>
                      <a>Quên mật khẩu?</a>
                    </Link>
                  </Col>
                </Row>
              </FormGroup>

              {!!fetchLoginMsg && (
                <div>
                  <p className="login__text--error">{fetchLoginMsg}</p>
                </div>
              )}

              <button
                className="login__button login__button--fullwidth"
                type="submit"
                disabled={isFetchingLogin}
              >
                Đăng nhập
              </button>
            </Form>
          )}
        </Formik>
      </Row>
    </Container>
  );
}
