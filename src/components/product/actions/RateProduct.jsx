import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useSelector } from '../../../providers/store/store';
import { selectUser } from '../../../providers/store/features/user/userSlice';
import RatingDialog from '../../common/dialogs/RatingDialog';
import { StarIcon, StarBorderOutlinedIcon } from '../../mui/Icons';

const RateProduct = ({ productId, onRateProduct, productRatings }) => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const [rating, setRating] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    // if the user previously rated the product use its rating
    if (user) {
      const userRating = productRatings.find(
        (rating) => rating.postedBy === user._id
      );
      userRating && setRating(userRating.stars);
    }

    return () => setRating(0);
  }, [user, productRatings]);

  return (
    <>
      <Button
        onClick={() => {
          if (user) {
            setShowRatingModal(true);
          } else {
            // if the user was trying to rate a product while not logged in, redirect him back to the product page after login
            navigate('/login', {
              state: {
                customNavigateTo: `/product/${productId}`,
              },
            });
          }
        }}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        {rating > 0 ? <StarIcon /> : <StarBorderOutlinedIcon />}
        <Typography variant='caption'>
          {user ? 'Leave rating' : 'Login to leave rating'}
        </Typography>
      </Button>

      <RatingDialog
        showRatingModal={showRatingModal}
        setShowRatingModal={setShowRatingModal}
        rating={rating}
        setRating={setRating}
        rateProduct={onRateProduct}
      />
    </>
  );
};

RateProduct.propTypes = {
  productId: PropTypes.string.isRequired,
  onRateProduct: PropTypes.func.isRequired,
  productRatings: PropTypes.array.isRequired,
};

export default RateProduct;
