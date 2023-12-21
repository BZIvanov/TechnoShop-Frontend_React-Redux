import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { MAX_RATING_VALUE } from '../constants';

const AverageRating = ({ ratings = [], size = 'large' }) => {
  const allStarsSum = ratings
    .map((rating) => rating.stars)
    .reduce((total, stars) => total + stars, 0);

  const averageRating = allStarsSum / ratings.length;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: { xs: 0.5, md: 1 },
        paddingBottom: { xs: 0.5, md: 1 },
      }}
    >
      {ratings.length > 0 ? (
        <>
          <Rating
            value={averageRating}
            precision={1}
            size={size}
            max={MAX_RATING_VALUE}
            disabled={true}
          />
          <Typography variant='body2' ml={1}>
            ({ratings.length})
          </Typography>
        </>
      ) : (
        <Typography variant='body2'>Not rated yet</Typography>
      )}
    </Box>
  );
};

AverageRating.propTypes = {
  ratings: PropTypes.array,
  size: PropTypes.string,
};

export default AverageRating;
