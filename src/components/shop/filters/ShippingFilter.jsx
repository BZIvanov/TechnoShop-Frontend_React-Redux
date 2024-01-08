import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useSelector, useDispatch } from '../../../providers/store/store';
import {
  selectShippingFilter,
  changeFilter,
} from '../../../providers/store/features/productsFilters/productsFiltersSlice';
import FilterListItem from './FilterListItem';
import { LocalShippingIcon } from '../../mui/Icons';

const ShippingFilter = () => {
  const dispatch = useDispatch();

  const shipping = useSelector(selectShippingFilter);

  return (
    <FilterListItem
      title='Shipping'
      icon={<LocalShippingIcon fontSize='small' />}
    >
      <Box sx={{ padding: '0 20px' }}>
        <FormControl sx={{ width: '100%' }}>
          <Select
            variant='standard'
            value={shipping}
            onChange={(event) => {
              dispatch(changeFilter({ shipping: event.target.value }));
            }}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value='Yes'>Yes</MenuItem>
            <MenuItem value='No'>No</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </FilterListItem>
  );
};

export default ShippingFilter;
