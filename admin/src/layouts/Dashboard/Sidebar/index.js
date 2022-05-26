import { useEffect, useCallback } from 'react';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Box, Divider, Drawer, List, Typography, Skeleton } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'src/features/authen/authenSlice';
import {
  DashboardTwoTone as DashboardIcon,
  PeopleAltTwoTone as UsersIcon,
  PermContactCalendarTwoTone as AccountIcon,
  LocalMallTwoTone as ProductIcon,
  ViewListTwoTone as ListIcon,
  ClassTwoTone as CategoryIcon,
  LocalOfferTwoTone as TagIcon,
  ColorLensTwoTone as ColorIcon,
  FormatSizeTwoTone as SizeIcon,
  SettingsTwoTone as SettingsIcon,
  Collections as BannerIcon,
  CategoryTwoTone as BlogCategoryIcon,
  WebTwoTone as BlogIcon,
  ShoppingCartTwoTone as CartIcon,
  ContactMailTwoTone as ContactIcon
} from '@material-ui/icons';
import NavItem from './NavItem';

let items = [
  {
    href: '/app/dashboard',
    icon: DashboardIcon,
    title: 'Bảng điều khiển'
  },
  {
    href: '/app/users',
    icon: UsersIcon,
    title: 'Người dùng'
  },
  {
    icon: ProductIcon,
    title: 'Sản phẩm',
    nestedItems: [
      {
        href: '/app/products/list',
        icon: ListIcon,
        title: 'Danh sách'
      },
      {
        href: '/app/products/category',
        icon: CategoryIcon,
        title: 'Danh mục'
      },
      {
        href: '/app/products/tag',
        icon: TagIcon,
        title: 'Tag'
      },
      {
        href: '/app/products/color',
        icon: ColorIcon,
        title: 'Màu sắc'
      },
      {
        href: '/app/products/size',
        icon: SizeIcon,
        title: 'Kích cỡ'
      }
    ]
  },
  {
    href: '/app/carts',
    icon: CartIcon,
    title: 'Đơn hàng'
  },
  {
    href: '/app/banners',
    icon: BannerIcon,
    title: 'Banner'
  },
  {
    icon: BlogIcon,
    title: 'Blog',
    nestedItems: [
      {
        href: '/app/blogs/list',
        icon: ListIcon,
        title: 'Danh sách'
      },
      {
        href: '/app/blogs/category',
        icon: BlogCategoryIcon,
        title: 'Danh mục'
      }
    ]
  },
  {
    href: '/app/contacts',
    icon: ContactIcon,
    title: 'Liên hệ'
  },
  {
    href: '/app/account',
    icon: AccountIcon,
    title: 'Tài khoản'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Cài đặt'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  // global state
  const userData_gs = useSelector(selectUserInfo);

  const reloadItems = useCallback((pathname) => {
    items = items.map((item) => {
      if (!!item.href) {
        if (!!matchPath({ path: item.href }, pathname)) {
          return { ...item, active: true };
        } else {
          return { ...item, active: false };
        }
      } else {
        let parentActive = false;
        return {
          ...item,
          nestedItems: item.nestedItems.map((nestedItem) => {
            if (!!matchPath({ path: nestedItem.href }, pathname)) {
              parentActive = true;
              return { ...nestedItem, active: true };
            } else {
              return { ...nestedItem, active: false };
            }
          }),
          active: parentActive
        };
      }
    });
  }, []);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    reloadItems(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        {!userData_gs ? (
          <>
            <Skeleton width="30%" />
            <Skeleton width="50%" />
          </>
        ) : (
          <>
            <Typography color="textPrimary" variant="h5">
              {userData_gs.full_name}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {userData_gs.email}
            </Typography>
          </>
        )}
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List component="div">
          {items.map((item, index) => (
            <NavItem
              key={index}
              isActive={item.active}
              href={item.href}
              title={item.title}
              icon={item.icon}
              nestedItems={item.nestedItems}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Drawer
        sx={{ display: { lg: 'none', xs: 'block' } }}
        anchor="left"
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
        PaperProps={{ sx: { width: 256 } }}
      >
        {content}
      </Drawer>
      <Drawer
        sx={{ display: { xs: 'none', lg: 'block' } }}
        anchor="left"
        open
        variant="persistent"
        PaperProps={{
          sx: {
            width: 256,
            top: 64,
            height: 'calc(100% - 64px)'
          }
        }}
      >
        {content}
      </Drawer>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
