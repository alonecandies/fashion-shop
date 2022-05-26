import { Box, Grid, Pagination } from '@material-ui/core';
import BannerCard from 'src/components/Banner/BannerCard';
import { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteAlertDialog from 'src/components/CustomDialog';
import { fetchDeleteBanner, selectBannersData } from 'src/features/banner/bannerSlice';
import { useDispatch, useSelector } from 'react-redux';

const BannerListResults = ({ banners, page, numberOfItems, setPage, handleOpenDialog }) => {
  const dispatch = useDispatch();
  const selectBanners = useSelector(selectBannersData);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentBannerId, setCurrentBannerId] = useState(null);
  const handleDeleteButton = (bannerId) => {
    setCurrentBannerId(bannerId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialog = () => {
    dispatch(fetchDeleteBanner({ id: currentBannerId }));
    if (page >= Math.ceil(selectBanners.length / numberOfItems) && page !== 1) {
      setPage((page) => page - 1);
    }
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <DeleteAlertDialog
        needOpen={openDeleteDialog}
        title="Xóa Banner"
        content="Bạn có chắc muốn xóa banner này không?"
        button1={{ title: 'Hủy', action: () => setOpenDeleteDialog(false) }}
        button2={{ title: 'Có', action: handleDeleteDialog }}
      />
      <Box>
        <Grid container spacing={3}>
          {!!banners &&
            banners.slice(numberOfItems * (page - 1), numberOfItems * page).map((banner) => (
              <Grid item key={banner.id} lg={4} md={6} sm={6} xs={12}>
                <BannerCard
                  banner={banner}
                  page={page}
                  setPage={setPage}
                  numberOfItems={numberOfItems}
                  handleDeleteButton={handleDeleteButton}
                  handleOpenDialog={handleOpenDialog}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          color="primary"
          count={Math.ceil(banners.length / numberOfItems)}
          size="small"
          page={page}
          onChange={(e, page) => {
            setPage(page);
          }}
        />
      </Box>
    </>
  );
};
BannerListResults.propTypes = {
  banners: PropTypes.array.isRequired
};

export default BannerListResults;
