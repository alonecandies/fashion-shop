import { useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Form, FormControl, FormLabel, FormGroup } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { fetchForfotPassword } from '@src/features/authen/authenSlice';
import { ROUTES } from '@src/configs';
import { MESSAGES } from '@src/configs/constants';

export default function ForgotPassword() {
  const dispatch = useAppDispatch();

  // global state
  const isFetchingForgotPassword = useAppSelector((state) => state.authen.isFetchingForgotPassword);
  const fetchForgotPasswordMsg = useAppSelector((state) => state.authen.fetchForgotPasswordMsg);

  // local state
  const [email, setEmail] = useState('');

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    dispatch(fetchForfotPassword({ email }));
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h1>KHÔI PHỤC MẬT KHẨU</h1>
        </Col>
      </Row>
      <Row>
        <Form onSubmit={handleSubmitForm}>
          <FormGroup className="mb-3">
            <FormLabel>Nhập địa chỉ Email</FormLabel>
            <FormControl
              type="email"
              name="email"
              placeholder="Nhập vào email của tài khoản"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          {!isFetchingForgotPassword && fetchForgotPasswordMsg !== MESSAGES.CONFIRM_SUCCESS && (
            <div className="mb-3">
              <span className="login__text--error">{fetchForgotPasswordMsg}</span>
            </div>
          )}

          {!isFetchingForgotPassword && fetchForgotPasswordMsg === MESSAGES.CONFIRM_SUCCESS && (
            <div className="mb-3">
              <span className="login__text--success">
                {`Kiểm tra hòm thư của Email: ${email} để khôi phục mật khẩu`}
              </span>
            </div>
          )}

          <div className="mb-5">
            <Link href={ROUTES.login}>
              <a>Đã có tài khoản? Đăng nhập ngay</a>
            </Link>
          </div>

          <button className="login__button login__button--fullwidth" type="submit">
            Xác nhận
          </button>
        </Form>
      </Row>
    </Container>
  );
}
