import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useDeleteProductMutation } from '../../providers/store/services/products';
import { useSelector, useDispatch } from '../../providers/store/store';
import { selectUser } from '../../providers/store/features/user/userSlice';
import {
  addToCart,
  setDrawerOpen,
} from '../../providers/store/features/cart/cartSlice';
import { useIsApiRequestPending } from '../../hooks/useIsApiRequestPending';
import AverageRating from '../common/rating/AverageRating';
import EditProduct from './actions/EditProduct';
import DeleteProduct from './actions/DeleteProduct';
import AddToCart from './actions/AddToCart';
import ViewDetailed from './actions/ViewDetailed';
import LoadingCard from './LoadingCard';
import ProductImage from '../../assets/images/product.png';

const ProductCard = ({ product }) => {
  const { _id, title, price, description, images, ratings } = product;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [deleteProduct] = useDeleteProductMutation();

  const handleProductDelete = () => {
    deleteProduct(_id);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product, count: 1 }));
    dispatch(setDrawerOpen(true));
  };

  const isUserAdmin = user?.role === 'admin';

  const isApiLoading = useIsApiRequestPending();

  if (isApiLoading) {
    return <LoadingCard />;
  }

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/product/${_id}`)}>
        <CardMedia
          component='img'
          height='140'
          image={images.length > 0 ? images[0].imageUrl : ProductImage}
          alt='app product'
        />

        <CardContent sx={{ paddingBlock: '8px' }}>
          <AverageRating ratings={ratings} size='small' />

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
        </CardContent>
      </CardActionArea>

      <CardActions>
        {isUserAdmin ? (
          <>
            <EditProduct productId={product._id} />
            <DeleteProduct onDeleteProduct={handleProductDelete} />
          </>
        ) : (
          <>
            <ViewDetailed productId={product._id} />
            <AddToCart
              productId={product._id}
              productQuantity={product.quantity}
              onAddToCart={handleAddToCart}
            />
          </>
        )}
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
