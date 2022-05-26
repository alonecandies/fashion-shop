import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { useNavigate } from 'react-router-dom';

const ProductImage = () => {
  const navigate = useNavigate();

  useCheckAuth({ navigate, currentPage: `/app/products/image` });

  return (
    <>
      <Helmet>
        <title>Sản phẩm - Hình ảnh | Lasy Shop</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}></Container>
      </Box>
    </>
  );
};

export default ProductImage;
