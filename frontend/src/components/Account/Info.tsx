import { useEffect } from 'react';
import { Row, Col, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { ACCOUNT_ROUTER_VIEW, VIETNAMESE_PHONE_REG, MESSAGES } from '@src/configs/constants';
import { IUserInfo } from '@src/types/userInfo';
import { clearMsg, fetchUpdateUserInfo } from '@src/features/authen/authenSlice';
import displayToast from '@src/utils/quickDisplayToast';
import { ROUTES } from '@src/configs';

export type IInfoProps = {
  userInfo: IUserInfo;
};

const validationSchema = Yup.object().shape({
  full_name: Yup.string().max(255).defined('Họ tên không được để trống'),
  phone: Yup.string()
    .matches(VIETNAMESE_PHONE_REG, 'Số điện thoại không hợp lệ')
    .defined('Số điện thoại không được để trống'),
  address: Yup.string().max(255).defined('Địa chỉ không được để trống')
});

const isUpdateSuccess = (msg: string): boolean => msg === MESSAGES.UPDATE_SUCCESS || !msg;

export default function Info({ userInfo }: IInfoProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const needEdit = router.query?.view === ACCOUNT_ROUTER_VIEW.edit;

  // global state
  const isFetchingUpdateUSerInfo = useAppSelector((state) => state.authen.isFetchingUpdateUserInfo);
  const fetchUpdateUserInfoMsg = useAppSelector((state) => state.authen.fetchUpdateUserInfoMsg);

  const handleSubmitForm = (values: IUserInfo) => {
    dispatch(fetchUpdateUserInfo(values));
  };

  useEffect(() => {
    !isFetchingUpdateUSerInfo &&
      !!fetchUpdateUserInfoMsg &&
      displayToast(fetchUpdateUserInfoMsg, MESSAGES.UPDATE_SUCCESS, null, () =>
        dispatch(clearMsg(`fetchUpdateUserInfoMsg`))
      );
  }, [dispatch, fetchUpdateUserInfoMsg, isFetchingUpdateUSerInfo]);

  return (
    <div>
      <Formik
        initialValues={userInfo as IUserInfo}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <FormLabel>Họ tên</FormLabel>
              <FormControl
                className="info__input"
                type="text"
                name="full_name"
                value={needEdit ? values.full_name : userInfo.full_name}
                placeholder="Nhập vào họ tên của bạn"
                disabled={!needEdit}
                onBlur={handleBlur}
                onChange={handleChange}
                isValid={needEdit && touched.full_name && !errors.full_name}
                isInvalid={
                  (needEdit && touched.full_name && !!errors.full_name) ||
                  !isUpdateSuccess(fetchUpdateUserInfoMsg)
                }
              />
              <FormControl.Feedback type="invalid">{errors.full_name}</FormControl.Feedback>
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Email</FormLabel>
              <FormControl
                className="info__input"
                type="email"
                name="email"
                value={userInfo.email}
                disabled
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl
                className="info__input"
                type="text"
                name="phone"
                value={needEdit ? values.phone : userInfo.phone}
                placeholder="Nhập vào SĐT của bạn"
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={!needEdit}
                isValid={needEdit && touched.phone && !errors.phone}
                isInvalid={
                  (needEdit && touched.phone && !!errors.phone) ||
                  !isUpdateSuccess(fetchUpdateUserInfoMsg)
                }
              />
              <FormControl.Feedback type="invalid">{errors.phone}</FormControl.Feedback>
            </FormGroup>
            <FormGroup className={`${needEdit && 'mb-5'}`}>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl
                className="info__input"
                type="text"
                name="address"
                value={needEdit ? values.address : userInfo.address}
                placeholder="Nhập vào địa chỉ của bạn"
                disabled={!needEdit}
                onBlur={handleBlur}
                onChange={handleChange}
                isValid={needEdit && touched.address && !errors.address}
                isInvalid={
                  (needEdit && touched.address && !!errors.address) ||
                  !isUpdateSuccess(fetchUpdateUserInfoMsg)
                }
              />
              <FormControl.Feedback type="invalid">{errors.address}</FormControl.Feedback>
            </FormGroup>

            {needEdit && (
              <Row>
                <Col>
                  <button
                    className="info__button info__button--cancel"
                    type="button"
                    onClick={() => router.push(ROUTES.account)}
                  >
                    Hủy
                  </button>
                </Col>
                <Col>
                  <button className="info__button info__button--primary" type="submit">
                    Lưu
                  </button>
                </Col>
              </Row>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
