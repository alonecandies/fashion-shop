import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTES } from '@src/configs';
import { ACCOUNT_ROUTER_VIEW } from '@src/configs/constants';

const menuItems = [
  {
    href: ROUTES.account,
    label: 'Thông tin tài khoản',
    match: (path: string) => path === ROUTES.account
  },
  {
    href: `${ROUTES.account}?view=${ACCOUNT_ROUTER_VIEW.edit}`,
    label: 'Sửa thông tin',
    match: (path: string) => path === `${ROUTES.account}?view=${ACCOUNT_ROUTER_VIEW.edit}`
  },
  {
    href: ROUTES.orders,
    label: 'Quản lý đơn hàng',
    match: (path: string) => path.includes(ROUTES.orders)
  },
  {
    href: `${ROUTES.account}?view=${ACCOUNT_ROUTER_VIEW.changePassword}`,
    label: 'Thay đổi mật khẩu',
    match: (path: string) => path === `${ROUTES.account}?view=${ACCOUNT_ROUTER_VIEW.changePassword}`
  },
  {
    href: `${ROUTES.account}?view=${ACCOUNT_ROUTER_VIEW.logout}`,
    label: 'Đăng xuất',
    match: (path: string) => path === `${ROUTES.account}?view=${ACCOUNT_ROUTER_VIEW.logout}`
  }
];

export default function Menu() {
  const router = useRouter();

  return (
    <div>
      <ul className="menu__main--nopadding">
        {menuItems.map((menuItem, index) => (
          <li
            key={index}
            className={`menu__item ${menuItem.match(router.asPath) && `menu__item--active`}`}
          >
            <Link href={menuItem.href}>
              <a className="menu__item-link">{menuItem.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
