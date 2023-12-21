import PropTypes from 'prop-types';
import { useState } from 'react';
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

import { useDeleteProductMutation } from '../../../providers/store/services/products';
import { useSelector } from '../../../providers/store/store';
import { selectUser } from '../../../providers/store/features/user/userSlice';
import AverageRating from '../../common/rating/AverageRating/AverageRating';
import {
  EditIcon,
  DeleteIcon,
  PreviewIcon,
  AddShoppingCartIcon,
} from '../../mui/Icons';
import ConfirmDialog from '../../common/dialogs/ConfirmDialog/ConfirmDialog';
import ProductImage from '../../../assets/images/product.png';

const ProductCard = ({ product }) => {
  const { _id, title, price, description, quantity, images, ratings } = product;

  const navigate = useNavigate();

  const [deleteProduct] = useDeleteProductMutation();

  const user = useSelector(selectUser);

  const isUserAdmin = user?.role === 'admin';

  const [removeProductDialog, setRemoveProductDialog] = useState({
    open: false,
    text: '',
    onConfirm: () => {},
  });

  const handleProductDelete = (productId) => () => {
    setRemoveProductDialog({
      open: false,
      text: '',
      onConfirm: () => {},
    });
    deleteProduct(productId);
  };

  // TODO
  const loading = false;
  const currentProductCart = null;

  return (
    <>
      <AverageRating ratings={ratings} size='small' />
      <Card>
        <CardActionArea onClick={() => navigate(`/product/${_id}`)}>
          {loading ? (
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
            {loading ? (
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
          {loading ? (
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
                      setRemoveProductDialog({
                        open: true,
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
                      // TODO
                    }}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <AddShoppingCartIcon />
                    <Typography variant='caption'>
                      {quantity < 1
                        ? 'Out of stock'
                        : currentProductCart
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

      <ConfirmDialog
        dialogConfig={removeProductDialog}
        setDialogConfig={setRemoveProductDialog}
      />
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
