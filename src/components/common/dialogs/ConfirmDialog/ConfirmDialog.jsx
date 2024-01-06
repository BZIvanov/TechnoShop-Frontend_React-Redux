import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { useConfirmDialog } from '../../../../contexts/useConfirmDialogContext';

const ConfirmDialog = () => {
  const { dialogConfig, closeDialog } = useConfirmDialog();

  const { open, text, onConfirm } = dialogConfig;

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus={true}>
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
