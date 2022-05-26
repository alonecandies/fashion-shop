import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button
} from '@material-ui/core';

export default function CustomDialog({ needOpen, setNeedOpen, title, content, button1, button2 }) {
  return (
    <Dialog open={needOpen} onClose={() => setNeedOpen && setNeedOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {typeof content === 'string' ? <DialogContentText>{content}</DialogContentText> : content}
      </DialogContent>
      <DialogActions>
        <Button onClick={button1.action}>{button1.title}</Button>
        <Button onClick={button2.action} autoFocus>
          {button2.title}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
