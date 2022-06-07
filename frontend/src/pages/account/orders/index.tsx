import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Meta } from '@src/layouts/Meta';
import { Container, Row, Col } from 'react-bootstrap';
import { Main } from '@src/templates/Main';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { IGetAllParams as IOrderFilter } from '@src/features/order/order.types';
import { fetchGetUserInfo, selectUserInfo, selectIsAuth } from '@src/features/authen/authenSlice';
import { fetchGetAllOrders, selectOrders } from '@src/features/order/orderSlice';
import Heading from '@src/components/Account/Heading';
import Menu from '@src/components/Account/Menu';
import NotLoggedIn from '@src/components/Account/NotLoggedIn';
import OrderList from '@src/components/Account/OrderList';
import { ROUTES } from '@src/configs';
import Breadcrumb from '@src/components/Breadcrumb';

export default function OrderPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // global state
  const isAuth = useAppSelector(selectIsAuth);
  const userInfo = useAppSelector(selectUserInfo);
  const isFetchingUserInfo = useAppSelector((state) => state.authen.isFetchingUpdateUserInfo);
  const orders = useAppSelector(selectOrders);
  const isFetchingGetAllOrders = useAppSelector((state) => state.order.isFetchingGetAllOrders);

  // local state
  const [filter] = useState({
    status: '',
    page: 0,
    pageSize: 10
  } as IOrderFilter);

  useEffect(() => {
    dispatch(fetchGetUserInfo(null));
  }, [dispatch, router.query]);

  useEffect(() => {
    dispatch(fetchGetAllOrders(filter));
  }, [dispatch, filter]);

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
              !isFetchingGetAllOrders && !!orders && <OrderList orders={orders} />
            ) : (
              <NotLoggedIn />
            )}
          </Col>
        </Row>
      </Container>
    </Main>
  );
}
