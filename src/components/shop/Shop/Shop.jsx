import { useState, useEffect } from 'react';
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

const PRODUCTS_PER_PAGE = 12;

const Shop = () => {
  const [page, setPage] = useState(1);

  const {
    text,
    price,
    categories: selectedCategories,
    subcategories: selectedSubcategories,
    rating,
    shipping,
  } = useSelector(selectFilters);

  // reset page in case we were on some bigger page number and filtered to something with fewer pages
  useEffect(() => {
    setPage(1);
  }, [
    text,
    price,
    selectedCategories,
    selectedSubcategories,
    rating,
    shipping,
  ]);

  // set initial query params for products load query
  const [queryParams, setQueryParams] = useState(() => {
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

  // update query params not more often than half a second to query the products with the latest params
  useEffect(() => {
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
    }, 500);

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
