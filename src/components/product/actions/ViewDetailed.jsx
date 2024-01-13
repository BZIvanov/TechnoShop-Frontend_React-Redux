import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { PreviewIcon } from '../../mui/Icons';

const ViewDetailed = ({ productId }) => {
  return (
    <Button
      component={Link}
      to={`/product/${productId}`}
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <PreviewIcon />
      <Typography variant='caption' sx={{ textAlign: 'center' }}>
        View Detailed
      </Typography>
    </Button>
  );
};

ViewDetailed.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ViewDetailed;
