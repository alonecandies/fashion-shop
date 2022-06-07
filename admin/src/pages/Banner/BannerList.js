import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { Box, Container } from '@material-ui/core';
import { CRUD_ACTIONS, MESSAGES } from 'src/configs/constants';
import BannerListToolbar from 'src/components/Banner/BannerListToolbar';
import BannerListResults from 'src/components/Banner/BannerListResults';
import { fetchGetAllBanners, selectBannersData, clearMsg } from 'src/features/banner/bannerSlice';
import { BANNERS_PER_LIST } from 'src/configs/constants';
import displayToast from 'src/utils/quickDisplayToast';
import BannerEditDialog from 'src/components/Banner/BannerEditDialog';

const BannerList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //filter
  const [page, setPage] = useState(1);
  const [numberOfItems, setNumberOfItem] = useState(BANNERS_PER_LIST[1]);
  const [filter, setFilter] = useState({
    title: '',
    type: ''
  });

  //check authorized
  useCheckAuth({ navigate, currentPage: `/app/banners` });

  // redux state
  const banners = useSelector(selectBannersData);

  // global state
  const fetchDeleteBannerMsg = useSelector((state) => state.bannerSlice.fetchDeleteBannerMsg);
  const isFetchingDeleteBanner = useSelector((state) => state.bannerSlice.isFetchingDeleteBanner);

  // local state
  const msgName = `fetchDeleteBannerMsg`;

  //toast
  useEffect(() => {
    !isFetchingDeleteBanner &&
      !!fetchDeleteBannerMsg &&
      displayToast(fetchDeleteBannerMsg, MESSAGES.DELETE_SUCCESS, null, () =>
        dispatch(clearMsg(msgName))
      );
  }, [dispatch, fetchDeleteBannerMsg, isFetchingDeleteBanner, msgName]);

  useEffect(() => {
    dispatch(fetchGetAllBanners(filter));
  }, [dispatch, filter]);

  const [dialogData, setDialogData] = useState({
    open: false,
    action: CRUD_ACTIONS.create,
    bannerId: null
  });

  const handleCloseDialog = () => {
    setDialogData({
      ...dialogData,
      open: false
    });
  };
  const handleOpenDialog = (bannerId, action) => {
    setDialogData({
      action,
      open: true,
      bannerId
    });
  };

  return (
    <>
      <Helmet>
        <title>Banner | HPL Shop</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <BannerEditDialog
          open={dialogData.open}
          handleClose={handleCloseDialog}
          bannerId={dialogData.bannerId}
          action={dialogData.action}
        />
        <Container maxWidth={false}>
          <BannerListToolbar
            setPage={setPage}
            numberOfItems={numberOfItems}
            setNumberOfItem={setNumberOfItem}
            setFilter={setFilter}
            handleOpenDialog={handleOpenDialog}
          />
          <Box sx={{ pt: 3 }}>
            <BannerListResults
              banners={banners}
              page={page}
              setPage={setPage}
              numberOfItems={numberOfItems}
              handleOpenDialog={handleOpenDialog}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BannerList;
