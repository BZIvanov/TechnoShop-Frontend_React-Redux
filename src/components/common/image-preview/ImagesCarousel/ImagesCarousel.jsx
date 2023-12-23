import PropTypes from 'prop-types';

import Carousel from '../Carousel/Carousel';
import ProductImage from '../../../../assets/images/product.png';

const ImagesCarousel = ({ images = [] }) => {
  return (
    <Carousel>
      {images.length > 0 ? (
        images.map(({ publicId, imageUrl }) => (
          <img src={imageUrl} key={publicId} alt='product-preview' />
        ))
      ) : (
        <img src={ProductImage} alt='product-preview' />
      )}
    </Carousel>
  );
};

ImagesCarousel.propTypes = {
  images: PropTypes.array,
};

export default ImagesCarousel;
