import { ReactNode } from 'react';

import Header from '@src/components/Header';
import Footer from '@src/components/Footer';
import ScrollToTop from '@src/components/ScrollToTop';
import { useGetUserInfo } from '@src/hooks/authHooks';
import Chat from '@src/components/Chat';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  useGetUserInfo();

  const { meta, children } = props;

  return (
    <div>
      {meta}
      <Header />
      {children}
      <ScrollToTop />
      <Chat />
      <Footer />
    </div>
  );
};

export { Main };
