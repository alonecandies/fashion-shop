import { useState, useEffect } from 'react';
import {
  fetchUpdateBlogStatus,
  fetchGetBlogById,
  selectCurrentBlog
} from 'src/features/blog/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  Button,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Grid,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { BLOG_STATUS } from 'src/configs/constants';

export default function UserStatusEditDialog({ isOpened, idBlog, handleClose }) {
  const [open, setOpen] = useState(isOpened);
  const [value, setValue] = useState('');

  const dispatch = useDispatch();
  const blog = useSelector(selectCurrentBlog);

  useEffect(() => {
    setOpen(isOpened);
  }, [isOpened]);

  useEffect(() => {
    if (!!idBlog) {
      dispatch(fetchGetBlogById({ id: idBlog }));
    }
  }, [dispatch, idBlog]);

  useEffect(() => {
    blog && setValue(blog.status.toString());
  }, [blog]);

  const handleSubmit = () => {
    dispatch(fetchUpdateBlogStatus({ id: blog.id, status: parseInt(value) }));
    handleClose();
  };

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Grid container sx={{ alignItems: 'center', padding: 2 }}>
        <Grid item xs={11}>
          <DialogTitle sx={{ fontSize: 20, fontWeight: 700 }}>Thay đổi trạng thái</DialogTitle>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <RadioGroup name="status" value={value} onChange={handleRadioChange}>
              {Object.keys(BLOG_STATUS).map((item) => {
                if (BLOG_STATUS[item].id !== 0) {
                  return (
                    <FormControlLabel
                      key={BLOG_STATUS[item].id}
                      value={BLOG_STATUS[item].id.toString()}
                      control={<Radio />}
                      label={BLOG_STATUS[item].value}
                    />
                  );
                } else return <></>;
              })}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button sx={{ width: '100%' }} variant="contained" color="primary" onClick={handleSubmit}>
            Cập nhật
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
