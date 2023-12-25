import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

import {
  useGetCategoryQuery,
  useGetCategoryProductsQuery,
} from '../../../providers/store/services/categories';
import ProductsList from '../../product/ProductsList/ProductsList';

const CategoryProducts = () => {
  const [page, setPage] = useState(1);

  const { categoryId } = useParams();

  const { data: category } = useGetCategoryQuery(categoryId);
  const { data: categoryProductsData } = useGetCategoryProductsQuery({
    id: categoryId,
    page,
  });

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box>
      {category && categoryProductsData && (
        <ProductsList
          header={`${categoryProductsData.totalCount} products in ${category.name} category`}
          products={categoryProductsData.products}
          page={page}
          handlePageChange={handlePageChange}
          totalCount={categoryProductsData.totalCount}
          productsPerPage={12}
        />
      )}
    </Box>
  );
};

export default CategoryProducts;
