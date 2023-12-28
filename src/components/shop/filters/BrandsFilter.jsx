import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

import { useSelector, useDispatch } from '../../../providers/store/store';
import { useGetProductsBrandsQuery } from '../../../providers/store/services/products';
import {
  selectBrandsFilter,
  changeFilter,
} from '../../../providers/store/features/productsFilters/productsFiltersSlice';
import FilterListItem from '../FilterListItem/FilterListItem';
import { TokenIcon } from '../../mui/Icons';

const BrandsFilter = () => {
  const dispatch = useDispatch();

  const selectedBrands = useSelector(selectBrandsFilter);

  const { data } = useGetProductsBrandsQuery();
  const { brands = [] } = data || {};

  return (
    <FilterListItem title='Brands' icon={<TokenIcon fontSize='small' />}>
      <Box sx={{ padding: '0 20px' }}>
        <Autocomplete
          multiple={true}
          options={brands}
          disableCloseOnSelect={true}
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => {
            return (
              <li {...props}>
                <Checkbox checked={selected} />
                {option}
              </li>
            );
          }}
          renderInput={(params) => {
            return <TextField {...params} variant='standard' />;
          }}
          limitTags={3}
          value={selectedBrands}
          onChange={(event, values) => {
            dispatch(changeFilter({ brands: values }));
          }}
        />
      </Box>
    </FilterListItem>
  );
};

export default BrandsFilter;
