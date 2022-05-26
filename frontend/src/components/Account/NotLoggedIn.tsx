import Link from 'next/link';
import { ROUTES } from '@src/configs';

export default function NotLoggedIn() {
  return (
    <div>
      <h2>
        {'Vui lòng '}
        <Link href={ROUTES.login}>
          <a className="not-logged-in__anchor">đăng nhập</a>
        </Link>
        {' để tiếp tục'}
      </h2>
    </div>
  );
}
