import { ROUTES } from '@src/configs';
import { PRODUCT_IMAGE_TYPE } from '@src/configs/constants';
import { IOrder } from '@src/features/order/order.types';
import { formatCurrency } from '@src/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Row, Table, Col } from 'react-bootstrap';
import placeholder_image from 'public/assets/images/placeholder_image.png';

interface IOrderDetailProps {
  order: IOrder;
}

export default function OrderDetail({ order }: IOrderDetailProps) {
  const items = order.orders;
  let tempTotalPrice = 0;

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <h2>Đơn hàng #{order.id}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive="xxl" hover className="align-middle order__row--nowrap">
            <thead>
              <tr>
                <th></th>
                <th className="order__firstrow order__row--alignleft">Sản phẩm</th>
                <th className="order__firstrow order__row--alignleft">Mã sản phẩm</th>
                <th className="order__firstrow order__row--alignleft">Màu</th>
                <th className="order__firstrow order__row--alignleft">Size</th>
                <th className="order__firstrow order__row--alignright">Giá</th>
                <th className="order__firstrow order__row--alignright">Giá sale</th>
                <th className="order__firstrow order__row--alignright">Số lượng</th>
                <th className="order__firstrow order__row--alignright">Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 &&
                items.map((item) => {
                  const priceAfterSale: number = item.product_sale
                    ? item.product_web_price - (item.product_web_price * item.product_sale) / 100
                    : item.product_web_price;
                  const subTotal: number = priceAfterSale * item.quantity;
                  tempTotalPrice += subTotal;

                  const image = item.images.find(
                    (image) => image.type === PRODUCT_IMAGE_TYPE.MAIN.key
                  );

                  return (
                    <tr key={item.id}>
                      <td className="order__row--alignleft">
                        <div style={{ width: 100, height: 100 }}>
                          <Image
                            src={image?.url || placeholder_image.src}
                            loader={() => image?.url || placeholder_image.src}
                            alt={image?.title || ''}
                            height={100}
                            width={100}
                            objectFit="contain"
                          />
                        </div>
                      </td>
                      <td>
                        <Link href={`${ROUTES.product}/${item.product_id}`}>
                          <a className="order__row--bold" style={{ whiteSpace: 'nowrap' }}>
                            {item.product_title}
                          </a>
                        </Link>
                      </td>
                      <td>{item.code_product}</td>
                      <td>
                        <div className="order__cell-color" style={{ background: item.color }}></div>
                      </td>
                      <td>{item.size}</td>
                      <td className="order__row--alignright">
                        {formatCurrency(item.product_web_price)}
                      </td>
                      <td className="order__row--alignright">
                        {priceAfterSale < item.product_web_price
                          ? formatCurrency(priceAfterSale)
                          : ''}
                      </td>
                      <td className="order__row--alignright">{item.quantity}</td>
                      <td className="order__row--alignright">{formatCurrency(subTotal)}</td>
                    </tr>
                  );
                })}
              <tr>
                <td colSpan={8}>Tạm tính</td>
                <td className="order__row--alignright">{formatCurrency(tempTotalPrice)}</td>
              </tr>
              <tr>
                <td colSpan={8}>Vận chuyển</td>
                <td className="order__row--alignright">{formatCurrency(0)}</td>
              </tr>
              <tr>
                <td className="order__row--bold" colSpan={8}>
                  Tổng
                </td>
                <td className="order__row--alignright order__row--bold">
                  {formatCurrency(tempTotalPrice + 0)}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}
