import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import ContactForm from './ContactForm';
import { ROUTES } from '@src/configs';
import { FACEBOOK_LINK, PHONE_NUMBER } from '@src/configs/constants/contact';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="footer">
      <div
        id="fb-customer-chat"
        className="fb-customerchat"
        data-page_id="102966411978411"
        data-attribution="biz_inbox"
      ></div>
      <ContactForm></ContactForm>
      <div className="infor">
        <Container>
          <Row className="infor-wrapper">
            <Col lg={4} md={6} sm={12} xs={12}>
              <ul className="infor-main infor-item">
                <h2 className="brand">LASY FASHION - ĐẦM THIẾT KẾ</h2>
                <p className="address">
                  Địa chỉ: N5 - KDT Đồng Tàu - Đ.Thịnh Liệt - P. Thịnh Liệt - Q. Hoàng Mai - TP. Hà
                  Nội
                </p>
                <p className="phone">
                  Hotline: <a href={`tel:${PHONE_NUMBER}`}>{PHONE_NUMBER}</a>
                </p>
                <p className="email">
                  <a href="mailto:lasyfashionshop@gmail.com">Email: lasyfashionshop@gmail.com</a>
                </p>
              </ul>
            </Col>
            <Col lg={2} md={6} sm={12} xs={12}>
              <ul className="infor-item infor-intro">
                <li>
                  <Link href={ROUTES.blog}>Lasy&apos;s Blog</Link>
                </li>
                <li>
                  <Link href="#">Tuyển dụng</Link>
                </li>
                <li>
                  <Link href="#">Liên hệ</Link>
                </li>
              </ul>
            </Col>
            <Col lg={3} md={6} sm={12} xs={12}>
              <ul className="infor-item">
                <li>
                  <Link href="#">Chính sách giao nhận - Vận chuyển</Link>
                </li>
                <li>
                  <Link href="#">Hướng dẫn thanh toán</Link>
                </li>
                <li>
                  <Link href="#">Tra cứu đơn hàng</Link>
                </li>
                <li>
                  <Link href="#">Hướng dẫn chọn size</Link>
                </li>
                <li>
                  <Link href="#">Quy định đổi hàng</Link>
                </li>
                <li>
                  <Link href="#">Quy định bảo hành và sửa chữa</Link>
                </li>
                <li>
                  <Link href="#">Khách hàng thân thiết</Link>
                </li>
              </ul>
            </Col>
            <Col lg={3} md={6} sm={12} xs={12}>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="copyright">
        <Container>
          <Link href="/">
            <a>© {year} - Bản quyền Devzone</a>
          </Link>
        </Container>
      </div>
      <script
        defer
        src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"
      ></script>
    </footer>
  );
};

export default Footer;
