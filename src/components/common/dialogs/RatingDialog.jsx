import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Rating from '@mui/material/Rating';

import { MAX_RATING_VALUE } from '../rating/constants';

const RatingDialog = ({
  showRatingModal,
  setShowRatingModal,
  rating,
  setRating,
  rateProduct,
}) => {
  return (
    <Dialog open={showRatingModal} onClose={() => setShowRatingModal(false)}>
      <DialogTitle>Leave your rating</DialogTitle>

      <DialogContent>
        <Rating
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          precision={1}
          size='large'
          max={MAX_RATING_VALUE}
        />
      </DialogContent>

      <DialogActions>
        <Button type='button' onClick={() => setShowRatingModal(false)}>
          Cancel
        </Button>

        <Button
          type='submit'
          onClick={() => {
            setShowRatingModal(false);
            rateProduct();
          }}
        >
          Rate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

RatingDialog.propTypes = {
  showRatingModal: PropTypes.bool,
  setShowRatingModal: PropTypes.func,
  rating: PropTypes.number,
  setRating: PropTypes.func,
  rateProduct: PropTypes.func,
};

export default RatingDialog;
