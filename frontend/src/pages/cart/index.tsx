import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
import { Main } from '@src/templates/Main';
import { Meta } from '@src/layouts/Meta';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { formatCurrency } from '@src/utils';
import CartItemCard from '@src/components/CartItemCard';
import { getCartFromLocalStorage, selectLocalCart } from '@src/features/order/orderSlice';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { CartItem } from '@src/features/order/order.types';
import { calculatePrice } from '@src/utils';
import { ROUTES } from '@src/configs';
import Breadcrumb from '@src/components/Breadcrumb';
import Link from 'next/link';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const localCart = useAppSelector(selectLocalCart);

  useEffect(() => {
    dispatch(getCartFromLocalStorage());
  }, [dispatch]);

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let temp = 0;
    localCart?.forEach((item) => {
      temp += calculatePrice(item.product_web_price, item.product_sale) * item.quantity;
    });
    setTotalPrice(temp);
  }, [localCart]);

  const breadcrumbs = [
    { route: ROUTES.home, title: 'Trang chủ' },
    { route: ROUTES.cart, title: 'Giỏ hàng' }
  ];

  return (
    <Main meta={<Meta title="Lasy Shop | Giỏ hàng" description="Shop thời trang" />}>
      <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
      <Container className="mt-5 mb-5">
        <Row className="mb-3">
          <Col>
            <h2>Giỏ hàng</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive="xxl" hover className="align-middle order__row--nowrap">
              <thead>
                <tr>
                  <th></th>
                  <th className="order__firstrow order__row--alignleft">Sản phẩm</th>
                  <th className="order__firstrow order__row--alignright">Giá gốc / Giảm(%)</th>
                  <th className="order__firstrow order__row--aligncenter">Số lượng</th>
                  <th className="order__firstrow order__row--alignright">Tổng tiền</th>
                  <th className="order__firstrow order__row--alignright"></th>
                </tr>
              </thead>
              <tbody>
                {!!localCart &&
                  localCart.map((order: CartItem, index: number) => (
                    <CartItemCard key={index} order={order} index={index} />
                  ))}
                <tr>
                  <td className="order__row--bold" colSpan={4}>
                    Tổng
                  </td>
                  <td className="order__row--alignright order__row--bold price">
                    {formatCurrency(totalPrice + 0)}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="d-flex justify-content-end">
          <Col xs={12} sm={6} md={3} lg={2}>
            <Link href={ROUTES.checkout} passHref>
              <button className="checkout__button checkout__button--fullwidth">Đặt hàng</button>
            </Link>
          </Col>
        </Row>
      </Container>
    </Main>
  );
};
export default Cart;
