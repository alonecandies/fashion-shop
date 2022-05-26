import { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Stack,
  useTheme
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDeleteDialog from 'src/components/CustomDialog';
import DialogSelect from './DialogSelect';
import {
  StopRounded as SquareIcon,
  VisibilityTwoTone as ViewIcon,
  EditTwoTone as EditIcon,
  DeleteTwoTone as DeleteIcon,
  ErrorOutlineTwoTone as InfoIcon,
  CheckCircleOutlineTwoTone as CheckIcon
} from '@material-ui/icons';
import { CRUD_ACTIONS, PRODUCT_STATUS, MESSAGES } from 'src/configs/constants';
import {
  fetchDeleteProduct,
  fetchUpdateStatusProduct,
  fetchUpdateStock,
  fetchGetProductById,
  selectCurrentProduct,
  clearMsg
} from 'src/features/product/product/productSlice';
import displayToast from 'src/utils/quickDisplayToast';
import ProductDetailDialog from './ProductDetail';
import ProductEditDialog from './ProductEditDialog';

const handleProductStatus = (productStatus) => {
  switch (productStatus) {
    case PRODUCT_STATUS.ACTIVE.key:
      return [PRODUCT_STATUS.ACTIVE.value, 'primary', 'filled', <CheckIcon />];
    case PRODUCT_STATUS.INACTIVE.key:
      return [PRODUCT_STATUS.INACTIVE.value, 'default', 'filled', <InfoIcon />];
    default:
      return [PRODUCT_STATUS.INACTIVE.value, 'primary', 'outlined'];
  }
};

const ProductTable = ({
  products,
  productsCount,
  filter,
  setFilter,
  categories,
  tags,
  colors,
  sizes
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // global state
  const isFetchingDeleteProduct = useSelector(
    (state) => state.productSlice.isFetchingDeleteProduct
  );
  const fetchDeleteProductMsg = useSelector((state) => state.productSlice.fetchDeleteProductMsg);
  const isFetchingUpdateStock = useSelector((state) => state.productSlice.isFetchingUpdateStock);
  const fetchUpdateStockMsg = useSelector((state) => state.productSlice.fetchUpdateStockMsg);
  const isFetchingUpdateStatusProduct = useSelector(
    (state) => state.productSlice.isFetchingUpdateStatusProduct
  );
  const fetchUpdateStatusProductMsg = useSelector(
    (state) => state.productSlice.fetchUpdateStatusProductMsg
  );
  const currentProduct = useSelector(selectCurrentProduct);
  const isFetchingGetProductById = useSelector(
    (state) => state.productSlice.isFetchingGetProductById
  );

  // local state
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [productFocus, setProductFocus] = useState({});
  const [openChangeStatusDialog, setOpenChangeStatusDialog] = useState(false);
  const [openChangeStockDialog, setOpenChangeStockDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleChangePage = (event, newPage) => {
    setFilter((parentFilter) => ({ ...parentFilter, page: newPage }));
  };

  const handleChangeRowsPerPage = (event, newPageSize) => {
    setFilter((parentFilter) => ({ ...parentFilter, pageSize: event.target.value, page: 0 }));
  };

  const handleButtonDelete = (productId) => {
    setProductFocus({ ...productFocus, id: productId });
    setOpenConfirmDialog(true);
  };

  const handleDeleteProduct = () => {
    dispatch(fetchDeleteProduct({ productId: productFocus.id, filter }));
    setOpenConfirmDialog(false);
  };

  const handleButtonChangeStock = (productId, outOfStock) => {
    setProductFocus({ ...productFocus, id: productId, outOfStock });
    setOpenChangeStockDialog(true);
  };

  const handleChangeStock = (outOfStock) => {
    dispatch(fetchUpdateStock({ ...productFocus, outOfStock }));
    setOpenChangeStockDialog(false);
  };

  const handleButtonChangeStatus = (productId, status) => {
    setProductFocus({ ...productFocus, id: productId, status });
    setOpenChangeStatusDialog(true);
  };

  const handleChangeStatus = (status) => {
    dispatch(fetchUpdateStatusProduct({ ...productFocus, status }));
    setOpenChangeStatusDialog(false);
  };

  const handleButtonView = (productId) => {
    dispatch(fetchGetProductById({ productId }));
    setOpenDetailDialog(true);
  };

  const handleButtonEdit = (productId) => {
    dispatch(fetchGetProductById({ productId }));
    setOpenEditDialog(true);
  };

  useEffect(() => {
    !isFetchingDeleteProduct &&
      !!fetchDeleteProductMsg &&
      displayToast(fetchDeleteProductMsg, MESSAGES.DELETE_SUCCESS, null, () =>
        dispatch(clearMsg(`fetchDeleteProductMsg`))
      );
  }, [dispatch, fetchDeleteProductMsg, isFetchingDeleteProduct]);

  useEffect(() => {
    !isFetchingUpdateStock &&
      !!fetchUpdateStockMsg &&
      displayToast(fetchUpdateStockMsg, MESSAGES.UPDATE_SUCCESS, null, () =>
        dispatch(clearMsg(`fetchUpdateStockMsg`))
      );
  }, [dispatch, fetchUpdateStockMsg, isFetchingUpdateStock]);

  useEffect(() => {
    !isFetchingUpdateStatusProduct &&
      !!fetchUpdateStatusProductMsg &&
      displayToast(fetchUpdateStatusProductMsg, MESSAGES.UPDATE_SUCCESS, null, () =>
        dispatch(clearMsg(`fetchUpdateStatusProductMsg`))
      );
  }, [dispatch, fetchUpdateStatusProductMsg, isFetchingUpdateStatusProduct]);

  return (
    <>
      {openEditDialog && (
        <ProductEditDialog
          needOpen={openEditDialog}
          action={CRUD_ACTIONS.update}
          handleClose={() => setOpenEditDialog(false)}
          filter={filter}
          productId={productFocus.id}
          product={currentProduct}
          categories={categories}
          tags={tags}
          colors={colors}
          sizes={sizes}
        />
      )}

      {openConfirmDialog && (
        <ConfirmDeleteDialog
          needOpen={openConfirmDialog}
          setNeedOpen={setOpenConfirmDialog}
          title="Xóa sản phẩm"
          content="Bạn có chắc muốn xóa sản phẩm này không?"
          button1={{ title: 'Hủy', action: () => setOpenConfirmDialog(false) }}
          button2={{ title: 'Có', action: handleDeleteProduct }}
        />
      )}

      {openChangeStockDialog && (
        <DialogSelect
          title="Thay đổi trạng thái kho"
          open={openChangeStockDialog}
          setOpen={setOpenChangeStockDialog}
          action={handleChangeStock}
          data={[
            { key: 0, value: 'Còn hàng' },
            { key: 1, value: 'Hết hàng' }
          ]}
          defaultValue={productFocus.outOfStock}
        />
      )}

      {openChangeStatusDialog && (
        <DialogSelect
          title="Thay đổi trạng sản phẩm"
          open={openChangeStatusDialog}
          setOpen={setOpenChangeStatusDialog}
          action={handleChangeStatus}
          data={Object.entries(PRODUCT_STATUS).map((item) => item[1])}
          defaultValue={productFocus.status}
        />
      )}

      {!isFetchingGetProductById && !!currentProduct && openDetailDialog && (
        <ProductDetailDialog
          open={openDetailDialog}
          setOpen={setOpenDetailDialog}
          product={currentProduct}
        />
      )}

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên SP</TableCell>
                <TableCell>Mã SP</TableCell>
                <TableCell align="right">Giá</TableCell>
                <TableCell align="right">Sale</TableCell>
                <TableCell>Số hàng</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell align="center">Tag</TableCell>
                <TableCell align="right">Màu sắc</TableCell>
                <TableCell align="right">Kích cỡ</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!products &&
                products.map((product, index) => {
                  const handledStatus = handleProductStatus(product.status);

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>{index + filter.pageSize * filter.page + 1}</TableCell>
                      <TableCell>
                        <Typography noWrap>{product.title}</Typography>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}> {product.code_product}</TableCell>
                      <TableCell align="right">
                        {!!product.web_price &&
                          product.web_price.toLocaleString('vi', {
                            style: 'currency',
                            currency: 'VND'
                          })}
                      </TableCell>
                      <TableCell align="right" sx={{ color: theme.palette.success.main }}>
                        {`${product.sale}%`}
                      </TableCell>
                      <TableCell align="center">
                        {product.out_of_stock ? (
                          <Chip
                            label="Hết hàng"
                            size="small"
                            variant="outlined"
                            color="warning"
                            icon={<InfoIcon />}
                            onClick={() =>
                              handleButtonChangeStock(product.id, product.out_of_stock)
                            }
                          />
                        ) : (
                          <Chip
                            label="Còn hàng"
                            size="small"
                            variant="outlined"
                            color="success"
                            icon={<CheckIcon />}
                            onClick={() =>
                              handleButtonChangeStock(product.id, product.out_of_stock)
                            }
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {!!product.product_category_name && (
                          <Chip
                            key={index}
                            color="info"
                            variant="outlined"
                            label={product.product_category_name}
                            size="small"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {!!product.tags?.length &&
                          product.tags.map((tag, index) => (
                            <Chip
                              key={index}
                              label={tag.name}
                              size="small"
                              sx={{ mr: 0.5, mb: 0.25 }}
                            />
                          ))}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" justifyContent="flex-end">
                          {!!product.colors?.length &&
                            product.colors.map((color, index) => (
                              <SquareIcon key={index} sx={{ color: color.color }} />
                            ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" justifyContent="flex-end" spacing={1}>
                          {!!product.sizes?.length &&
                            product.sizes.map((size, index) => (
                              <Typography key={index}>{size.type}</Typography>
                            ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={handledStatus[0]}
                          color={handledStatus[1]}
                          variant={handledStatus[2]}
                          icon={handledStatus[3]}
                          onClick={() => handleButtonChangeStatus(product.id, product.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Tooltip title="Xem sản phẩm">
                            <IconButton onClick={() => handleButtonView(product.id)}>
                              <ViewIcon color="info" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Chỉnh sửa sản phẩm">
                            <IconButton onClick={() => handleButtonEdit(product.id)}>
                              <EditIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xóa sản phẩm">
                            <IconButton onClick={() => handleButtonDelete(product.id)}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={productsCount}
          rowsPerPage={filter.pageSize}
          page={filter.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default ProductTable;
