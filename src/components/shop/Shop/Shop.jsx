import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useSelector, useDispatch } from '../../../providers/store/store';
import { useGetProductsQuery } from '../../../providers/store/services/products';
import {
  selectFilters,
  changeFilter,
} from '../../../providers/store/features/filters/filtersSlice';
import FilterListItem from '../FilterListItem/FilterListItem';
import ProductsList from '../../product/ProductsList/ProductsList';
import { LocalShippingIcon } from '../../mui/Icons';

const PRODUCTS_PER_PAGE = 12;

const Shop = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { shipping } = useSelector(selectFilters);

  const { data } = useGetProductsQuery({
    page,
    perPage: PRODUCTS_PER_PAGE,
    shipping,
  });

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <List
        dense={true}
        sx={{ minWidth: '300px', width: '300px', bgcolor: 'background.paper' }}
      >
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
                  setPage(1); // reset page in case we were on some big page number and filtered to something with just few pages
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
      </List>

      <Box sx={{ flexGrow: 1 }}>
        <ProductsList
          header='Products'
          products={data?.products}
          totalCount={data?.totalCount}
          page={page}
          productsPerPage={PRODUCTS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default Shop;
