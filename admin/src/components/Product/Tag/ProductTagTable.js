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
import { fetchDeleteProductTag, clearMsg } from 'src/features/product/tag/producTagSlice';
import DeleteAlertDialog from 'src/components/CustomDialog';
import { MESSAGES } from 'src/configs/constants';
import displayToast from 'src/utils/quickDisplayToast';

export default function ProductTagTable({ productTags, openDialog }) {
  const dispatch = useDispatch();

  // global state
  const fetchDeleteProductTagMsg = useSelector(
    (state) => state.productTagSlice.fetchDeleteProductTagMsg
  );
  const isFetchingDeleteProductTag = useSelector(
    (state) => state.productTagSlice.isFetchingDeleteProductTag
  );

  // local state
  const [currentProductTagId, setCurrentProductTagId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteButton = (productTagId) => {
    setCurrentProductTagId(productTagId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialog = () => {
    dispatch(fetchDeleteProductTag({ productTagId: currentProductTagId }));
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    !isFetchingDeleteProductTag &&
      !!fetchDeleteProductTagMsg &&
      displayToast(fetchDeleteProductTagMsg, MESSAGES.DELETE_SUCCESS, null, () =>
        dispatch(clearMsg(`fetchDeleteProductTagMsg`))
      );
  }, [dispatch, fetchDeleteProductTagMsg, isFetchingDeleteProductTag]);

  return (
    <>
      <DeleteAlertDialog
        needOpen={openDeleteDialog}
        title="Xóa danh mục"
        content="Bạn có chắc muốn xóa danh mục này không?"
        button1={{ title: 'Hủy', action: () => setOpenDeleteDialog(false) }}
        button2={{ title: 'Có', action: handleDeleteDialog }}
      />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!productTags &&
                productTags.map((productTag, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{productTag.name}</TableCell>
                      <TableCell>
                        <Tooltip title="Chỉnh sửa tag">
                          <IconButton onClick={() => openDialog(productTag)}>
                            <EditIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa tag">
                          <IconButton onClick={() => handleDeleteButton(productTag.id)}>
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
