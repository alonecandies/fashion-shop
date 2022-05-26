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
  Typography,
  Box,
  Tooltip
} from '@material-ui/core';
import {
  EditTwoTone as EditIcon,
  DeleteTwoTone as DeleteIcon,
  Stop as SquareIcon
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteProductColor, clearMsg } from 'src/features/product/color/productColorSlice';
import DeleteAlertDialog from 'src/components/CustomDialog';
import { MESSAGES } from 'src/configs/constants';
import displayToast from 'src/utils/quickDisplayToast';

export default function ProductColorTable({ productColors, openDialog }) {
  const dispatch = useDispatch();

  // global state
  const fetchDeleteProductColorMsg = useSelector(
    (state) => state.productColorSlice.fetchDeleteProductColorMsg
  );
  const isFetchingDeleteProductColor = useSelector(
    (state) => state.productColorSlice.isFetchingDeleteProductColor
  );

  // local state
  const [currentProductColorId, setCurrentProductColorId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteButton = (categoryId) => {
    setCurrentProductColorId(categoryId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialog = () => {
    dispatch(fetchDeleteProductColor({ productColorId: currentProductColorId }));
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    !isFetchingDeleteProductColor &&
      !!fetchDeleteProductColorMsg &&
      displayToast(fetchDeleteProductColorMsg, MESSAGES.DELETE_SUCCESS, null, () =>
        dispatch(clearMsg(`fetchDeleteProductColorMsg`))
      );
  }, [dispatch, fetchDeleteProductColorMsg, isFetchingDeleteProductColor]);

  return (
    <>
      <DeleteAlertDialog
        needOpen={openDeleteDialog}
        title="Xóa màu sắc"
        content="Bạn có chắc muốn xóa màu sắc này không?"
        button1={{ title: 'Hủy', action: () => setOpenDeleteDialog(false) }}
        button2={{ title: 'Có', action: handleDeleteDialog }}
      />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Màu</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!productColors &&
                productColors.map((productColor, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography sx={{ mr: 1 }}>{productColor.color.toUpperCase()}</Typography>
                          <SquareIcon sx={{ color: productColor.color }} />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Sửa màu sắc">
                          <IconButton onClick={() => openDialog(productColor)}>
                            <EditIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa màu sắc">
                          <IconButton onClick={() => handleDeleteButton(productColor.id)}>
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
