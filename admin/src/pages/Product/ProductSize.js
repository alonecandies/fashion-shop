import { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid, Skeleton } from '@material-ui/core';
import {
  fetchGetProductSizes,
  selectProductSizes
} from 'src/features/product/size/productSizeSlice';
import ProductSizeToolbar from 'src/components/Product/Size/ProductSizeToolbar';
import ProductSizeTable from 'src/components/Product/Size/ProductSizeTable';
import ProductSizeDialog from 'src/components/Product/Size/ProductSizeDialog';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { CRUD_ACTIONS } from 'src/configs/constants';

const ProductSize = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useCheckAuth({ navigate, currentPage: `/app/products/size` });

  // global state
  const productSizes = useSelector(selectProductSizes);
  const isFetchingGetProductSizes = useSelector(
    (state) => state.productSizeSlice.isFetchingGetProductSizes
  );

  // local state
  const [dialogData, setDialogData] = useState({
    open: false,
    action: CRUD_ACTIONS.create,
    currentProductSize: null
  });

  const reloadData = useCallback(() => {
    dispatch(fetchGetProductSizes());
  }, [dispatch]);

  useEffect(() => {
    reloadData();
  }, [dispatch, reloadData]);

  return (
    <>
      <Helmet>
        <title>Sản phẩm - Kích cỡ | Lasy Shop</title>
      </Helmet>

      <ProductSizeDialog
        needOpen={dialogData.open}
        action={dialogData.action}
        handleClose={() => setDialogData({ ...dialogData, open: false })}
        productSize={dialogData.currentProductSize}
      />

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ProductSizeToolbar
            handleCreateButton={() => setDialogData({ open: true, action: CRUD_ACTIONS.create })}
          />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              <Grid item lg={12}>
                {isFetchingGetProductSizes ? (
                  <Skeleton variant="rectangular" width="100%" height={600} />
                ) : (
                  <ProductSizeTable
                    productSizes={productSizes}
                    openDialog={(productSize) =>
                      setDialogData({
                        open: true,
                        action: CRUD_ACTIONS.update,
                        currentProductSize: productSize
                      })
                    }
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductSize;
