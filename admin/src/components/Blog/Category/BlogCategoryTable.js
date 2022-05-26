import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Box,
  Card
} from '@material-ui/core';
import { EditTwoTone as EditIcon, DeleteTwoTone as DeleteIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteBlogCategory, clearMsg } from 'src/features/blog/category/blogCategorySlice';
import DeleteAlertDialog from 'src/components/CustomDialog';
import { MESSAGES } from 'src/configs/constants';
import displayToast from 'src/utils/quickDisplayToast';

export default function BlogCategoryTable({ blogCategories, openDialog }) {
  const dispatch = useDispatch();

  // global state
  const fetchDeleteBlogCategoryMsg = useSelector(
    (state) => state.blogCategorySlice.fetchDeleteBlogCategoryMsg
  );
  const isFetchingDeleteBlogCategory = useSelector(
    (state) => state.blogCategorySlice.isFetchingDeleteBlogCategory
  );

  // local state
  const [currentBlogCategoryId, setCurrentBlogCategoryId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteButton = (blogCategoryId) => {
    setCurrentBlogCategoryId(blogCategoryId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialog = () => {
    dispatch(fetchDeleteBlogCategory({ id: currentBlogCategoryId }));
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    !isFetchingDeleteBlogCategory &&
      !!fetchDeleteBlogCategoryMsg &&
      displayToast(fetchDeleteBlogCategoryMsg, MESSAGES.DELETE_SUCCESS, null, () =>
        dispatch(clearMsg(`fetchDeleteBlogCategoryMsg`))
      );
  }, [dispatch, fetchDeleteBlogCategoryMsg, isFetchingDeleteBlogCategory]);

  return (
    <Card>
      <DeleteAlertDialog
        needOpen={openDeleteDialog}
        title="Xóa danh mục"
        content="Bạn có chắc muốn xóa danh mục này không?"
        button1={{ title: 'Hủy', action: () => setOpenDeleteDialog(false) }}
        button2={{ title: 'Có', action: handleDeleteDialog }}
      />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!blogCategories &&
                blogCategories.map((blogCategory, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{blogCategory.name}</TableCell>
                      <TableCell>
                        <Tooltip title="Chỉnh sửa">
                          <IconButton onClick={() => openDialog(blogCategory)}>
                            <EditIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa">
                          <IconButton onClick={() => handleDeleteButton(blogCategory.id)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}
