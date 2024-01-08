import PropTypes from 'prop-types';
import { useState } from 'react';

import { useGetProductsQuery } from '../../providers/store/services/products';
import ProductsList from '../product/ProductsList';

const PRODUCTS_PER_PAGE = 6;

const ProductsSection = ({ header, sortColumn }) => {
  const [page, setPage] = useState(1);

  const { data } = useGetProductsQuery({
    page,
    perPage: PRODUCTS_PER_PAGE,
    sortColumn,
  });

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <ProductsList
      header={header}
      products={data?.products}
      totalCount={data?.totalCount}
      page={page}
      productsPerPage={PRODUCTS_PER_PAGE}
      onPageChange={handlePageChange}
    />
  );
};

ProductsSection.propTypes = {
  header: PropTypes.string,
  sortColumn: PropTypes.string,
};

export default ProductsSection;
