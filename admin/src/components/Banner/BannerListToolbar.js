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
  Button
} from '@material-ui/core';
import { ClearAll as ClearIcon, Search as SearchIcon, Add as AddIcon } from '@material-ui/icons';
import { CRUD_ACTIONS, BANNER_TYPE, BANNERS_PER_LIST } from 'src/configs/constants';
import SearchTextField from 'src/components/SearchTextField';
import { useState } from 'react';

const BannerListToolbar = ({
  setPage,
  numberOfItems,
  setNumberOfItem,
  setFilter,
  handleOpenDialog
}) => {
  const [bannerFilter, setBannerFilter] = useState({
    title: '',
    type: ''
  });
  const handleSubmit = (e) => {
    setFilter({
      title: bannerFilter.title,
      type: bannerFilter.type
    });
  };

  const handleReset = () => {
    setBannerFilter({
      title: '',
      type: ''
    });
    setFilter({
      title: '',
      type: ''
    });
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
                placeholder="Tên banner"
                size="small"
                margin="normal"
                name="title"
                type="text"
                onChange={(e) => setBannerFilter({ ...bannerFilter, title: e.target.value })}
                value={bannerFilter.title}
              ></SearchTextField>
            </Grid>
            <Grid item sm={2}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel sx={{ mt: -1 }}>Loại Banner</InputLabel>
                <Select
                  value={bannerFilter.type}
                  name="type"
                  size="small"
                  label="Loại Banner"
                  onChange={(e) => setBannerFilter({ ...bannerFilter, type: e.target.value })}
                >
                  {Object.keys(BANNER_TYPE).map((item, index) => {
                    return (
                      <MenuItem key={index} value={BANNER_TYPE[item].id}>
                        {BANNER_TYPE[item].value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={2}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Số banner/trang</InputLabel>
                <Select
                  value={numberOfItems}
                  name="quantity"
                  label="Banner/trang"
                  size="small"
                  onChange={(e) => {
                    setNumberOfItem(e.target.value);
                    setPage(1);
                  }}
                >
                  {BANNERS_PER_LIST.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={1}>
              <IconButton variant="contained" color="primary" onClick={handleSubmit}>
                <SearchIcon />
              </IconButton>
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

export default BannerListToolbar;
