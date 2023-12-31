import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useDeleteProductMutation } from '../../providers/store/services/products';
import { useSelector, useDispatch } from '../../providers/store/store';
import { selectUser } from '../../providers/store/features/user/userSlice';
import {
  addToCart,
  setDrawerOpen,
  selectCartProductById,
} from '../../providers/store/features/cart/cartSlice';
import { useConfirmDialog } from '../../contexts/useConfirmDialogContext';
import { useIsApiRequestPending } from '../../hooks/useIsApiRequestPending';
import AverageRating from '../common/rating/AverageRating';
import {
  EditIcon,
  DeleteIcon,
  PreviewIcon,
  AddShoppingCartIcon,
} from '../mui/Icons';
import ProductImage from '../../assets/images/product.png';

const ProductCard = ({ product }) => {
  const { _id, title, price, description, quantity, images, ratings } = product;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { openDialog, closeDialog } = useConfirmDialog();

  const [deleteProduct] = useDeleteProductMutation();

  const user = useSelector(selectUser);
  const cartProduct = useSelector(selectCartProductById(_id));

  const isUserAdmin = user?.role === 'admin';
  const isProductInCart = cartProduct !== undefined;
  const isOutOfStock = quantity === 0;

  const handleProductDelete = (productId) => () => {
    closeDialog();

    deleteProduct(productId);
  };

  const isApiLoading = useIsApiRequestPending();

  return (
    <>
      <AverageRating ratings={ratings} size='small' />
      <Card>
        <CardActionArea onClick={() => navigate(`/product/${_id}`)}>
          {isApiLoading ? (
            <Skeleton
              sx={{ height: 140 }}
              animation='wave'
              variant='rectangular'
            />
          ) : (
            <CardMedia
              component='img'
              height='140'
              image={images.length > 0 ? images[0].imageUrl : ProductImage}
              alt='app product'
            />
          )}
          <CardContent sx={{ paddingBlock: '8px' }}>
            {isApiLoading ? (
              <>
                <Skeleton
                  animation='wave'
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  animation='wave'
                  height={10}
                  width='80%'
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation='wave' height={10} />
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography gutterBottom={true} variant='body1' noWrap={true}>
                    {title}
                  </Typography>
                  <Typography gutterBottom={true} variant='body1'>
                    <strong>${price.toFixed(2)}</strong>
                  </Typography>
                </Box>
                <Typography variant='body2' color='text.secondary'>
                  {description.length > 80
                    ? description.substring(0, 80) + '...'
                    : description}
                </Typography>
              </>
            )}
          </CardContent>
        </CardActionArea>

        <CardActions>
          {isApiLoading ? (
            <>
              <Skeleton
                animation='wave'
                variant='circular'
                width={40}
                height={40}
              />
              <Skeleton
                animation='wave'
                variant='circular'
                width={40}
                height={40}
              />
            </>
          ) : (
            <>
              {isUserAdmin ? (
                <>
                  <Button
                    component={Link}
                    to={`/admin/product/${_id}`}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <EditIcon />
                    <Typography variant='caption'>Edit</Typography>
                  </Button>
                  <Button
                    onClick={() => {
                      openDialog({
                        text: 'Are you sure you want to delete this product?',
                        onConfirm: handleProductDelete(_id),
                      });
                    }}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <DeleteIcon />
                    <Typography variant='caption'>Delete</Typography>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to={`/product/${_id}`}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <PreviewIcon />
                    <Typography variant='caption'>Details</Typography>
                  </Button>

                  <Button
                    onClick={() => {
                      if (!isProductInCart && !isOutOfStock) {
                        dispatch(addToCart({ product, count: 1 }));
                        dispatch(setDrawerOpen(true));
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
                </>
              )}
            </>
          )}
        </CardActions>
      </Card>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
