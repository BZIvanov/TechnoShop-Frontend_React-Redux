import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

import {
  useGetSubcategoryQuery,
  useGetSubcategoryProductsQuery,
} from '../../providers/store/services/subcategories';
import ProductsList from '../product/ProductsList';

const SubcategoryProducts = () => {
  const [page, setPage] = useState(1);

  const { subcategoryId } = useParams();

  const { data: subcategoryData } = useGetSubcategoryQuery(subcategoryId);
  const subcategory = subcategoryData?.subcategory;
  const { data: subcategoryProductsData } = useGetSubcategoryProductsQuery({
    id: subcategoryId,
    page,
  });
  const subcategoryProducts = subcategoryProductsData?.products;
  const categoryProductsTotalCount = subcategoryProductsData?.totalCount;

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box>
      {subcategory && subcategoryProductsData && (
        <ProductsList
          header={`${subcategory.name} subcategory`}
          products={subcategoryProducts}
          page={page}
          handlePageChange={handlePageChange}
          totalCount={categoryProductsTotalCount}
          productsPerPage={12}
        />
      )}
    </Box>
  );
};

export default SubcategoryProducts;
