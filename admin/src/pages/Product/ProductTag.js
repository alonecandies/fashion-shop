import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid, Skeleton } from '@material-ui/core';
import { fetchGetProductTags, selectProductTags } from 'src/features/product/tag/producTagSlice';
import ProductTagToolbar from 'src/components/Product/Tag/ProductTagToolbar';
import ProductTagTable from 'src/components/Product/Tag/ProductTagTable';
import ProductTagDialog from 'src/components/Product/Tag/ProductTagDialog';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { CRUD_ACTIONS } from 'src/configs/constants';

const ProductTag = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useCheckAuth({ navigate, currentPage: `/app/products/tag` });

  // global state
  const productTags = useSelector(selectProductTags);
  const isFetchingGetProductTags = useSelector(
    (state) => state.productTagSlice.isFetchingGetProductTags
  );

  // local state
  const [filter, setFilter] = useState({
    name: ''
  });
  const [dialogData, setDialogData] = useState({
    open: false,
    action: CRUD_ACTIONS.create,
    currentProductTag: null
  });

  useEffect(() => {
    dispatch(fetchGetProductTags(filter));
  }, [dispatch, filter]);

  return (
    <>
      <Helmet>
        <title>Sản phẩm - Tag | Lasy Shop</title>
      </Helmet>

      <ProductTagDialog
        needOpen={dialogData.open}
        action={dialogData.action}
        handleClose={() => setDialogData({ ...dialogData, open: false })}
        productTag={dialogData.currentProductTag}
      />

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ProductTagToolbar
            handleCreateButton={() => setDialogData({ open: true, action: CRUD_ACTIONS.create })}
            filter={filter}
            setFilter={setFilter}
          />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              <Grid item lg={12}>
                {isFetchingGetProductTags ? (
                  <Skeleton variant="rectangular" width="100%" height={600} />
                ) : (
                  <ProductTagTable
                    productTags={productTags}
                    openDialog={(productTag) =>
                      setDialogData({
                        open: true,
                        action: CRUD_ACTIONS.update,
                        currentProductTag: productTag
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

export default ProductTag;
