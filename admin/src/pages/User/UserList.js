import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetAllUsers,
  selectUsersData,
  selectTotalUser,
  clearMsg
} from 'src/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { Box, Container, Skeleton } from '@material-ui/core';
import UserListResults from 'src/components/User/UserListResults';
import UserListToolbar from 'src/components/User/UserListToolbar';
import { MESSAGES } from 'src/configs/constants';
import UserEditDialog from 'src/components/User/UserEditDialog';
import UserStatusEditDialog from 'src/components/User/UserStatusEditDialog';
import displayToast from 'src/utils/quickDisplayToast';

const UserList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //check authorized
  useCheckAuth({ navigate, currentPage: `/app/users` });

  // redux state
  const users = useSelector(selectUsersData);
  const total = useSelector(selectTotalUser);
  const fetchUpdateUserMsg_gs = useSelector((state) => state.userSlice.fetchUpdateUserMsg);
  const fetchUpdateUserStatusMsg_gs = useSelector(
    (state) => state.userSlice.fetchUpdateUserStatusMsg
  );
  const isFetchingGetAllUsers = useSelector((state) => state.userSlice.isFetchingGetAllUsers);
  // pagination
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
    name: '',
    order: '',
    status: ''
  });

  //Edit user dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [idUserEdit, setIdUserEdit] = useState(null);

  const handleOpenEdit = (userId, index) => {
    setOpenEditDialog(true);
    setIdUserEdit(userId);
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
  };

  const handleOpenStatusDialog = (userId) => {
    setOpenStatusDialog(true);
    setIdUserEdit(userId);
  };

  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
  };

  // call api
  const getUsers = () => {
    dispatch(fetchGetAllUsers(pagination));
  };

  useEffect(() => {
    dispatch(fetchGetAllUsers(pagination));
  }, [dispatch, pagination]);

  //Toast
  useEffect(() => {
    !!fetchUpdateUserMsg_gs &&
      displayToast(fetchUpdateUserMsg_gs, MESSAGES.UPDATE_SUCCESS, null, () =>
        dispatch(clearMsg(`fetchUpdateUserMsg`))
      );
  }, [dispatch, fetchUpdateUserMsg_gs]);
  useEffect(() => {
    !!fetchUpdateUserStatusMsg_gs &&
      displayToast(fetchUpdateUserStatusMsg_gs, MESSAGES.UPDATE_SUCCESS, null, () =>
        dispatch(clearMsg(`fetchUpdateUserStatusMsg`))
      );
  }, [dispatch, fetchUpdateUserStatusMsg_gs]);

  return (
    <>
      <Helmet>
        <title>Người dùng | Lasy Shop</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <UserListToolbar setPagination={setPagination} />
          <Box sx={{ pt: 3 }}>
            {isFetchingGetAllUsers ? (
              <Skeleton variant="rectangular" width="100%" height={600} />
            ) : (
              <UserListResults
                pagination={pagination}
                setPagination={setPagination}
                getUsers={getUsers}
                users={users}
                totalUser={total}
                handleOpenEdit={handleOpenEdit}
                handleOpenStatusDialog={handleOpenStatusDialog}
              />
            )}
            <UserEditDialog
              isOpened={openEditDialog}
              idUser={idUserEdit}
              handleClose={handleCloseDialog}
            />
            <UserStatusEditDialog
              isOpened={openStatusDialog}
              idUser={idUserEdit}
              handleClose={handleCloseStatusDialog}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default UserList;
