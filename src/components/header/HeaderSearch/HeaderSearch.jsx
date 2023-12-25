import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import { useSelector, useDispatch } from '../../../providers/store/store';
import {
  selectFilters,
  changeFilter,
} from '../../../providers/store/features/filters/filtersSlice';
import { SearchIcon } from '../../mui/Icons';

const HeaderSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { text } = useSelector(selectFilters);

  const handleSearchChange = (e) => {
    dispatch(changeFilter({ text: e.target.value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/shop');
  };

  return (
    <Paper
      component='form'
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '40px',
      }}
      onSubmit={handleSearchSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search'
        inputProps={{ 'aria-label': 'search' }}
        value={text}
        onChange={handleSearchChange}
      />
      <IconButton type='submit' aria-label='product search' sx={{ p: '5px' }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default HeaderSearch;
