import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { CRUD_ACTIONS } from 'src/configs/constants';

const BannerCard = ({ banner, handleDeleteButton, handleOpenDialog }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          sx={{ height: 200 }}
          image={banner.url}
          title={banner.title}
          onClick={() => {
            handleOpenDialog(banner.id, CRUD_ACTIONS.update);
          }}
        />
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography gutterBottom variant="h5" component="h2">
            {banner.title}
          </Typography>
          <IconButton onClick={() => handleDeleteButton(banner.id)}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default BannerCard;
