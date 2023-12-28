import { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

import { useSelector } from '../../../providers/store/store';
import { useGetProductsQuery } from '../../../providers/store/services/products';
import { selectFilters } from '../../../providers/store/features/productsFilters/productsFiltersSlice';
import ProductsList from '../../product/ProductsList/ProductsList';
import PriceFilter from '../filters/PriceFilter';
import CategoryFilter from '../filters/CategoryFilter';
import SubcategoryFilter from '../filters/SubcategoryFilter';
import RatingFilter from '../filters/RatingFilter';
import ShippingFilter from '../filters/ShippingFilter';
import BrandsFilter from '../filters/BrandsFilter';

const PRODUCTS_PER_PAGE = 12;

const Shop = () => {
  const [page, setPage] = useState(1);

  const { text, price, categories, subcategories, rating, shipping, brands } =
    useSelector(selectFilters);

  // reset page in case we were on some bigger page number and filtered to something with fewer pages
  useEffect(() => {
    setPage(1);
  }, [text, price, categories, subcategories, rating, shipping, brands]);

  const params = useMemo(() => {
    return {
      page,
      perPage: PRODUCTS_PER_PAGE,
      text,
      price: price.join(','),
      categories: categories.map((category) => category._id).join(','),
      subcategories: subcategories
        .map((subcategory) => subcategory._id)
        .join(','),
      rating: rating || '',
      shipping,
      brands: brands.join(','),
    };
  }, [page, text, price, categories, subcategories, rating, shipping, brands]);

  // set initial query params for products load query
  const [queryParams, setQueryParams] = useState(() => {
    return params;
  });

  // update query params not more often than half a second to query the products with the latest params
  useEffect(() => {
    const throttle = setTimeout(() => {
      setQueryParams(params);
    }, 500);

    return () => clearTimeout(throttle);
  }, [params]);

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
        <PriceFilter />
        <CategoryFilter />
        <SubcategoryFilter />
        <RatingFilter />
        <ShippingFilter />
        <BrandsFilter />
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
