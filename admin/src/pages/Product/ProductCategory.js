import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid, Skeleton } from '@material-ui/core';
import { fetchGetCategories, selectCategories } from 'src/features/product/category/categorySlice';
import CategoryToolbar from 'src/components/Product/Category/CategoryToolbar';
import CategoryTable from 'src/components/Product/Category/CategoryTable';
import CategoryDialog from 'src/components/Product/Category/CategoryDialog';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { CRUD_ACTIONS, PRODUCT_CATEGORY_LEVEL } from 'src/configs/constants';

const ProductCategory = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useCheckAuth({ navigate, currentPage: `/app/products/category` });

  // global state
  const categories = useSelector(selectCategories);
  const isFetchingGetCategories = useSelector(
    (state) => state.categorySlice.isFetchingGetCategories
  );

  // local state
  const [dialogData, setDialogData] = useState({
    open: false,
    action: CRUD_ACTIONS.create,
    currentCategory: null
  });

  useEffect(() => {
    dispatch(fetchGetCategories());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Sản phẩm - Danh mục | Lasy Shop</title>
      </Helmet>

      <CategoryDialog
        needOpen={dialogData.open}
        action={dialogData.action}
        handleClose={() => setDialogData({ ...dialogData, open: false })}
        category={dialogData.currentCategory}
      />

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CategoryToolbar
            handleCreateButton={() =>
              setDialogData({
                open: true,
                action: CRUD_ACTIONS.create,
                currentCategory: {
                  ...dialogData.currentCategory,
                  level: PRODUCT_CATEGORY_LEVEL.LEVEL_0,
                  parentId: null
                }
              })
            }
          />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              <Grid item lg={12}>
                {isFetchingGetCategories ? (
                  <Skeleton variant="rectangular" width="100%" height={600} />
                ) : (
                  <CategoryTable
                    categories={categories}
                    openEditDialog={(category, action) =>
                      setDialogData({
                        open: true,
                        action,
                        currentCategory: category
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

export default ProductCategory;
