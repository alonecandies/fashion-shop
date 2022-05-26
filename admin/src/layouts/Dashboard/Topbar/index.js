import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Badge, Box, IconButton, Toolbar, Tooltip } from '@material-ui/core';
import CustomDialog from 'src/components/CustomDialog';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import { useDispatch } from 'react-redux';
import { logout } from 'src/features/authen/authenSlice';

const DashboardTopbar = ({ onMobileNavOpen, ...rest }) => {
  const dispatch = useDispatch();

  const [notifications] = useState([]);
  const [openDialog_ls, setOpenDialog_ls] = useState(false);

  return (
    <AppBar elevation={5} {...rest} color="primary">
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton sx={{ display: { xs: 'none', lg: 'block' } }} color="inherit">
          <Badge badgeContent={notifications.length} color="primary" variant="dot">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <CustomDialog
          needOpen={openDialog_ls}
          title={`Đăng xuất`}
          content={`Bạn có chắc muốn đăng xuất không?`}
          button1={{ title: `Hủy`, action: () => setOpenDialog_ls(false) }}
          button2={{
            title: `Có`,
            action: () => {
              dispatch(logout());
              setOpenDialog_ls(false);
            }
          }}
        />
        <Tooltip title="Đăng xuất">
          <IconButton color="inherit" onClick={() => setOpenDialog_ls(true)}>
            <InputIcon />
          </IconButton>
        </Tooltip>

        <IconButton
          sx={{ display: { lg: 'none', xs: 'block' } }}
          color="inherit"
          onClick={onMobileNavOpen}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

DashboardTopbar.propTypes = { onMobileNavOpen: PropTypes.func };

export default DashboardTopbar;
