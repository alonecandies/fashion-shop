import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Meta } from '@src/layouts/Meta';
import { Container, Row, Col } from 'react-bootstrap';
import { Main } from '@src/templates/Main';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import {
  fetchGetUserInfo,
  selectUserInfo,
  logout,
  selectIsAuth
} from '@src/features/authen/authenSlice';
import { ACCOUNT_ROUTER_VIEW } from '@src/configs/constants';
import Heading from '@src/components/Account/Heading';
import Menu from '@src/components/Account/Menu';
import Info from '@src/components/Account/Info';
import ChangePassword from '@src/components/Account/ChangePassword';
import NotLoggedIn from '@src/components/Account/NotLoggedIn';
import { IUserInfo } from '@src/types/userInfo';
import { ROUTES } from '@src/configs';
import Breadcrumb from '@src/components/Breadcrumb';

export default function Account() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // global state
  const isAuth = useAppSelector(selectIsAuth);
  const userInfo = useAppSelector(selectUserInfo);
  const isFetchingUserInfo = useAppSelector((state) => state.authen.isFetchingUpdateUserInfo);

  // local state
  const view: string = router.query?.view as string;

  useEffect(() => {
    view === ACCOUNT_ROUTER_VIEW.logout && dispatch(logout());
  }, [view, dispatch]);

  useEffect(() => {
    dispatch(fetchGetUserInfo(null));
  }, [dispatch, router.query]);

  const breadcrumbs = [
    { route: ROUTES.home, title: 'Trang chủ' },
    { route: ROUTES.account, title: 'Tài khoản' }
  ];

  return (
    <Main meta={<Meta title="Lasy Shop | Tài khoản" description="Shop thời trang" />}>
      <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
      <Container className="mt-5 mb-5">
        <Row className="mb-3">
          <Col>{!isFetchingUserInfo && !!userInfo && <Heading name={userInfo.full_name} />}</Col>
        </Row>
        <Row>
          <Col md={3}>
            <Menu />
          </Col>
          <Col md={9} lg={6} className="info__divider">
            {!isFetchingUserInfo && !!userInfo && isAuth ? (
              view === ACCOUNT_ROUTER_VIEW.edit ? (
                <Info userInfo={userInfo as IUserInfo} />
              ) : view === ACCOUNT_ROUTER_VIEW.changePassword ? (
                <ChangePassword />
              ) : (
                <Info userInfo={userInfo as IUserInfo} />
              )
            ) : (
              !isAuth && <NotLoggedIn />
            )}
          </Col>
        </Row>
      </Container>
    </Main>
  );
}
