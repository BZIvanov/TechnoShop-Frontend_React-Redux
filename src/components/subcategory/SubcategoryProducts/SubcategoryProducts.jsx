import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

import {
  useGetSubcategoryQuery,
  useGetSubcategoryProductsQuery,
} from '../../../providers/store/services/subcategories';
import ProductsList from '../../product/ProductsList/ProductsList';

const SubcategoryProducts = () => {
  const [page, setPage] = useState(1);

  const { subcategoryId } = useParams();

  const { data: subcategory } = useGetSubcategoryQuery(subcategoryId);
  const { data: subcategoryProductsData } = useGetSubcategoryProductsQuery({
    id: subcategoryId,
    page,
  });

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box>
      {subcategory && subcategoryProductsData && (
        <ProductsList
          header={`${subcategoryProductsData.totalCount} products in ${subcategory.name} category`}
          products={subcategoryProductsData.products}
          page={page}
          handlePageChange={handlePageChange}
          totalCount={subcategoryProductsData.totalCount}
          productsPerPage={12}
        />
      )}
    </Box>
  );
};

export default SubcategoryProducts;
