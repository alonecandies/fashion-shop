import React, { useState } from 'react';
import {
  Box,
  Chip,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Tooltip
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment';
import formatCurrency from 'src/utils/currencyFormat';
import { CART_STATUS } from 'src/configs/constants';
import { DeleteTwoTone as DeleteIcon, Stop as SquareIcon } from '@material-ui/icons';
import { useTheme } from '@material-ui/core';
import {
  NewReleases as NewIcon,
  Done as DoneIcon,
  LocalShipping as DeliverIcon,
  HourglassEmpty as WaitingIcon
} from '@material-ui/icons';

const CartRow = ({ cart, index, handleDeleteButton, handleOpenStatusDialog }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const iconList = [
    { id: 1, icon: <NewIcon /> },
    { id: 2, icon: <WaitingIcon /> },
    { id: 3, icon: <DeliverIcon /> },
    { id: 4, icon: <DoneIcon /> }
  ];
  const findIcon = (statusId) => {
    return iconList.find(item => item.id === statusId).icon;
  }

  return (
    <>
      <TableRow align="left">
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        <TableCell component="th" scope="row">
          {cart.full_name}
        </TableCell>
        <TableCell>{cart.address}</TableCell>
        <TableCell>{cart.phone}</TableCell>
        <TableCell>{moment(cart.created_at).format('DD/MM/YYYY')}</TableCell>
        <TableCell>
          {Object.keys(CART_STATUS)
            .filter((item) => CART_STATUS[item].id === cart.status)
            .map((status) => {
              return (
                <Chip
                  key={CART_STATUS[status].id}
                  label={CART_STATUS[status].value}
                  color={CART_STATUS[status].color}
                  // icon={CART_STATUS[status].icon}
                  icon={findIcon(CART_STATUS[status].id)}
                  clickable
                  onClick={() => handleOpenStatusDialog(cart.id)}
                />
              );
            })}
        </TableCell>
        <TableCell>{moment(cart.updated_at).format('DD/MM/YYYY')}</TableCell>
        <TableCell>
          <Tooltip title="Xoá">
            <IconButton onClick={() => handleDeleteButton(cart.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Danh sách sản phẩm
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Mã sản phẩm</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Màu sắc</TableCell>
                    <TableCell>Kích thước</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Giá tiền</TableCell>
                    <TableCell>Giảm (%)</TableCell>
                    <TableCell>Tổng tiền ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!!cart.orders &&
                    cart.orders.map((order) => (
                      <TableRow key={order.code_product}>
                        <TableCell component="th" scope="row">
                          {order.code_product}
                        </TableCell>
                        <TableCell>{order.product_title}</TableCell>
                        <TableCell>
                          <SquareIcon sx={{ color: order.color }} />
                        </TableCell>
                        <TableCell>{order.size}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{formatCurrency(order.product_web_price)}</TableCell>
                        <TableCell sx={{ color: theme.palette.error.main }}>
                          {order.product_sale}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(
                            (order.product_web_price *
                              order.quantity *
                              (100 - order.product_sale)) /
                              100
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
            <Typography sx={{ color: theme.palette.success.main }} variant="h5" align="right">
              Tổng giá trị đơn hàng:{' '}
              {formatCurrency(
                cart.orders
                  .map(
                    (order) =>
                      (order.product_web_price * order.quantity * (100 - order.product_sale)) / 100
                  )
                  .reduce((acc, cur) => acc + cur)
              )}
            </Typography>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
export default CartRow;
