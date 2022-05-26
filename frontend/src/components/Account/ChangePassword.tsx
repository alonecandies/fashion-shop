import { useEffect } from 'react';
import { Row, Col, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { MESSAGES } from '@src/configs/constants';
import { IChangePasswordBody } from '@src/features/authen/authen.types';
import { clearMsg, fetchChangePassword } from '@src/features/authen/authenSlice';
import displayToast from '@src/utils/quickDisplayToast';

const validationSchema = Yup.object().shape({
  old_pass: Yup.string().max(255).defined('Bạn chưa nhập mật khẩu hiện tại'),
  new_pass: Yup.string()
    .min(8, 'Mật khẩu phải dài từ 8 ký tự trở lên')
    .max(255)
    .defined('Bạn chưa nhập mật khẩu mới'),
  confirm_pass: Yup.string()
    .oneOf([Yup.ref('new_pass'), null], 'Mật khẩu không khớp')
    .defined('Chưa nhập lại mật khẩu mới')
});

const isUpdateSuccess = (msg: string): boolean => msg === MESSAGES.UPDATE_SUCCESS || !msg;

export default function ChangePassword() {
  const dispatch = useAppDispatch();

  // global state
  const isFetchingChangePassword = useAppSelector((state) => state.authen.isFetchingChangePassword);
  const fetchChangePasswordMsg = useAppSelector((state) => state.authen.fetchChangePasswordMsg);

  const handleSubmitForm = (values: IChangePasswordBody) => {
    dispatch(fetchChangePassword(values));
  };

  useEffect(() => {
    !isFetchingChangePassword &&
      !!fetchChangePasswordMsg &&
      displayToast(fetchChangePasswordMsg, MESSAGES.UPDATE_SUCCESS, null, () =>
        dispatch(clearMsg(`fetchChangePasswordMsg`))
      );
  }, [dispatch, fetchChangePasswordMsg, isFetchingChangePassword]);

  return (
    <div>
      <Formik
        initialValues={{
          old_pass: '',
          new_pass: '',
          confirm_pass: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <FormLabel>Mật khẩu hiện tại</FormLabel>
              <FormControl
                className="info__input"
                type="password"
                name="old_pass"
                value={values.old_pass}
                placeholder="Mật khẩu hiện tại"
                onBlur={handleBlur}
                onChange={handleChange}
                isValid={touched.old_pass && !errors.old_pass}
                isInvalid={
                  (touched.old_pass && !!errors.old_pass) ||
                  !isUpdateSuccess(fetchChangePasswordMsg)
                }
              />
              <FormControl.Feedback type="invalid">{errors.old_pass}</FormControl.Feedback>
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormControl
                className="info__input"
                type="password"
                name="new_pass"
                value={values.new_pass}
                placeholder="Mật khẩu mới"
                onBlur={handleBlur}
                onChange={handleChange}
                isValid={touched.new_pass && !errors.new_pass}
                isInvalid={
                  (touched.new_pass && !!errors.new_pass) ||
                  !isUpdateSuccess(fetchChangePasswordMsg)
                }
              />
              <FormControl.Feedback type="invalid">{errors.new_pass}</FormControl.Feedback>
            </FormGroup>
            <FormGroup className="mb-5">
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl
                className="info__input"
                type="password"
                name="confirm_pass"
                value={values.confirm_pass}
                placeholder="Nhập lại mật khẩu mới"
                onBlur={handleBlur}
                onChange={handleChange}
                isValid={touched.confirm_pass && !errors.confirm_pass}
                isInvalid={
                  (touched.confirm_pass && !!errors.confirm_pass) ||
                  !isUpdateSuccess(fetchChangePasswordMsg)
                }
              />
              <FormControl.Feedback type="invalid">{errors.confirm_pass}</FormControl.Feedback>
            </FormGroup>

            <Row>
              <Col>
                <button
                  className="info__button info__button--primary"
                  type="submit"
                  disabled={isFetchingChangePassword}
                >
                  LƯU
                </button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
}
