import { toast } from 'react-toastify';

const quickDisplayToast = (msg: string, successMsg: string, onOpen: any, onClose: any) =>
  msg === successMsg
    ? toast.success(msg, { onOpen, onClose })
    : toast.error(msg, { onOpen, onClose });

export default quickDisplayToast;
