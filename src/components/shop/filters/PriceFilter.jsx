import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { useSelector, useDispatch } from '../../../providers/store/store';
import {
  selectPriceFilter,
  changeFilter,
} from '../../../providers/store/features/productsFilters/productsFiltersSlice';
import FilterListItem from '../FilterListItem/FilterListItem';
import { AttachMoneyIcon } from '../../mui/Icons';

const PriceFilter = () => {
  const dispatch = useDispatch();

  const price = useSelector(selectPriceFilter);

  const [localPrice, setLocalPrice] = useState(price);

  return (
    <FilterListItem
      title={`Price (${price[0]}-${price[1]})`}
      icon={<AttachMoneyIcon fontSize='small' />}
    >
      <Box sx={{ padding: '0 32px' }}>
        <Slider
          value={localPrice}
          onChange={(event, newValue) => {
            // change the local price, when the user is sliding
            setLocalPrice(newValue);
          }}
          onChangeCommitted={(event, newValue) => {
            // change the global price in the store, when the user is done sliding, which will then trigger api call with the updated store price value
            dispatch(changeFilter({ price: newValue }));
          }}
          valueLabelDisplay='auto'
          disableSwap={true}
          step={100}
          max={4999}
          valueLabelFormat={(value) => `$ ${value}`}
          size='small'
        />
      </Box>
    </FilterListItem>
  );
};

export default PriceFilter;
