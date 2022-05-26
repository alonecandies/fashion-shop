import React from 'react';
import { Row, Col, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { fetchCreateOrder } from '@src/features/order/orderSlice';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { IOrderBody, CartItem } from '@src/features/order/order.types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { VIETNAMESE_PHONE_REG } from '@src/configs/constants';
import { IUserInfo } from '@src/types/userInfo';

const validationSchema = Yup.object().shape({
  full_name: Yup.string().defined('Tên người nhận không được để trống'),
  phone: Yup.string()
    .matches(VIETNAMESE_PHONE_REG, 'Số điện thoại không đúng')
    .defined('Số điện thoại không được để trống'),
  address: Yup.string().defined('Địa chỉ không được để trống')
});

export default function CheckoutForm({
  userInfo,
  items
}: {
  userInfo: IUserInfo | null;
  items: CartItem[];
}) {
  const dispatch = useAppDispatch();

  const isFetchingCreateOrder = useAppSelector((state) => state.order.isFetchingCreateOrder);

  const handleSubmitForm = (values: IOrderBody) => {
    dispatch(fetchCreateOrder(values));
  };

  return (
    <Formik
      initialValues={
        {
          full_name: userInfo?.full_name || '',
          phone: userInfo?.phone || '',
          address: userInfo?.address || '',
          orders: items
        } as IOrderBody
      }
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3">
            <FormLabel>Họ tên</FormLabel>
            <FormControl
              className="info__input"
              name="full_name"
              value={values.full_name}
              placeholder="Họ và tên người nhận"
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={touched.full_name && !!errors.full_name}
            />
            <FormControl.Feedback type="invalid">{errors.full_name}</FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Số điện thoại</FormLabel>
            <FormControl
              className="info__input"
              name="phone"
              value={values.phone}
              placeholder="Số điện thoại người nhận"
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={touched.phone && !!errors.phone}
            />
            <FormControl.Feedback type="invalid">{errors.phone}</FormControl.Feedback>
          </FormGroup>
          <FormGroup className="mb-5">
            <FormLabel>Địa chỉ</FormLabel>
            <FormControl
              className="info__input"
              name="address"
              value={values.address}
              placeholder="Địa chỉ nhận hàng"
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={touched.address && !!errors.address}
            />
            <FormControl.Feedback type="invalid">{errors.address}</FormControl.Feedback>
          </FormGroup>

          <Row>
            <Col>
              <button
                className="info__button info__button--primary"
                type="submit"
                disabled={isFetchingCreateOrder}
              >
                XÁC NHẬN
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}
