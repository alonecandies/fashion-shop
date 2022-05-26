import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button } from '@material-ui/core';
import { ChromePicker } from 'react-color';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchGetProductColorById,
  fetchCreateProductColor,
  fetchUpdateProductColor,
  selectCurrentProductColor,
  clearMsg
} from 'src/features/product/color/productColorSlice';
import { CRUD_ACTIONS, MESSAGES } from 'src/configs/constants';
import displayToast from 'src/utils/quickDisplayToast';

export default function CategoryDialog({ needOpen, handleClose, action, productColor }) {
  const dispatch = useDispatch();

  // global state
  const currentProductColor = useSelector(selectCurrentProductColor);
  const fetchCreateProductColorMsg = useSelector(
    (state) => state.productColorSlice.fetchCreateProductColorMsg
  );
  const fetchUpdateProductColorMsg = useSelector(
    (state) => state.productColorSlice.fetchUpdateProductColorMsg
  );
  const isFetchingCreateProductColor = useSelector(
    (state) => state.productColorSlice.isFetchingCreateProductColor
  );
  const isFetchingUpdateProductColor = useSelector(
    (state) => state.productColorSlice.isFetchingUpdateProductColor
  );

  // local state
  const [msg, setMsg] = useState('');
  const successMsg =
    action === CRUD_ACTIONS.create ? MESSAGES.CREATE_SUCCESS : MESSAGES.UPDATE_SUCCESS;
  const msgName =
    action === CRUD_ACTIONS.create ? `fetchCreateProductColorMsg` : `fetchUpdateProductColorMsg`;
  const [color, setColor] = useState(currentProductColor?.color);

  const handleSubmit = () => {
    if (action === CRUD_ACTIONS.create) {
      dispatch(fetchCreateProductColor({ color }));
    } else if (action === CRUD_ACTIONS.update) {
      dispatch(fetchUpdateProductColor({ color, productColorId: productColor?.id }));
    }
  };

  useEffect(() => {
    setMsg(
      action === CRUD_ACTIONS.create ? fetchCreateProductColorMsg : fetchUpdateProductColorMsg
    );
  }, [action, fetchCreateProductColorMsg, fetchUpdateProductColorMsg]);

  useEffect(() => {
    if (action === CRUD_ACTIONS.update) {
      dispatch(fetchGetProductColorById({ productColorId: productColor?.id }));
    }
  }, [action, productColor, dispatch]);

  useEffect(() => {
    action === CRUD_ACTIONS.update && !!currentProductColor && setColor(currentProductColor.color);
  }, [action, currentProductColor]);

  // Display toast on save
  useEffect(() => {
    ((!isFetchingCreateProductColor && !!fetchCreateProductColorMsg) ||
      (!isFetchingUpdateProductColor && !!fetchUpdateProductColorMsg)) &&
      displayToast(
        msg,
        successMsg,
        () => handleClose(),
        () => dispatch(clearMsg(msgName))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    fetchCreateProductColorMsg,
    fetchUpdateProductColorMsg,
    isFetchingCreateProductColor,
    isFetchingUpdateProductColor,
    msg,
    msgName,
    successMsg
  ]);

  return (
    <Dialog
      open={needOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {action === CRUD_ACTIONS.create ? `Tạo màu` : `Sửa màu`}
      </DialogTitle>
      <DialogContent>
        {action === CRUD_ACTIONS.create ? (
          <ChromePicker color="#FFFFFF" onChange={(color) => setColor(color.hex)} />
        ) : (
          !!currentProductColor && (
            <ChromePicker color={color} onChange={(color) => setColor(color.hex)} />
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button
          variant="contained"
          onClick={() => {
            handleSubmit();
            handleClose();
          }}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
