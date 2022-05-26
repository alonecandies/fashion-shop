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
  Typography
} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import EditIcon from '@material-ui/icons/Edit';

import { USER_STATUS } from 'src/configs/constants';

const UserListResults = ({
  pagination,
  setPagination,
  users,
  totalUser,
  handleOpenEdit,
  handleOpenStatusDialog
}) => {
  const handlePageSizeChange = (event) => {
    setPagination((prev) => ({ ...prev, page: 0, pageSize: event.target.value }));
  };

  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Họ tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow hover key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography color="textPrimary" variant="body1">
                        {user.full_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{moment(user.created_at).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>
                    {user.status === USER_STATUS.ACTIVE.id ? (
                      <Chip
                        label={USER_STATUS.ACTIVE.value}
                        color="primary"
                        icon={<DoneIcon />}
                        clickable
                        onClick={() => handleOpenStatusDialog(user.id)}
                      />
                    ) : (
                      <Chip
                        label={USER_STATUS.NON_ACTIVE.value}
                        icon={<ErrorIcon />}
                        clickable
                        onClick={() => handleOpenStatusDialog(user.id)}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Chỉnh sửa thông tin">
                      <IconButton onClick={() => handleOpenEdit(user.id)}>
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalUser}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
        page={pagination.page}
        rowsPerPage={pagination.pageSize}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

UserListResults.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserListResults;
