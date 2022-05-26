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
  Tooltip,
  TextField
} from '@material-ui/core';
import { ClearAll as ClearIcon, Search as SearchIcon } from '@material-ui/icons';
import SearchTextField from 'src/components/SearchTextField';
import { useState } from 'react';
import { CART_STATUS } from 'src/configs/constants';

const CartListToolbar = ({ setPagination }) => {
  const [filter, setFilter] = useState({
    status: '',
    fromDate: '',
    toDate: '',
    phone: ''
  });
  const handleSubmit = (e) => {
    setPagination((pagination) => ({
      ...pagination,
      ...filter,
      fromDate: filter.fromDate,
      toDate: filter.toDate,
      phone: filter.phone,
      status: filter.status === CART_STATUS.ALL.id ? '' : filter.status
    }));
  };

  const handleReset = () => {
    setFilter({
      status: '',
      fromDate: '',
      toDate: '',
      phone: ''
    });
    setPagination((pagination) => ({
      ...pagination,
      status: '',
      fromDate: '',
      toDate: '',
      phone: ''
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
            <Grid item sm={2}>
              <SearchTextField
                size="small"
                margin="normal"
                name="title"
                type="text"
                placeholder="Số điện thoại"
                onChange={(e) => setFilter({ ...filter, phone: e.target.value })}
                value={filter.phone}
              ></SearchTextField>
            </Grid>
            <Grid item sm={2}>
              <TextField
                fullWidth
                size="small"
                name="fromDate"
                type="date"
                label="Từ ngày"
                onChange={(e) => setFilter({ ...filter, fromDate: e.target.value })}
                value={filter.fromDate}
                InputLabelProps={{ shrink: true }}
              ></TextField>
            </Grid>
            <Grid item sm={2}>
              <TextField
                fullWidth
                size="small"
                name="toDate"
                type="date"
                label="Tới ngày"
                onChange={(e) => setFilter({ ...filter, toDate: e.target.value })}
                value={filter.toDate}
                InputLabelProps={{ shrink: true }}
              ></TextField>
            </Grid>
            <Grid item sm={2}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{ marginTop: -1 }}>Trạng thái</InputLabel>
                <Select
                  size="small"
                  value={filter.status}
                  name="status"
                  label="Trạng thái"
                  onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                >
                  {Object.keys(CART_STATUS).map((item, index) => {
                    return (
                      <MenuItem key={index} value={CART_STATUS[item].id}>
                        {CART_STATUS[item].value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={1}>
              <Tooltip title="Tìm kiếm">
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
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CartListToolbar;
