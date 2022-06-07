import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetAllContacts,
  selectContactsData,
  selectTotalContact
} from 'src/features/contact/contactSlice';
import { useNavigate } from 'react-router-dom';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { Box, Container, Skeleton } from '@material-ui/core';
import ContactToolbar from 'src/components/Contact/ContactListToolbar';
import ContactListResults from 'src/components/Contact/ContactListResults';
import ContactDetailDialog from 'src/components/Contact/ContactDetailDialog';

const Contact = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //check authorized
  useCheckAuth({ navigate, currentPage: `/app/contacts` });

  // redux state
  const contacts = useSelector(selectContactsData);
  const total = useSelector(selectTotalContact);
  const isFetchingGetAllContacts = useSelector(
    (state) => state.contactSlice.isFetchingGetAllContacts
  );
  // pagination
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
    name: '',
    phone: '',
    is_checked: ''
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [idContactEdit, setIdContactEdit] = useState(null);
  const handleOpenDialog = (contactId) => {
    setOpenDialog(true);
    setIdContactEdit(contactId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // call api
  useEffect(() => {
    dispatch(fetchGetAllContacts(pagination));
  }, [dispatch, pagination]);

  return (
    <>
      <Helmet>
        <title>Liên hệ | HPL Shop</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ContactToolbar setPagination={setPagination} />
          <ContactDetailDialog
            isOpened={openDialog}
            idContact={idContactEdit}
            handleClose={handleCloseDialog}
          />
          <Box sx={{ pt: 3 }}>
            {isFetchingGetAllContacts ? (
              <Skeleton variant="rectangular" width="100%" height={600} />
            ) : (
              <ContactListResults
                pagination={pagination}
                setPagination={setPagination}
                contacts={contacts}
                totalContact={total}
                handleOpenDialog={handleOpenDialog}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Contact;
