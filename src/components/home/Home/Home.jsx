import { useGetCategoriesQuery } from '../../../providers/store/services/categories';
import { useGetSubcategoriesQuery } from '../../../providers/store/services/subcategories';
import ChipsList from '../../common/lists/ChipsList/ChipsList';
import TypeWriterText from '../../common/visuals/TypeWriterText/TypeWriterText';
import ProductsSection from '../ProductsSection/ProductsSection';
import { TYPEWRITER_TEXTS } from '../constants';

const Home = () => {
  const { data } = useGetCategoriesQuery();
  const categories = data?.categories || [];
  const { data: subcategories } = useGetSubcategoriesQuery();

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
