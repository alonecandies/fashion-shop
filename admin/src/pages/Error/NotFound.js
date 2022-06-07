import { Helmet } from 'react-helmet';
import { Box, Container, Typography } from '@material-ui/core';

const NotFound = () => (
  <>
    <Helmet>
      <title>404 | HPL Shop</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h1">
          404: Không tìm thấy trang
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          Trang bạn truy cập không tồn tại hoặc không có quyền truy cập! Liên hệ admin để biết thêm
          chi tiết
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src="/static/images/undraw_page_not_found_su7k.svg"
            style={{
              marginTop: 50,
              display: 'inline-block',
              maxWidth: '100%',
              width: 560
            }}
          />
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
