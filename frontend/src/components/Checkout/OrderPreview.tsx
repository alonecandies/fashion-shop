import React from 'react';
import { Table } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import placeholder_image from 'public/assets/images/placeholder_image.png';
import { calculatePrice, formatCurrency } from '@src/utils';
import { ROUTES } from '@src/configs';
import { CartItem } from '@src/features/order/order.types';

export default function OrderPreview({ items }: { items: CartItem[] }) {
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    let temp = 0;
    items?.forEach((item) => {
      temp += calculatePrice(item.product_web_price, item.product_sale) * item.quantity;
    });
    setTotalPrice(temp);
  }, [items]);

  return (
    <Table responsive="xxl" hover className="mt-3 align-middle order__row--nowrap">
      <tbody>
        {items?.map((item, index) => {
          const priceAfterSale: number = item.product_sale
            ? calculatePrice(item.product_web_price, item.product_sale)
            : item.product_web_price;
          const subTotal = priceAfterSale * item.quantity;
          return (
            <tr className="order__item" key={index}>
              <td className="order__row--alignleft">
                <div style={{ width: 80, height: 100, position: 'relative' }}>
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"
                    style={{ zIndex: 1000 }}
                  >
                    {item.quantity}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                  <Image
                    src={item.image?.url || placeholder_image.src}
                    loader={() => item.image?.url || placeholder_image.src}
                    alt={item.image?.title || ''}
                    height={100}
                    width={80}
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
                <div>Size: {item.size}</div>
                <div className="d-flex align-items-center">
                  <span>Màu:</span>
                  <div
                    className="order__cell-color mx-1"
                    style={{
                      background: item.color,
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%'
                    }}
                  ></div>
                </div>
              </td>
              <td className="order__row--alignright">{formatCurrency(subTotal)}</td>
            </tr>
          );
        })}

        <tr>
          <td colSpan={2}>Tạm tính:</td>
          <td className="order__row--alignright" style={{ fontWeight: 'bold' }}>
            {formatCurrency(totalPrice)}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
