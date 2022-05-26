import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  Container,
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  FormCheck
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { fetchRegister, selectIsAuth } from '@src/features/authen/authenSlice';
import { ROUTES } from '@src/configs';
import { VIETNAMESE_PHONE_REG } from '@src/configs/constants';
import { IRegisterBody } from '@src/features/authen/authen.types';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Địa chỉ email không hợp lệ').defined('Email không được để trống'),
  password: Yup.string()
    .max(255)
    .min(8, 'Mật khẩu phải dài 8 ký tự trở lên')
    .defined('Mật khẩu không được để trống'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Nhập lại mật khẩu không khớp')
    .defined('Nhập lại mật khẩu không được để trống'),
  full_name: Yup.string().max(255).defined('Họ tên không được để trống'),
  phone: Yup.string()
    .matches(VIETNAMESE_PHONE_REG, 'Số điện thoại không hợp lệ')
    .defined('Số điện thoại không được để trống'),
  address: Yup.string().max(255).defined('Địa chỉ không được để trống'),
  policy: Yup.number().oneOf([1], 'Chưa đồng ý với điều khoản')
});

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // global state
  const isAuth = useAppSelector(selectIsAuth);
  const isFetchingRegister = useAppSelector((state) => state.authen.isFetchingRegister);
  const fetchRegisterMsg = useAppSelector((state) => state.authen.fetchRegisterMsg);

  const handleSubmitForm = (values: IRegisterBody) => {
    dispatch(fetchRegister(values));
  };

  useEffect(() => {
    isAuth && router.push(ROUTES.home);
  }, [isAuth, router]);

  return (
    <Container>
      <Row className="mb-3">
        <h1>ĐĂNG KÝ</h1>
      </Row>
      <Row>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirm_password: '',
            full_name: '',
            phone: '',
            address: '',
            policy: 0
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <FormLabel>Họ tên</FormLabel>
                <FormControl
                  type="text"
                  name="full_name"
                  value={values.full_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập vào họ tên của bạn"
                  isValid={touched.full_name && !errors.full_name}
                  isInvalid={(touched.full_name && !!errors.full_name) || !!fetchRegisterMsg}
                />
                <FormControl.Feedback type="invalid">{errors.full_name}</FormControl.Feedback>
              </FormGroup>

              <FormGroup className="mb-3">
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl
                  type="text"
                  name="phone"
                  value={values.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập vào số điện thoại của bạn"
                  isValid={touched.phone && !errors.phone}
                  isInvalid={(touched.phone && !!errors.phone) || !!fetchRegisterMsg}
                />
                <FormControl.Feedback type="invalid">{errors.phone}</FormControl.Feedback>
              </FormGroup>

              <FormGroup className="mb-3">
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl
                  type="text"
                  name="address"
                  value={values.address}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ của bạn"
                  isValid={touched.address && !errors.address}
                  isInvalid={(touched.address && !!errors.address) || !!fetchRegisterMsg}
                />
                <FormControl.Feedback type="invalid">{errors.address}</FormControl.Feedback>
              </FormGroup>

              <FormGroup className="mb-3">
                <FormLabel>Địa chỉ Email</FormLabel>
                <FormControl
                  type="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  isValid={touched.email && !errors.email}
                  isInvalid={(touched.email && !!errors.email) || !!fetchRegisterMsg}
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
                  placeholder="Nhập vào mật khẩu"
                  isValid={touched.password && !errors.password}
                  isInvalid={(touched.password && !!errors.password) || !!fetchRegisterMsg}
                />
                <FormControl.Feedback type="invalid">{errors.password}</FormControl.Feedback>
              </FormGroup>

              <FormGroup className="mb-3">
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <FormControl
                  type="password"
                  name="confirm_password"
                  value={values.confirm_password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Mật khẩu khớp với bên trên"
                  isValid={touched.confirm_password && !errors.confirm_password}
                  isInvalid={
                    (touched.confirm_password && !!errors.confirm_password) || !!fetchRegisterMsg
                  }
                />
                <FormControl.Feedback type="invalid">
                  {errors.confirm_password}
                </FormControl.Feedback>
              </FormGroup>

              <FormGroup className="mb-5">
                <FormCheck
                  name="policy"
                  type="checkbox"
                  label="Tôi đồng ý với các điều khoản"
                  value={values.policy}
                  onChange={(e) => setFieldValue('policy', e.target.checked ? 1 : 0, true)}
                  isInvalid={touched.policy && !!errors.policy}
                  feedback={errors.policy}
                />
              </FormGroup>

              {!!fetchRegisterMsg && (
                <div>
                  <p className="login__text--error">{fetchRegisterMsg}</p>
                </div>
              )}

              <button
                className="login__button login__button--fullwidth"
                type="submit"
                disabled={isFetchingRegister}
              >
                Đăng ký
              </button>
            </Form>
          )}
        </Formik>
      </Row>
    </Container>
  );
}
