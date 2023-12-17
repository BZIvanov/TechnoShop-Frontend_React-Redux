import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const ConfirmDialog = ({
  dialogConfig: { open, text, onConfirm },
  setDialogConfig,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setDialogConfig({ text, onConfirm, open: false })}
    >
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setDialogConfig({ text, onConfirm, open: false })}
        >
          Cancel
        </Button>
        <Button onClick={() => onConfirm()} autoFocus={true}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  dialogConfig: PropTypes.object,
  setDialogConfig: PropTypes.func,
};

export default ConfirmDialog;
