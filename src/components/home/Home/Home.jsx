import { useGetAllCategoriesQuery } from '../../../providers/store/services/categories';
import { useGetAllSubcategoriesQuery } from '../../../providers/store/services/subcategories';
import ChipsList from '../../common/lists/ChipsList/ChipsList';
import TypeWriterText from '../../common/visuals/TypeWriterText/TypeWriterText';
import ProductsSection from '../ProductsSection/ProductsSection';
import { TYPEWRITER_TEXTS } from '../constants';

const Home = () => {
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: subcategories } = useGetAllSubcategoriesQuery();

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
