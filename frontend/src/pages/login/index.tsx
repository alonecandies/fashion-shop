import { Meta } from '@src/layouts/Meta';
import { Container, Row, Col } from 'react-bootstrap';
import { Main } from '@src/templates/Main';
import { useRouter } from 'next/router';
import Login from '@src/components/Authen/Login';
import Register from '@src/components/Authen/Register';
import ForgotPassword from '@src/components/Authen/ForgotPassword';
import ResetPassword from '@src/components/Authen/ResetPassword';
import { LOGIN_ROUTER_ACTION } from '@src/configs/constants';
import { ROUTES } from '@src/configs';
import Breadcrumb from '@src/components/Breadcrumb';

export default function LoginPage() {
  const router = useRouter();

  const action = router.query?.action as string;

  const breadcrumbs = [
    { route: ROUTES.home, title: 'Trang chủ' },
    { route: ROUTES.login, title: 'Đăng nhập' }
  ];

  return (
    <Main meta={<Meta title="HPL Shop | Đăng nhập" description="Shop thời trang" />}>
      <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
      <Container className="mt-5 mb-5">
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={5} className="px-4">
            {action === LOGIN_ROUTER_ACTION.none ? (
              <Login />
            ) : action === LOGIN_ROUTER_ACTION.forgorPassword ? (
              <ForgotPassword />
            ) : action === LOGIN_ROUTER_ACTION.resetPassword ? (
              <ResetPassword />
            ) : (
              <Login />
            )}
          </Col>
          <Col xs={12} md={5} className="px-4 login__rightside">
            <Register />
          </Col>
        </Row>
      </Container>
    </Main>
  );
}
