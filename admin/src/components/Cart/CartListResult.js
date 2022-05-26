import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';

import DeleteAlertDialog from 'src/components/CustomDialog';
import { MESSAGES } from 'src/configs/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteCart, clearMsg } from 'src/features/cart/cartSlice';
import displayToast from 'src/utils/quickDisplayToast';
import { useEffect, useState } from 'react';
import CartRow from './CartRow';

const CartListResults = ({
  pagination,
  setPagination,
  carts,
  totalCart,
  handleOpenStatusDialog
}) => {
  const dispatch = useDispatch();
  const handlePageSizeChange = (event) => {
    setPagination((prev) => ({ ...prev, page: 0, pageSize: event.target.value }));
  };

  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // global state
  const fetchDeleteCartMsg = useSelector((state) => state.cartSlice.fetchDeleteCartMsg);
  const isFetchingDeleteCart = useSelector((state) => state.cartSlice.isFetchingDeleteCart);
  const fetchUpdateCartStatusMsg = useSelector((state) => state.cartSlice.fetchUpdateCartStatusMsg);
  const isFetchingUpdateCartStatus = useSelector(
    (state) => state.cartSlice.isFetchingUpdateCartStatus
  );

  // local state
  const msgDeleteName = `fetchDeleteCartMsg`;
  const msgUpdateStatusName = `fetchUpdateCartStatusMsg`;
  const [currentCartId, setCurrentCartId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteButton = (cartId) => {
    setCurrentCartId(cartId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialog = () => {
    dispatch(fetchDeleteCart({ id: currentCartId }));
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    !isFetchingDeleteCart &&
      !!fetchDeleteCartMsg &&
      displayToast(fetchDeleteCartMsg, MESSAGES.DELETE_SUCCESS, null, () =>
        dispatch(clearMsg(msgDeleteName))
      );
  }, [dispatch, fetchDeleteCartMsg, isFetchingDeleteCart, msgDeleteName]);

  useEffect(() => {
    !isFetchingUpdateCartStatus &&
      !!fetchUpdateCartStatusMsg &&
      displayToast(fetchUpdateCartStatusMsg, MESSAGES.UPDATE_SUCCESS, null, () =>
        dispatch(clearMsg(msgUpdateStatusName))
      );
  }, [dispatch, fetchUpdateCartStatusMsg, isFetchingUpdateCartStatus, msgUpdateStatusName]);

  return (
    <Card>
      <DeleteAlertDialog
        needOpen={openDeleteDialog}
        title="Xóa đơn hàng"
        content="Bạn có chắc muốn xóa đơn hàng này không?"
        button1={{ title: 'Hủy', action: () => setOpenDeleteDialog(false) }}
        button2={{ title: 'Có', action: handleDeleteDialog }}
      />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>STT</TableCell>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Ngày đặt</TableCell>
                <TableCell>Trạng thái đơn</TableCell>
                <TableCell>Ngày cập nhật</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carts.map((cart, index) => (
                <CartRow
                  key={index}
                  cart={cart}
                  index={index}
                  handleDeleteButton={handleDeleteButton}
                  handleOpenStatusDialog={handleOpenStatusDialog}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalCart}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
        page={pagination.page}
        rowsPerPage={pagination.pageSize}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CartListResults.propTypes = {
  carts: PropTypes.array.isRequired
};

export default CartListResults;
