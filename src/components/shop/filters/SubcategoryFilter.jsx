import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

import { useSelector, useDispatch } from '../../../providers/store/store';
import { useGetSubcategoriesQuery } from '../../../providers/store/services/subcategories';
import {
  selectSubcategoriesFilter,
  changeFilter,
} from '../../../providers/store/features/productsFilters/productsFiltersSlice';
import FilterListItem from '../FilterListItem/FilterListItem';
import { AutoAwesomeMosaicIcon } from '../../mui/Icons';

const SubcategoryFilter = () => {
  const dispatch = useDispatch();

  const selectedSubcategories = useSelector(selectSubcategoriesFilter);

  const { data: subcategories = [] } = useGetSubcategoriesQuery();

  return (
    <FilterListItem
      title='Subcategory'
      icon={<AutoAwesomeMosaicIcon fontSize='small' />}
    >
      <Box sx={{ padding: '0 20px' }}>
        <Autocomplete
          multiple={true}
          options={subcategories}
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
          value={selectedSubcategories}
          onChange={(event, values) => {
            dispatch(changeFilter({ subcategories: values }));
          }}
        />
      </Box>
    </FilterListItem>
  );
};

export default SubcategoryFilter;
