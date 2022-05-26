import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const ProductColorToolbar = ({ handleCreateButton }) => (
  <Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item md={6} xs={12}>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Tìm kiếm"
                  variant="outlined"
                />
              </Box>
            </Grid>

            <Grid item md={6} xs={12}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end'
                }}
              >
                <Button color="primary" variant="contained" onClick={handleCreateButton}>
                  Thêm Màu sắc
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default ProductColorToolbar;
