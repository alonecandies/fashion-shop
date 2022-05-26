import { Box, Button, Card, CardContent, Grid } from '@material-ui/core';

const CategoryToolbar = ({ handleCreateButton }) => (
  <Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end'
                }}
              >
                <Button color="primary" variant="contained" onClick={handleCreateButton}>
                  Thêm Danh mục
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default CategoryToolbar;
