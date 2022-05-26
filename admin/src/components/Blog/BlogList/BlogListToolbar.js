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
import { BLOG_STATUS, CRUD_ACTIONS } from 'src/configs/constants';
import SearchTextField from 'src/components/SearchTextField';
import { useState } from 'react';

const BlogListToolbar = ({ setPagination, handleOpenDialog, blogCategories }) => {
  const [filter, setFilter] = useState({
    title: '',
    status: '',
    blogCategoryId: ''
  });
  const handleSubmit = (e) => {
    setPagination((pagination) => ({
      ...pagination,
      title: filter.title,
      status: filter.status === BLOG_STATUS.ALL.id ? '' : filter.status
    }));
  };

  const handleReset = () => {
    setFilter({
      title: '',
      status: '',
      blogCategoryId: ''
    });
    setPagination((pagination) => ({
      ...pagination,
      title: '',
      status: '',
      blogCategoryId: ''
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
                name="title"
                type="text"
                placeholder="Tên Blog"
                onChange={(e) => setFilter({ ...filter, title: e.target.value })}
                value={filter.title}
              ></SearchTextField>
            </Grid>
            <Grid item sm={2}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={filter.status}
                  name="status"
                  label="Trạng thái"
                  onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                >
                  {Object.keys(BLOG_STATUS).map((item, index) => {
                    return (
                      <MenuItem key={index} value={BLOG_STATUS[item].id}>
                        {BLOG_STATUS[item].value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={2}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel>Danh mục</InputLabel>
                <Select
                  value={filter.blogCategoryId}
                  name="blog_category_id"
                  label="Danh mục"
                  onChange={(e) => setFilter({ ...filter, blogCategoryId: e.target.value })}
                >
                  {blogCategories.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
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

export default BlogListToolbar;
