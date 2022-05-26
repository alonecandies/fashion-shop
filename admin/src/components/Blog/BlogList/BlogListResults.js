import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  IconButton,
  Typography,
  Chip
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import { EditTwoTone as EditIcon, DeleteTwoTone as DeleteIcon } from '@material-ui/icons';
import DeleteAlertDialog from 'src/components/CustomDialog';
import { BLOG_STATUS, CRUD_ACTIONS, MESSAGES } from 'src/configs/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteBlog, clearMsg } from 'src/features/blog/blogSlice';
import displayToast from 'src/utils/quickDisplayToast';
import { useEffect, useState } from 'react';

const BlogListResults = ({
  pagination,
  setPagination,
  blogs,
  totalBlog,
  blogCategories,
  handleOpenDialog,
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
  const fetchDeleteBlogMsg = useSelector((state) => state.blogSlice.fetchDeleteBlogMsg);
  const isFetchingDeleteBlog = useSelector((state) => state.blogSlice.isFetchingDeleteBlog);
  const fetchUpdateBlogStatusMsg = useSelector((state) => state.blogSlice.fetchUpdateBlogStatusMsg);
  const isFetchingUpdateBlogStatus = useSelector(
    (state) => state.blogSlice.isFetchingUpdateBlogStatus
  );

  // local state
  const msgDeleteName = `fetchDeleteBlogMsg`;
  const msgUpdateStatusName = `fetchUpdateBlogStatusMsg`;
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteButton = (blogId) => {
    setCurrentBlogId(blogId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialog = () => {
    dispatch(fetchDeleteBlog({ id: currentBlogId }));
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    !isFetchingDeleteBlog &&
      !!fetchDeleteBlogMsg &&
      displayToast(fetchDeleteBlogMsg, MESSAGES.DELETE_SUCCESS, null, () =>
        dispatch(clearMsg(msgDeleteName))
      );
  }, [dispatch, fetchDeleteBlogMsg, isFetchingDeleteBlog, msgDeleteName]);

  useEffect(() => {
    !isFetchingUpdateBlogStatus &&
      !!fetchUpdateBlogStatusMsg &&
      displayToast(fetchUpdateBlogStatusMsg, MESSAGES.UPDATE_SUCCESS, null, () =>
        dispatch(clearMsg(msgUpdateStatusName))
      );
  }, [dispatch, fetchUpdateBlogStatusMsg, isFetchingUpdateBlogStatus, msgUpdateStatusName]);

  return (
    <Card>
      <DeleteAlertDialog
        needOpen={openDeleteDialog}
        title="Xóa blog"
        content="Bạn có chắc muốn xóa blog này không?"
        button1={{ title: 'Hủy', action: () => setOpenDeleteDialog(false) }}
        button2={{ title: 'Có', action: handleDeleteDialog }}
      />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tiêu đề</TableCell>
                <TableCell>Lượt xem</TableCell>
                <TableCell>Số lượt like</TableCell>
                <TableCell>Danh mục blog</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map((blog, index) => {
                const category = blogCategories.find((item) => item.id === blog.blog_category_id);
                return (
                  <TableRow hover key={blog.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography color="textPrimary" variant="body1">
                          {blog.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{blog.viewd}</TableCell>
                    <TableCell align="center">{blog.number_of_likes}</TableCell>
                    <TableCell>
                      <Chip label={category?.name} color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>{moment(blog.created_at).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>
                      {blog.status === BLOG_STATUS.PUBLIC.id ? (
                        <Chip
                          label={BLOG_STATUS.PUBLIC.value}
                          color="primary"
                          icon={<DoneIcon />}
                          clickable
                          onClick={() => handleOpenStatusDialog(blog.id)}
                        />
                      ) : (
                        <Chip
                          label={BLOG_STATUS.HIDE.value}
                          icon={<ErrorIcon />}
                          clickable
                          onClick={() => handleOpenStatusDialog(blog.id)}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Chỉnh sửa thông tin">
                        <IconButton onClick={() => handleOpenDialog(blog.id, CRUD_ACTIONS.update)}>
                          <EditIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xoá">
                        <IconButton onClick={() => handleDeleteButton(blog.id)}>
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
      <TablePagination
        component="div"
        count={totalBlog}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
        page={pagination.page}
        rowsPerPage={pagination.pageSize}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

BlogListResults.propTypes = {
  blogs: PropTypes.array.isRequired
};

export default BlogListResults;
