import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, selectUserInfo, fetchGetUserData } from 'src/features/authen/authenSlice';
import cookies from 'js-cookie';

export default function useCheckAuth({ navigate, currentPage }) {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(selectUserInfo);
  const isFetchingUserData = useSelector((state) => state.authenSlice.isFetchingUserInfo);
  const getUserDataMsg = useSelector((state) => state.authenSlice.fetchUserDataMsg);

  useEffect(() => {
    return dispatch(fetchGetUserData());
  }, [dispatch]);

  useEffect(() => {
    // case reload page
    if (!cookies.get('token') || !!getUserDataMsg) {
      navigate('/login', { state: { previousPage: currentPage } });
    }
    // case logged out
    if (!cookies.get('token') && !isAuth && !isFetchingUserData) {
      navigate('/login', { state: { previousPage: currentPage } });
    }
  }, [currentPage, getUserDataMsg, isAuth, isFetchingUserData, navigate, userData]);
}
