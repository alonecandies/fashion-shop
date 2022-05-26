import { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetAllProducts,
  selectProducts,
  selectProductsCount
} from 'src/features/product/product/productSlice';
import { fetchGetCategories, selectCategories } from 'src/features/product/category/categorySlice';
import { fetchGetProductTags, selectProductTags } from 'src/features/product/tag/producTagSlice';
import {
  fetchGetProductColors,
  selectProductColors
} from 'src/features/product/color/productColorSlice';
import {
  fetchGetProductSizes,
  selectProductSizes
} from 'src/features/product/size/productSizeSlice';
import { Box, Container, Grid, Skeleton } from '@material-ui/core';
import ProductToolbar from 'src/components/Product/List/ProductToolbar';
import ProductTable from 'src/components/Product/List/ProductTable';
import CreateProductDialog from 'src/components/Product/List/ProductEditDialog';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { useNavigate } from 'react-router-dom';
import { CRUD_ACTIONS } from 'src/configs/constants';

const handleCategories = (categories) => {
  const result = [];
  categories.forEach((categoryLv0) => {
    result.push({ id: categoryLv0.id, name: categoryLv0.name, level: 0 });
    if (categoryLv0.category_level_1.length > 0) {
      categoryLv0.category_level_1.forEach((categoryLv1) => {
        result.push({ id: categoryLv1.id, name: categoryLv1.name, level: 1 });
        if (categoryLv1.category_level_2.length > 0) {
          categoryLv1.category_level_2.forEach((categoryLv2) => {
            result.push({ id: categoryLv2.id, name: categoryLv2.name, level: 2 });
          });
        }
      });
    }
  });

  return result;
};

const ProductList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useCheckAuth({ navigate, currentPage: `/app/products/list` });

  // global state
  const productsCount = useSelector(selectProductsCount);
  const products = useSelector(selectProducts);
  const isFetchingGetAllProducts = useSelector(
    (state) => state.productSlice.isFetchingGetAllProducts
  );
  const categories = useSelector(selectCategories);
  const productTags = useSelector(selectProductTags);
  const productColors = useSelector(selectProductColors);
  const productSizes = useSelector(selectProductSizes);

  // local state
  const handledCategories = useMemo(() => handleCategories(categories), [categories]);
  const [filter, setFilter] = useState({
    category: {
      id: '',
      level: '',
      name: ''
    },
    level: '',
    name: '',
    code: '',
    order: '',
    status: '',
    type: '',
    tagId: '',
    page: 0,
    pageSize: 10
  });
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchGetAllProducts({ ...filter }));
  }, [dispatch, filter]);

  useEffect(() => {
    dispatch(fetchGetCategories());
    dispatch(fetchGetProductTags());
    dispatch(fetchGetProductColors());
    dispatch(fetchGetProductSizes());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Sản phẩm - Danh sách | Lasy Shop</title>
      </Helmet>

      <CreateProductDialog
        needOpen={openCreateProductDialog}
        action={CRUD_ACTIONS.create}
        filter={filter}
        handleClose={() => setOpenCreateProductDialog(false)}
        categories={handledCategories}
        tags={productTags}
        colors={productColors}
        sizes={productSizes}
      />

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ProductToolbar
            categories={handledCategories}
            tags={productTags}
            filter={filter}
            setFilter={setFilter}
            handleCreateButton={() =>
              setOpenCreateProductDialog({ open: true, action: CRUD_ACTIONS.create })
            }
          />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              <Grid item lg={12}>
                {isFetchingGetAllProducts ? (
                  <Skeleton variant="rectangular" width={'100%'} height={600} />
                ) : (
                  <ProductTable
                    products={products}
                    productsCount={productsCount}
                    filter={filter}
                    setFilter={setFilter}
                    setParams={setFilter}
                    setDialogData={setOpenCreateProductDialog}
                    categories={handledCategories}
                    tags={productTags}
                    colors={productColors}
                    sizes={productSizes}
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

export default ProductList;
