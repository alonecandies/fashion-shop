import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Meta } from '@src/layouts/Meta';
import { Container, Row, Col } from 'react-bootstrap';
import { Main } from '@src/templates/Main';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { fetchGetUserInfo, selectUserInfo, selectIsAuth } from '@src/features/authen/authenSlice';
import Heading from '@src/components/Account/Heading';
import Menu from '@src/components/Account/Menu';
import NotLoggedIn from '@src/components/Account/NotLoggedIn';
import OrderDetail from '@src/components/Account/OrderDetail';
import { fetchGetOrderDetail, selectCurrentOrder } from '@src/features/order/orderSlice';
import { ROUTES } from '@src/configs';
import Breadcrumb from '@src/components/Breadcrumb';

export default function Order() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const orderId = parseInt(router.query.oid as string);

  // global state
  const isAuth = useAppSelector(selectIsAuth);
  const userInfo = useAppSelector(selectUserInfo);
  const isFetchingUserInfo = useAppSelector((state) => state.authen.isFetchingUpdateUserInfo);
  const order = useAppSelector(selectCurrentOrder);
  const isFetchingGetOrderDetail = useAppSelector((state) => state.order.isFetchingGetOrderDetail);

  useEffect(() => {
    dispatch(fetchGetUserInfo(null));
  }, [dispatch, router.query]);

  useEffect(() => {
    orderId && dispatch(fetchGetOrderDetail(orderId));
  }, [dispatch, orderId]);

  const breadcrumbs = [
    { route: ROUTES.home, title: 'Trang chủ' },
    { route: ROUTES.account, title: 'Tài khoản' },
    { route: '', title: 'Đơn hàng' }
  ];

  return (
    <Main meta={<Meta title="HPL Shop | Đơn hàng" description="Shop thời trang" />}>
      <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
      <Container className="mt-5 mb-5">
        <Row className="mb-3">
          <Col>{!isFetchingUserInfo && !!userInfo && <Heading name={userInfo.full_name} />}</Col>
        </Row>
        <Row>
          <Col xs={12} md={3}>
            <Menu />
          </Col>
          <Col xs={12} md={9} className="info__divider">
            {!isFetchingUserInfo && !!userInfo && isAuth ? (
              !isFetchingGetOrderDetail && !!order && <OrderDetail order={order} />
            ) : (
              <NotLoggedIn />
            )}
          </Col>
        </Row>
      </Container>
    </Main>
  );
}
