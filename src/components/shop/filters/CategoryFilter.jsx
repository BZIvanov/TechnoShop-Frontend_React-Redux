import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

import { useSelector, useDispatch } from '../../../providers/store/store';
import { useGetCategoriesQuery } from '../../../providers/store/services/categories';
import {
  selectCategoriesFilter,
  changeFilter,
} from '../../../providers/store/features/productsFilters/productsFiltersSlice';
import FilterListItem from '../FilterListItem/FilterListItem';
import { CategoryIcon } from '../../mui/Icons';

const CategoryFilter = () => {
  const dispatch = useDispatch();

  const selectedCategories = useSelector(selectCategoriesFilter);

  const { data: categories = [] } = useGetCategoriesQuery();

  return (
    <FilterListItem title='Category' icon={<CategoryIcon fontSize='small' />}>
      <Box sx={{ padding: '0 20px' }}>
        <Autocomplete
          multiple={true}
          options={categories}
          disableCloseOnSelect={true}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => {
            return (
              <li {...props}>
                <Checkbox checked={selected} />
                {option.name}
              </li>
            );
          }}
          renderInput={(params) => {
            return <TextField {...params} variant='standard' />;
          }}
          limitTags={3}
          isOptionEqualToValue={(v, a) => {
            return v._id === a._id;
          }}
          value={selectedCategories}
          onChange={(event, values) => {
            dispatch(changeFilter({ categories: values }));
          }}
        />
      </Box>
    </FilterListItem>
  );
};

export default CategoryFilter;
