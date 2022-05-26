import React from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Grid,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slide,
  Chip,
  Box,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader
} from '@material-ui/core';
import { StopRounded as SquareIcon, Close as CloseIcon } from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductDetailDialog({ open, setOpen, product }) {
  return (
    <Dialog open={open} fullScreen TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setOpen(false)} sx={{ mr: 3 }}>
            <CloseIcon />
          </IconButton>
          <Typography>Xem sản phẩm</Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Tên sản phẩm"
                name="title"
                value={product.title}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <Box pl={3} pr={3} dangerouslySetInnerHTML={{ __html: product.description }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Giá Web"
                name="webPrice"
                type="number"
                value={product.web_price}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Sale"
                name="sale"
                type="number"
                value={product.sale}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Danh mục"
                name="categoryId"
                value={product.product_category_name}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="tag-label">Tag</InputLabel>
                <Select
                  labelId="tag-label"
                  multiple
                  value={product.tags.map((tag) => tag.id)}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={() => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {product.tags.map((tag, index) => (
                        <Chip key={index} label={tag.name} size="small" sx={{ mr: 0.5 }} />
                      ))}
                    </Box>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="size-label">Kích cỡ</InputLabel>
                <Select
                  labelId="size-label"
                  multiple
                  value={product.sizes.map((size) => size.id)}
                  input={<OutlinedInput label="Kích cỡ" />}
                  renderValue={() => product.sizes.map((size) => size.type).join(', ')}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="color-label">Màu sắc</InputLabel>
                <Select
                  labelId="color-label"
                  multiple
                  value={product.colors.map((color) => color.id)}
                  input={<OutlinedInput label="Màu sắc" />}
                  renderValue={() =>
                    product.colors.map((color, index) => (
                      <SquareIcon key={index} sx={{ color: color.color }} />
                    ))
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <ImageList cols={4} gap={8}>
                <ImageListItem key="Subheader" cols={4}>
                  <ListSubheader component="div">Hình ảnh</ListSubheader>
                </ImageListItem>
                {product.images?.length > 0 &&
                  product.images.map((item, index) => (
                    <ImageListItem key={index}>
                      <img srcSet={item.url} alt={item.title} loading="lazy" />
                      <ImageListItemBar title={item.title} />
                    </ImageListItem>
                  ))}
              </ImageList>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
