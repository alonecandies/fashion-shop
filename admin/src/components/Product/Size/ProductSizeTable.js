import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip
} from '@material-ui/core';
import { EditTwoTone as EditIcon, DeleteTwoTone as DeleteIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteProductSize, clearMsg } from 'src/features/product/size/productSizeSlice';
import DeleteAlertDialog from 'src/components/CustomDialog';
import { MESSAGES } from 'src/configs/constants';
import displayToast from 'src/utils/quickDisplayToast';

export default function ProductSizeTable({ productSizes, openDialog }) {
  const dispatch = useDispatch();

  // global state
  const fetchDeleteProductSizeMsg = useSelector(
    (state) => state.productSizeSlice.fetchDeleteProductSizeMsg
  );
  const isFetchingDeleteProductSize = useSelector(
    (state) => state.productSizeSlice.isFetchingDeleteProductSize
  );

  // local state
  const [currentProductSizeId, setCurrentProductSizeId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteButton = (productSizeId) => {
    setCurrentProductSizeId(productSizeId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialog = () => {
    dispatch(fetchDeleteProductSize({ productSizeId: currentProductSizeId }));
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    !isFetchingDeleteProductSize &&
      !!fetchDeleteProductSizeMsg &&
      displayToast(fetchDeleteProductSizeMsg, MESSAGES.DELETE_SUCCESS, null, () =>
        dispatch(clearMsg(`fetchDeleteProductSizeMsg`))
      );
  }, [dispatch, fetchDeleteProductSizeMsg, isFetchingDeleteProductSize]);

  return (
    <>
      <DeleteAlertDialog
        needOpen={openDeleteDialog}
        title="Xóa size"
        content="Bạn có chắc muốn xóa size này không?"
        button1={{ title: 'Hủy', action: () => setOpenDeleteDialog(false) }}
        button2={{ title: 'Có', action: handleDeleteDialog }}
      />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!productSizes &&
                productSizes.map((productSize, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{productSize.type}</TableCell>
                      <TableCell>
                        <Tooltip title="Sửa kích cỡ">
                          <IconButton onClick={() => openDialog(productSize)}>
                            <EditIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa kích cỡ">
                          <IconButton onClick={() => handleDeleteButton(productSize.id)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
