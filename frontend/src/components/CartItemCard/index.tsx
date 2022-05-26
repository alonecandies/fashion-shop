import { ROUTES } from '@src/configs';
import { CartItem } from '@src/features/order/order.types';
import { formatCurrency } from '@src/utils';
import Image from 'next/image';
import Link from 'next/link';
import placeholder_image from 'public/assets/images/placeholder_image.png';
import { calculatePrice } from '@src/utils';
import { increase, decrease, setQuantity, removeOrderItem } from '@src/features/order/orderSlice';
import { useAppDispatch } from '@src/hooks/redux';

interface Props {
  order: CartItem;
  index: number;
}

const CartItemCard: React.FC<Props> = ({ order, index }) => {
  const dispatch = useAppDispatch();

  const priceAfterSale: number = order.product_sale
    ? calculatePrice(order.product_web_price, order.product_sale)
    : order.product_web_price;
  const subTotal: number = priceAfterSale * order.quantity;

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuantity({ index, value: parseInt(event.target.value) }));
  };
  return (
    <tr className="order__item">
      <td className="order__row--alignleft">
        <div style={{ width: 150, height: 200 }}>
          <Image
            src={order.image?.url || placeholder_image.src}
            loader={() => order.image?.url || placeholder_image.src}
            alt={order.image?.title || ''}
            height={200}
            width={150}
            objectFit="contain"
          />
        </div>
      </td>
      <td>
        <Link href={`${ROUTES.product}/${order.product_id}`}>
          <a className="order__row--bold" style={{ whiteSpace: 'nowrap' }}>
            {order.product_title}
          </a>
        </Link>
        <p>Size: {order.size}</p>
        <div style={{ display: 'flex' }}>
          <span>Màu:</span>
          <div
            className="order__cell-color"
            style={{
              background: order.color,
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              marginLeft: '15px'
            }}
          ></div>
        </div>
      </td>
      <td className="order__row--alignright price">
        {formatCurrency(order?.product_web_price)} /
        <span className="price__discount"> {order?.product_sale}%</span>
      </td>
      <td className="order__row--aligncenter ">
        <div className="quantity">
          <button className="quantity__button" onClick={() => dispatch(decrease(index))}>
            -
          </button>
          <input
            className="quantity__input"
            type="number"
            value={order.quantity}
            onChange={handleChangeQuantity}
          ></input>
          <button className="quantity__button" onClick={() => dispatch(increase(index))}>
            +
          </button>
        </div>
      </td>
      <td className="order__row--alignright price total">
        {formatCurrency(subTotal)}
        <div className="delete">
          <button className="delete__button" onClick={() => dispatch(removeOrderItem(index))}>
            Xoá
          </button>
        </div>
      </td>
    </tr>
  );
};
export default CartItemCard;
