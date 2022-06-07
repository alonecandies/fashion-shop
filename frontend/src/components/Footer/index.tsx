import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import ContactForm from './ContactForm';
import { ROUTES } from '@src/configs';
import { PHONE_NUMBER } from '@src/configs/constants/contact';

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
                <h2 className="brand">HPL FASHION</h2>
                <p className="address">Địa chỉ: Đại học Bách Khoa Hà Nội</p>
                <p className="phone">
                  Hotline: <a href={`tel:${PHONE_NUMBER}`}>{PHONE_NUMBER}</a>
                </p>
                <p className="email">
                  <a href="mailto:HPLfashionshop@gmail.com">Email: hplfashionshop@gmail.com</a>
                </p>
              </ul>
            </Col>
            <Col lg={2} md={6} sm={12} xs={12}>
              <ul className="infor-item infor-intro">
                <li>
                  <Link href={ROUTES.blog}>HPL&apos;s Blog</Link>
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
              <div className="mapouter">
                <div className="gmap_canvas">
                  <iframe
                    width="250"
                    height="250"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=%C4%91%E1%BA%A1i%20h%E1%BB%8Dc%20b%C3%A1ch%20khoa&t=k&z=17&ie=UTF8&iwloc=&output=embed"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                  ></iframe>
                  <a href="https://www.embedgooglemap.net"></a>
                  <style></style>
                </div>
              </div>
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
