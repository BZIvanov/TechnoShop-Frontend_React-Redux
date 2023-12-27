import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import { useSelector, useDispatch } from '../../../providers/store/store';
import {
  selectRatingFilter,
  changeFilter,
} from '../../../providers/store/features/productsFilters/productsFiltersSlice';
import FilterListItem from '../FilterListItem/FilterListItem';
import { StarIcon } from '../../mui/Icons';
import { MAX_RATING_VALUE } from '../../common/rating/constants';

const RatingFilter = () => {
  const dispatch = useDispatch();

  const rating = useSelector(selectRatingFilter);

  return (
    <FilterListItem title='Rating' icon={<StarIcon fontSize='small' />}>
      <Box sx={{ padding: '0 20px' }}>
        <Rating
          value={rating}
          onChange={(event, newValue) => {
            dispatch(changeFilter({ rating: newValue }));
          }}
          precision={1}
          size='large'
          max={MAX_RATING_VALUE}
        />
      </Box>
    </FilterListItem>
  );
};

export default RatingFilter;
