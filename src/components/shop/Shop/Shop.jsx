import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';

import { useSelector, useDispatch } from '../../../providers/store/store';
import { useGetProductsQuery } from '../../../providers/store/services/products';
import { useGetCategoriesQuery } from '../../../providers/store/services/categories';
import { useGetSubcategoriesQuery } from '../../../providers/store/services/subcategories';
import {
  selectFilters,
  changeFilter,
} from '../../../providers/store/features/productsFilters/productsFiltersSlice';
import FilterListItem from '../FilterListItem/FilterListItem';
import ProductsList from '../../product/ProductsList/ProductsList';
import {
  AttachMoneyIcon,
  AutoAwesomeMosaicIcon,
  CategoryIcon,
  LocalShippingIcon,
  StarIcon,
} from '../../mui/Icons';
import { MAX_RATING_VALUE } from '../../common/rating/constants';

const PRODUCTS_PER_PAGE = 12;

const Shop = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const {
    text,
    price,
    categories: selectedCategories,
    subcategories: selectedSubcategories,
    rating,
    shipping,
  } = useSelector(selectFilters);

  const [localPrice, setLocalPrice] = useState(price);

  const [queryParams, setQueryParams] = useState(() => {
    // set initial query params
    return {
      page,
      perPage: PRODUCTS_PER_PAGE,
      text,
      price: price.join(','),
      categories: selectedCategories.map((category) => category._id).join(','),
      subcategories: selectedSubcategories
        .map((subcategory) => subcategory._id)
        .join(','),
      rating: rating || '',
      shipping,
    };
  });

  useEffect(() => {
    // update query params not more often than half a second to query the products with the latest params
    const throttle = setTimeout(() => {
      setQueryParams({
        page,
        perPage: PRODUCTS_PER_PAGE,
        text,
        price: price.join(','),
        categories: selectedCategories
          .map((category) => category._id)
          .join(','),
        subcategories: selectedSubcategories
          .map((subcategory) => subcategory._id)
          .join(','),
        rating: rating || '',
        shipping,
      });
    }, 1500);

    return () => clearTimeout(throttle);
  }, [
    page,
    text,
    price,
    selectedCategories,
    selectedSubcategories,
    rating,
    shipping,
  ]);

  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: subcategories = [] } = useGetSubcategoriesQuery();
  const { data } = useGetProductsQuery(queryParams);

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

        <FilterListItem
          title='Category'
          icon={<CategoryIcon fontSize='small' />}
        >
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
