import { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid, Skeleton } from '@material-ui/core';
import {
  fetchGetProductColors,
  selectProductColors
} from 'src/features/product/color/productColorSlice';
import ProductColorToolbar from 'src/components/Product/Color/ColorToolbar';
import ProductColorTable from 'src/components/Product/Color/ColorTable';
import ProductColorDialog from 'src/components/Product/Color/ColorDialog';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { CRUD_ACTIONS } from 'src/configs/constants';

const ProductColor = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useCheckAuth({ navigate, currentPage: `/app/products/color` });

  // global state
  const productColors = useSelector(selectProductColors);
  const isFetchingGetProductColors = useSelector(
    (state) => state.productColorSlice.isFetchingGetProductColors
  );

  // local state
  const [dialogData, setDialogData] = useState({
    open: false,
    action: CRUD_ACTIONS.create,
    currentProductColor: null
  });

  const reloadData = useCallback(() => {
    dispatch(fetchGetProductColors());
  }, [dispatch]);

  useEffect(() => {
    reloadData();
  }, [dispatch, reloadData]);

  return (
    <>
      <Helmet>
        <title>Sản phẩm - Màu sắc | HPL Shop</title>
      </Helmet>

      <ProductColorDialog
        needOpen={dialogData.open}
        action={dialogData.action}
        handleClose={() => setDialogData({ ...dialogData, open: false })}
        productColor={dialogData.currentProductColor}
      />

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ProductColorToolbar
            handleCreateButton={() => setDialogData({ open: true, action: CRUD_ACTIONS.create })}
          />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              <Grid item lg={12}>
                {isFetchingGetProductColors ? (
                  <Skeleton variant="rectangular" width="100%" height={600} />
                ) : (
                  <ProductColorTable
                    productColors={productColors}
                    openDialog={(productColor) =>
                      setDialogData({
                        open: true,
                        action: CRUD_ACTIONS.update,
                        currentProductColor: productColor
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

export default ProductColor;
