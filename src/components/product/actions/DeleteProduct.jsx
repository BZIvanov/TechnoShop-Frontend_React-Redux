import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useConfirmDialog } from '../../../contexts/useConfirmDialogContext';
import { DeleteIcon } from '../../mui/Icons';

const DeleteProduct = ({ onDeleteProduct }) => {
  const { openDialog, closeDialog } = useConfirmDialog();

  return (
    <Button
      onClick={() => {
        openDialog({
          text: 'Are you sure you want to delete this product?',
          onConfirm: () => {
            closeDialog();
            onDeleteProduct();
          },
        });
      }}
      sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}
    >
      <DeleteIcon />
      <Typography variant='caption'>Delete Product</Typography>
    </Button>
  );
};

DeleteProduct.propTypes = {
  onDeleteProduct: PropTypes.func.isRequired,
};

export default DeleteProduct;
