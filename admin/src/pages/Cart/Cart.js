import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetAllCarts, selectCartsData, selectTotalCart } from 'src/features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { Box, Container, Skeleton } from '@material-ui/core';
import CartListResults from 'src/components/Cart/CartListResult';
import CartToolbar from 'src/components/Cart/CartToolbar';
import CartStatusEditDialog from 'src/components/Cart/CartStatusEditDialog';

const Cart = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //check authorized
  useCheckAuth({ navigate, currentPage: `/app/carts` });

  // redux state
  const carts = useSelector(selectCartsData);
  const total = useSelector(selectTotalCart);
  const isFetchingGetAllCarts = useSelector((state) => state.cartSlice.isFetchingGetAllCarts);
  // pagination
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
    order: '',
    status: '',
    fromDate: '',
    toDate: '',
    phone: ''
  });

  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [idCartEdit, setIdCartEdit] = useState(null);
  const handleOpenStatusDialog = (cartId) => {
    setOpenStatusDialog(true);
    setIdCartEdit(cartId);
  };

  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
  };

  // call api

  useEffect(() => {
    dispatch(fetchGetAllCarts(pagination));
  }, [dispatch, pagination]);

  return (
    <>
      <Helmet>
        <title>Đơn hàng | Lasy Shop</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CartToolbar setPagination={setPagination} />
          <Box sx={{ pt: 3 }}>
            {isFetchingGetAllCarts ? (
              <Skeleton variant="rectangular" width="100%" height={600} />
            ) : (
              <CartListResults
                pagination={pagination}
                setPagination={setPagination}
                carts={carts}
                totalCart={total}
                handleOpenStatusDialog={handleOpenStatusDialog}
              />
            )}
            <CartStatusEditDialog
              isOpened={openStatusDialog}
              idCart={idCartEdit}
              handleClose={handleCloseStatusDialog}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Cart;
