import { useState, useEffect } from 'react';
import { fetchGetContactById, selectCurrentContact } from 'src/features/contact/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, TextField, Grid, IconButton } from '@material-ui/core';
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';

export default function ContactDetailDialog({ isOpened, idContact, handleClose }) {
  const [open, setOpen] = useState(isOpened);

  const dispatch = useDispatch();
  const contact = useSelector(selectCurrentContact);

  useEffect(() => {
    setOpen(isOpened);
  }, [isOpened]);

  useEffect(() => {
    if (!!idContact) {
      dispatch(fetchGetContactById({ id: idContact }));
    }
  }, [dispatch, idContact]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <Grid container sx={{ alignItems: 'center', padding: 2 }}>
        <Grid item sm={11}>
          <DialogTitle sx={{ fontSize: 20, fontWeight: 700 }}>Chi tiết thông tin</DialogTitle>
        </Grid>
        <Grid item sm={1}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid item sm={12}>
          {contact && (
            <Grid container spacing={3}>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  label="Họ tên"
                  margin="normal"
                  name="full_name"
                  type="text"
                  value={contact.full_name}
                  variant="outlined"
                  inputProps={{ readOnly: true }}
                ></TextField>
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  type="text"
                  value={contact.email}
                  variant="outlined"
                  inputProps={{ readOnly: true }}
                ></TextField>
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  label="phone"
                  margin="normal"
                  name="phone"
                  type="text"
                  value={contact.phone}
                  variant="outlined"
                  inputProps={{ readOnly: true }}
                ></TextField>
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  label="Ngày tạo"
                  margin="normal"
                  name="created_at"
                  type="text"
                  value={moment(contact.created_at).format("DD/MM/YYYY")}
                  variant="outlined"
                  inputProps={{ readOnly: true }}
                ></TextField>
              </Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  margin="normal"
                  name="address"
                  type="text"
                  value={contact.content}
                  variant="outlined"
                  multiline
                  inputProps={{ readOnly: true }}
                ></TextField>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Dialog>
  );
}
