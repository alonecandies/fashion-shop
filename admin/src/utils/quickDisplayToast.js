import { toast } from 'react-toastify';

const quickDisplayToast = (msg, successMsg, onOpen, onClose) =>
  msg === successMsg
    ? toast.success(msg, { onOpen, onClose })
    : toast.error(msg, { onOpen, onClose });

export default quickDisplayToast;
