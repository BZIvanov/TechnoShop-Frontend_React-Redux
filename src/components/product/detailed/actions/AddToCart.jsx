import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useSelector } from '../../../../providers/store/store';
import { selectCartProductById } from '../../../../providers/store/features/cart/cartSlice';
import { AddShoppingCartIcon } from '../../../mui/Icons';

const AddToCart = ({ productId, onAddToCart, productQuantity }) => {
  const cartProduct = useSelector(selectCartProductById(productId));

  const isProductInCart = cartProduct !== undefined;
  const isOutOfStock = productQuantity === 0;

  return (
    <Button
      onClick={() => {
        if (!isProductInCart && !isOutOfStock) {
          onAddToCart();
        }
      }}
      sx={{ display: 'flex', flexDirection: 'column' }}
      disabled={isProductInCart || isOutOfStock}
    >
      <AddShoppingCartIcon />
      <Typography variant='caption'>
        {isOutOfStock
          ? 'Out of stock'
          : isProductInCart
          ? 'Already in the cart'
          : 'Add to cart'}
      </Typography>
    </Button>
  );
};

AddToCart.propTypes = {
  productId: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  productQuantity: PropTypes.number.isRequired,
};

export default AddToCart;
