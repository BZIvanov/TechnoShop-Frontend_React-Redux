import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { EditIcon } from '../../mui/Icons';

const EditProduct = ({ productId }) => {
  return (
    <Button
      component={Link}
      to={`/admin/product/${productId}`}
      sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}
    >
      <EditIcon />
      <Typography variant='caption'>Edit Product</Typography>
    </Button>
  );
};

EditProduct.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default EditProduct;
