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
import { Search as SearchIcon } from 'react-feather';
import { ClearAll as ClearIcon } from '@material-ui/icons';
import { USER_STATUS } from 'src/configs/constants';
import SearchTextField from 'src/components/SearchTextField';
import { useState } from 'react';

const UserListToolbar = ({ setPagination }) => {
  const [filter, setFilter] = useState({
    name: '',
    status: ''
  });
  const handleSubmit = (e) => {
    setPagination((pagination) => ({
      ...pagination,
      name: filter.name,
      status: filter.status === USER_STATUS.ALL.id ? '' : filter.status
    }));
  };

  const handleReset = () => {
    setFilter({
      name: '',
      status: ''
    });
    setPagination((pagination) => ({
      ...pagination,
      name: '',
      status: ''
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
            <Grid item sm={6}>
              <SearchTextField
                size="small"
                margin="normal"
                name="name"
                type="text"
                placeholder="Họ tên"
                onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                value={filter.name}
              ></SearchTextField>
            </Grid>
            <Grid item sm={3}>
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={filter.status}
                  name="status"
                  label="Trạng thái"
                  onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                >
                  {Object.keys(USER_STATUS).map((item, index) => {
                    return (
                      <MenuItem key={index} value={USER_STATUS[item].id}>
                        {USER_STATUS[item].value}
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

export default UserListToolbar;
