import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Grid } from '@material-ui/core';
import {
  FilterList as FilterIcon,
  ClearAll as ClearIcon,
  AddCircleOutline as AddIcon
} from '@material-ui/icons';
import SearchTextField from 'src/components/SearchTextField';
import { NormalSelect, CategorySelect } from './CustomSelect';
import { PRODUCT_STATUS, PRODUCT_TYPE } from 'src/configs/constants';

const ProductToolbar = ({ categories, tags, filter, setFilter, handleCreateButton }) => {
  const initialFilter = {
    name: '',
    code: '',
    category: {
      id: '',
      level: '',
      name: ''
    },
    tagId: '',
    status: '',
    type: ''
  };
  const [curFilter, setCurFilter] = useState({ ...filter });

  const resetFilter = () => {
    setCurFilter({ ...curFilter, ...initialFilter });
    setFilter((parentFilter) => ({ ...parentFilter, ...initialFilter }));
  };

  const submitFilter = () => setFilter((parentFilter) => ({ ...parentFilter, ...curFilter }));

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <SearchTextField
                placeholder="Tìm kiếm theo tên SP"
                size="small"
                value={curFilter.name}
                onChange={(e) => setCurFilter({ ...curFilter, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SearchTextField
                placeholder="Tìm kiếm theo mã SP"
                size="small"
                value={curFilter.code}
                onChange={(e) => setCurFilter({ ...curFilter, code: e.target.value })}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <CategorySelect
                key="toolbar"
                size="small"
                categories={categories}
                value={curFilter.category}
                handleChange={(e) =>
                  setCurFilter({ ...curFilter, category: JSON.parse(e.target.value) })
                }
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <NormalSelect
                label="Tag"
                name="tag"
                size="small"
                value={curFilter.tagId}
                data={tags}
                dataKey="id"
                dataValue="name"
                onChange={(e) => setCurFilter({ ...curFilter, tagId: e.target.value })}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <NormalSelect
                label="Trạng thái"
                name="status"
                size="small"
                value={curFilter.status}
                data={Object.entries(PRODUCT_STATUS).map((item) => item[1])}
                dataKey="key"
                dataValue="value"
                onChange={(e) => setCurFilter({ ...curFilter, status: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <NormalSelect
                label="Loại"
                name="type"
                size="small"
                value={curFilter.type}
                data={Object.entries(PRODUCT_TYPE).map((item) => item[1])}
                dataKey="key"
                dataValue="value"
                onChange={(e) => setCurFilter({ ...curFilter, type: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} container spacing={3} justifyContent="flex-end">
              <Grid item xs={1.5}>
                <Button
                  fullWidth
                  color="secondary"
                  variant="contained"
                  endIcon={<AddIcon />}
                  onClick={handleCreateButton}
                >
                  Thêm
                </Button>
              </Grid>
              <Grid item xs={1.5}>
                <Button fullWidth variant="outlined" endIcon={<ClearIcon />} onClick={resetFilter}>
                  Bỏ lọc
                </Button>
              </Grid>
              <Grid item xs={1.5}>
                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<FilterIcon />}
                  onClick={submitFilter}
                >
                  Lọc
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductToolbar;
