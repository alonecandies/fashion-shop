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
import { DeleteTwoTone as DeleteIcon, VisibilityTwoTone as ViewIcon } from '@material-ui/icons';
import DeleteAlertDialog from 'src/components/CustomDialog';
import { CONTACT_STATUS, MESSAGES } from 'src/configs/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteContact, clearMsg } from 'src/features/contact/contactSlice';
import displayToast from 'src/utils/quickDisplayToast';
import { useEffect, useState } from 'react';

const ContactListResults = ({
  pagination,
  setPagination,
  contacts,
  totalContact,
  handleOpenDialog
}) => {
  const dispatch = useDispatch();
  const handlePageSizeChange = (event) => {
    setPagination((prev) => ({ ...prev, page: 0, pageSize: event.target.value }));
  };

  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // global state
  const fetchDeleteContactMsg = useSelector((state) => state.contactSlice.fetchDeleteContactMsg);
  const isFetchingDeleteContact = useSelector(
    (state) => state.contactSlice.isFetchingDeleteContact
  );

  // local state
  const msgDeleteName = `fetchDeleteContactMsg`;
  const [currentContactId, setCurrentContactId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteButton = (contactId) => {
    setCurrentContactId(contactId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialog = () => {
    dispatch(fetchDeleteContact({ id: currentContactId }));
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    !isFetchingDeleteContact &&
      !!fetchDeleteContactMsg &&
      displayToast(fetchDeleteContactMsg, MESSAGES.DELETE_SUCCESS, null, () =>
        dispatch(clearMsg(msgDeleteName))
      );
  }, [dispatch, fetchDeleteContactMsg, isFetchingDeleteContact, msgDeleteName]);

  return (
    <Card>
      <DeleteAlertDialog
        needOpen={openDeleteDialog}
        title="Xóa liên lạc"
        content="Bạn có chắc muốn xóa liên lạc này không?"
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
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact, index) => {
                return (
                  <TableRow hover key={contact.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography color="textPrimary" variant="body1">
                          {contact.full_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.content.slice(0, 20)}...</TableCell>
                    <TableCell>{moment(contact.created_at).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>
                      {contact.status === CONTACT_STATUS.SEEN.id ? (
                        <Chip
                          label={CONTACT_STATUS.SEEN.value}
                          color="primary"
                          icon={<DoneIcon />}
                          clickable
                          // onClick={() => handleOpenStatusDialog(contact.id)}
                        />
                      ) : (
                        <Chip
                          label={CONTACT_STATUS.NOT_SEEN.value}
                          icon={<ErrorIcon />}
                          clickable
                          // onClick={() => handleOpenStatusDialog(contact.id)}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Xem">
                        <IconButton onClick={() => handleOpenDialog(contact.id)}>
                          <ViewIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xoá">
                        <IconButton onClick={() => handleDeleteButton(contact.id)}>
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
        count={totalContact}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
        page={pagination.page}
        rowsPerPage={pagination.pageSize}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ContactListResults.propTypes = {
  contacts: PropTypes.array.isRequired
};

export default ContactListResults;
