import { useGetCategoriesQuery } from '../../providers/store/services/categories';
import { useGetSubcategoriesQuery } from '../../providers/store/services/subcategories';
import ChipsList from '../common/lists/ChipsList';
import TypeWriterText from '../common/visuals/TypeWriterText';
import ProductsSection from './ProductsSection';
import { TYPEWRITER_TEXTS } from './constants';

const Home = () => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.categories || [];
  const { data: subcategoriesData } = useGetSubcategoriesQuery();
  const subcategories = subcategoriesData?.subcategories || [];

  return (
    <>
      <TypeWriterText texts={TYPEWRITER_TEXTS} />

      <ProductsSection header={TYPEWRITER_TEXTS[0]} sortColumn='createdAt' />

      <ProductsSection header={TYPEWRITER_TEXTS[1]} sortColumn='sold' />

      <ChipsList
        title='Categories'
        parameter='category'
        chipsList={categories}
      />

      <ChipsList
        title='Subcategories'
        parameter='subcategory'
        chipsList={subcategories}
      />
    </>
  );
};

export default Home;
