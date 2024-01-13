import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useSelector } from '../../../providers/store/store';
import { selectUser } from '../../../providers/store/features/user/userSlice';
import { FavoriteBorderIcon } from '../../mui/Icons';

const AddToWishlist = ({ productId, onAddToWishlist }) => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  return (
    <Button
      onClick={() => {
        if (!user) {
          return navigate('/login', {
            state: {
              customNavigateTo: `/product/${productId}`,
            },
          });
        }

        onAddToWishlist();
      }}
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <FavoriteBorderIcon />
      <Typography variant='caption'>Add to wishlist</Typography>
    </Button>
  );
};

AddToWishlist.propTypes = {
  productId: PropTypes.string.isRequired,
  onAddToWishlist: PropTypes.func.isRequired,
};

export default AddToWishlist;
