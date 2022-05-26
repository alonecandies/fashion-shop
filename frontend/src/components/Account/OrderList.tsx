import Link from 'next/link';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import { ROUTES } from '@src/configs';
import { IOrder, IOrderItem } from '@src/features/order/order.types';
import { ORDER_STATUS } from '@src/configs/constants';

export interface IOrderListProps {
  orders: Array<IOrder>;
}

const calcTotalPrice = (orders: Array<IOrderItem>): string => {
  return orders
    .reduce(
      (total, current) =>
        total +
        (current.product_sale
          ? current.product_web_price - (current.product_web_price * current.product_sale) / 100
          : current.product_web_price) *
          current.quantity,
      0
    )
    .toLocaleString('vi', { style: 'currency', currency: 'VND' });
};

export default function OrderList({ orders }: IOrderListProps) {
  return (
    <div>
      <Table responsive hover>
        <thead>
          <tr>
            <th className="order__firstrow order__row--alignleft">Mã đơn hàng</th>
            <th className="order__firstrow order__row--alignleft">Ngày đặt</th>
            <th className="order__firstrow order__row--alignright">Tổng tiền</th>
            <th className="order__firstrow order__row--alignright">Trạng thái đơn hàng</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: IOrder) => (
            <Link key={order.id} href={`${ROUTES.orders}/${order.id}`} passHref>
              <tr style={{ cursor: 'pointer' }}>
                <td className="order__row--alignleft">
                  <p className="order__row--bold">#{order.id}</p>
                </td>
                <td className="order__row--alignleft">
                  {moment(order.created_at).format('L - LT')}
                </td>
                <td className="order__row--alignright">{calcTotalPrice(order.orders)}</td>
                <td className="order__row--alignright">
                  {
                    Object.entries(ORDER_STATUS)?.find((item) => item[1].key === order.status)?.[1]
                      .value
                  }
                </td>
              </tr>
            </Link>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
