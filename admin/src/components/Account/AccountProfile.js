import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';

const AccountProfile = (props) => {
  const { userData } = props;
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {userData.full_name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`Đã tạo vào ${moment(userData.created_at).format('LL')}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`(${moment(userData.created_at).fromNow()})`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text"></Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
