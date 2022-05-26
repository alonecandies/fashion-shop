import React, { useEffect } from 'react';
import { Main } from '@src/templates/Main';
import { Meta } from '@src/layouts/Meta';
import { Container, Row, Col } from 'react-bootstrap';
import { getCartFromLocalStorage, selectLocalCart } from '@src/features/order/orderSlice';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { ROUTES } from '@src/configs';
import Breadcrumb from '@src/components/Breadcrumb';
import { useGetUserInfo } from '@src/hooks/authHooks';
import OrderPreview from '@src/components/Checkout/OrderPreview';
import CheckoutForm from '@src/components/Checkout/CheckoutForm';

const breadcrumbs = [
  { route: ROUTES.home, title: 'Trang chủ' },
  { route: ROUTES.checkout, title: 'Xác nhận đặt hàng' }
];

const CheckoutPage = () => {
  const dispatch = useAppDispatch();

  // global state
  const localOrder = useAppSelector(selectLocalCart);
  const { userInfo } = useGetUserInfo();

  useEffect(() => {
    dispatch(getCartFromLocalStorage());
  }, [dispatch]);

  return (
    <Main meta={<Meta title="Lasy Shop | Xác nhận đặt hàng" description="Shop thời trang" />}>
      <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
      <Container className="mt-5 mb-5">
        {!!localOrder && localOrder?.length > 0 ? (
          <>
            <Row className="mb-3">
              <Col>
                <h2>Xác nhận đặt hàng</h2>
              </Col>
            </Row>

            <Row className="flex-row-reverse">
              <Col xs={12} md={7}>
                <OrderPreview items={localOrder} />
              </Col>

              <Col xs={12} md={5}>
                <CheckoutForm userInfo={userInfo} items={localOrder} />
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col>
              <h2 className="text-center">Giỏ hàng của bạn đang trống!</h2>
            </Col>
          </Row>
        )}
      </Container>
    </Main>
  );
};
export default CheckoutPage;
