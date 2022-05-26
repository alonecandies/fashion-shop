import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Tooltip
} from '@material-ui/core';
import { ClearAll as ClearIcon, Add as AddIcon, Search as SearchIcon } from '@material-ui/icons';
import { CONTACT_STATUS, CRUD_ACTIONS } from 'src/configs/constants';
import SearchTextField from 'src/components/SearchTextField';
import { useState } from 'react';

const ContactListToolbar = ({ setPagination, handleOpenDialog }) => {
  const [filter, setFilter] = useState({
    phone: '',
    check: ''
  });
  const handleSubmit = (e) => {
    setPagination((pagination) => ({
      ...pagination,
      phone: filter.phone,
      check: filter.check === CONTACT_STATUS.ALL ? '' : filter.check
    }));
  };

  const handleReset = () => {
    setFilter({
      phone: '',
      check: ''
    });
    setPagination((pagination) => ({
      ...pagination,
      phone: '',
      check: ''
    }));
  };
  return (
    <Box>
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{
              alignItems: 'center'
            }}
          >
            <Grid item sm={3}>
              <SearchTextField
                size="small"
                margin="normal"
                name="phone"
                type="text"
                placeholder="Số điện thoại"
                onChange={(e) => setFilter({ ...filter, phone: e.target.value })}
                value={filter.phone}
              ></SearchTextField>
            </Grid>
            <Grid item sm={2}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{ marginTop: -1 }}>Trạng thái</InputLabel>
                <Select
                  size="small"
                  value={filter.check}
                  name="check"
                  label="Trạng thái"
                  onChange={(e) => setFilter({ ...filter, check: e.target.value })}
                >
                  {Object.keys(CONTACT_STATUS).map((item, index) => {
                    return (
                      <MenuItem key={index} value={CONTACT_STATUS[item].id}>
                        {CONTACT_STATUS[item].value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={1}>
              <Tooltip phone="Tìm kiếm">
                <IconButton variant="contained" color="primary" onClick={handleSubmit}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item sm={2}>
              <Button fullWidth variant="outlined" endIcon={<ClearIcon />} onClick={handleReset}>
                Bỏ lọc
              </Button>
            </Grid>
            <Grid item sm={2}>
              <Button
                fullWidth
                variant="outlined"
                endIcon={<AddIcon />}
                onClick={() => handleOpenDialog(null, CRUD_ACTIONS.create)}
              >
                Thêm
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContactListToolbar;
