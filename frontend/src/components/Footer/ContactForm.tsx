import { Container, Row, Col, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { fetchContact } from '@src/features/contact/contactSlide';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .max(255)
    .email('Địa chỉ email không hợp lệ!')
    .required('Email không được để trống!'),
  full_name: Yup.string().max(255).required('Tên không được để trống!'),
  phone: Yup.string().max(50).required('Số điện thoại không được để trống!'),
  content: Yup.string().required('Nội dung không được để trống!')
});

const ContactForm = () => {
  const dispatch = useAppDispatch();
  const isFetchingContact = useAppSelector((state) => state.contact.isFetchingContact);
  const fetchContactMsg = useAppSelector((state) => state.contact.fetchContactMsg);
  const handleSubmitForm = (values: any) => {
    dispatch(fetchContact(values));
  };
  return (
    <div className="logup">
      <div className="logup-wrapper">
        <Container>
          <Row>
            <Col lg={4} sm={12} xs={12}>
              <h1>LIÊN HỆ</h1>
              <h6>
                Hãy liên hệ với chúng tôi để phản hồi cũng như nhận được những thông tin hữu ích và
                những chương trình khuyến mãi hấp dẫn của HPL Shop!
              </h6>
              <h6>
                Còn chần chờ gì nữa mà các bạn không liền tay chọn cho mình những set đồ thời trang
                xinh yêu, và đóng góp vào một phần xinh đẹp cho bản thân bạn đến từ cửa hàng HPL
                Shop, là một phần giúp cho tụi mình thành công và phát triển để luôn nung nấu nhiệt
                huyết đem đến cho các bạn những bộ quần áo xinh đẹp nhất. Chúng tôi luôn mong chờ
                những phản hồi về dịch vụ cũng như chất lượng sản phẩm từ các bạn để phát triển HPL
                Shop ngày một hoàn thiện hơn.
              </h6>
            </Col>
            <Col lg={8} sm={12} xs={12}>
              <Formik
                initialValues={{ email: '', phone: '', full_name: '', content: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmitForm}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <Form onSubmit={handleSubmit} className="input">
                    <Row>
                      <Col md={4} sm={12} xs={12}>
                        <FormGroup>
                          <FormLabel>Họ và tên</FormLabel>
                          <FormControl
                            type="text"
                            name="full_name"
                            value={values.full_name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Nhập họ tên đầy đủ của bạn.."
                            isValid={touched.full_name && !errors.full_name}
                            isInvalid={
                              (touched.full_name && !!errors.full_name) || !!fetchContactMsg
                            }
                          />
                          <FormControl.Feedback type="invalid">
                            {errors.full_name}
                          </FormControl.Feedback>
                        </FormGroup>
                      </Col>
                      <Col md={4} sm={12} xs={12}>
                        <FormGroup>
                          <FormLabel>Số điện thoại</FormLabel>
                          <FormControl
                            type="text"
                            name="phone"
                            value={values.phone}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại của bạn.."
                            isValid={touched.phone && !errors.phone}
                            isInvalid={(touched.phone && !!errors.phone) || !!fetchContactMsg}
                          />
                          <FormControl.Feedback type="invalid">{errors.phone}</FormControl.Feedback>
                        </FormGroup>
                      </Col>
                      <Col md={4} sm={12} xs={12}>
                        <FormGroup>
                          <FormLabel>Email</FormLabel>
                          <FormControl
                            type="email"
                            name="email"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Nhập email của bạn.."
                            isValid={touched.email && !errors.email}
                            isInvalid={(touched.email && !!errors.email) || !!fetchContactMsg}
                          />
                          <FormControl.Feedback type="invalid">{errors.email}</FormControl.Feedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <FormLabel>Nội dung</FormLabel>
                      <FormControl
                        as="textarea"
                        name="content"
                        rows={5}
                        value={values.content}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Nhập nội dung.."
                        isValid={touched.content && !errors.content}
                        isInvalid={(touched.content && !!errors.content) || !!fetchContactMsg}
                      />
                      <FormControl.Feedback type="invalid">{errors.content}</FormControl.Feedback>
                    </FormGroup>

                    {!!fetchContactMsg && (
                      <div>
                        <p className="successText">{fetchContactMsg}</p>
                      </div>
                    )}

                    <div className="mt-3">
                      <button type="submit" disabled={isFetchingContact}>
                        Gửi
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ContactForm;
