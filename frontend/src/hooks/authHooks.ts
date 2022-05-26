import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { useRouter } from 'next/router';
import { getToken } from '@src/utils/tokenUtil';
import { ROUTES } from '@src/configs';
import { selectIsAuth, selectUserInfo, fetchGetUserInfo } from '@src/features/authen/authenSlice';
import { IUserInfo } from '@src/types/userInfo';

export const useGetUserInfo = (): { isAuth: boolean; userInfo: IUserInfo | null } => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectIsAuth);
  const userInfo = useAppSelector(selectUserInfo);

  useEffect(() => {
    !isAuth && !userInfo && dispatch(fetchGetUserInfo(null));
  }, [dispatch, isAuth, userInfo]);

  return { isAuth, userInfo };
};

export const useRequireAuth = (preUrl: string) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectIsAuth);
  const isFetchingGetUserInfo = useAppSelector((state) => state.authen.fetchGetUserInfoMsg);
  const fetchGetUserInfoMsg = useAppSelector((state) => state.authen.fetchGetUserInfoMsg);

  useEffect(() => {
    dispatch(fetchGetUserInfo(null));
  }, [dispatch]);

  useEffect(() => {
    // case reload page
    if (!getToken() || !!fetchGetUserInfoMsg) {
      router.push(ROUTES.login, { query: { preUrl } });
    }
    // case logged out
    if (!getToken() && !isAuth && !isFetchingGetUserInfo) {
      router.push(ROUTES.login, { query: { preUrl } });
    }
  }, [fetchGetUserInfoMsg, isAuth, isFetchingGetUserInfo, preUrl, router]);
};
