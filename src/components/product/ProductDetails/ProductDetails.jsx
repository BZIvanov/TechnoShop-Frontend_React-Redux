import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import {
  useGetProductQuery,
  useGetSimilarProductsQuery,
  useRateProductMutation,
} from '../../../providers/store/services/products';
import { useSelector } from '../../../providers/store/store';
import { selectUser } from '../../../providers/store/features/user/userSlice';
import AverageRating from '../../common/rating/AverageRating/AverageRating';
import RatingDialog from '../../common/dialogs/RatingDialog/RatingDialog';
import ProductInfoTabs from './ProductInfoTabs/ProductInfoTabs';
import ProductsList from '../ProductsList/ProductsList';
import ImagesCarousel from '../../common/image-preview/ImagesCarousel/ImagesCarousel';
import {
  AddShoppingCartIcon,
  FavoriteIcon,
  StarIcon,
  StarBorderOutlinedIcon,
} from '../../mui/Icons';

const ProductDetails = () => {
  const navigate = useNavigate();

  const { productId } = useParams();

  const [rating, setRating] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const user = useSelector(selectUser);

  const { data: product } = useGetProductQuery(productId);
  const { data: similarProductsData } = useGetSimilarProductsQuery(productId);

  const [rateProduct] = useRateProductMutation();

  useEffect(() => {
    // if the user previously rated the product use its rating
    if (product && user) {
      const userRating = product.ratings.find(
        (rating) => rating.postedBy === user._id
      );
      userRating && setRating(userRating.stars);
    }

    return () => setRating(0);
  }, [product, user]);

  const handleRateProduct = () => {
    rateProduct({ id: product._id, rating });
  };

  return (
    <>
      {product && (
        <Grid container={true} sx={{ padding: 2 }}>
          <Grid
            item={true}
            sm={12}
            md={6}
            sx={{ '& .slide img': { maxHeight: '390px', objectFit: 'cover' } }}
          >
            <ImagesCarousel images={product.images} />
          </Grid>

          <Grid item={true} xs={12} sm={12} md={6} sx={{ paddingLeft: 1 }}>
            <Typography
              gutterBottom={true}
              variant='h5'
              sx={{
                color: (theme) => theme.palette.common.white,
                backgroundColor: (theme) => theme.palette.primary.main,
                padding: 1,
              }}
            >
              {product.title}
            </Typography>

            <AverageRating ratings={product.ratings} />

            <Card sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 1,
                  }}
                >
                  <Typography variant='body1'>Price:</Typography>
                  <Typography variant='body1'>{`$ ${product.price.toFixed(
                    2
                  )}`}</Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 1,
                    alignItems: 'center',
                  }}
                >
                  <Typography variant='body1'>Category:</Typography>
                  <Chip
                    label={product.category.name}
                    variant='outlined'
                    onClick={() =>
                      navigate(`/category/${product.category._id}`)
                    }
                    size='small'
                    sx={{ margin: 0.2 }}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 1,
                    alignItems: 'center',
                  }}
                >
                  <Typography variant='body1'>Subcategories:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {product.subcategories.map((subcategory) => (
                      <Chip
                        key={subcategory._id}
                        label={subcategory.name}
                        variant='outlined'
                        onClick={() =>
                          navigate(`/subcategory/${subcategory._id}`)
                        }
                        size='small'
                        sx={{ margin: 0.2 }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 1,
                  }}
                >
                  <Typography variant='body1'>Shipping:</Typography>
                  <Typography variant='body1'>{product.shipping}</Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 1,
                  }}
                >
                  <Typography variant='body1'>Color:</Typography>
                  <Typography variant='body1'>{product.color}</Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 1,
                  }}
                >
                  <Typography variant='body1'>Brand:</Typography>
                  <Typography variant='body1'>{product.brand}</Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 1,
                  }}
                >
                  <Typography variant='body1'>Quantity:</Typography>
                  <Typography variant='body1'>{product.quantity}</Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 1,
                  }}
                >
                  <Typography variant='body1'>Sold:</Typography>
                  <Typography variant='body1'>{product.sold}</Typography>
                </Box>
              </CardContent>

              <CardActions>
                <Button
                  onClick={() => {
                    // TODO
                    // if (!currentProductCart && product.quantity > 0) {
                    //   dispatch(addToCart({ product, count: 1 }));
                    //   dispatch(setDrawerOpen(true));
                    // }
                  }}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <AddShoppingCartIcon />
                  <Typography variant='caption'>
                    TODO
                    {/* {product.quantity < 1
                      ? 'Out of stock'
                      : currentProductCart
                      ? 'Already in the cart'
                      : 'Add to cart'} */}
                  </Typography>
                </Button>

                <Button
                  onClick={() => {
                    // TODO
                    // dispatch(addToWishlistAction(product._id));
                    // navigate('/user/wishlist');
                  }}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <FavoriteIcon />
                  <Typography variant='caption'>Add to wishlist</Typography>
                </Button>

                <Button
                  onClick={() => {
                    if (user) {
                      setShowRatingModal(true);
                    } else {
                      // if the user was trying to rate a product while not logged in, redirect him back to the product page after login
                      navigate('/login', {
                        state: {
                          customNavigateTo: `/product/${product._id}`,
                        },
                      });
                    }
                  }}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  {rating > 0 ? <StarIcon /> : <StarBorderOutlinedIcon />}
                  <Typography variant='caption'>
                    {user ? 'Leave rating' : 'Login to leave rating'}
                  </Typography>
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Box sx={{ width: '100%', marginBlock: 3 }}>
            <Divider />
          </Box>

          <Grid item={true} xs={12}>
            <ProductInfoTabs description={product.description} />
          </Grid>

          <Box sx={{ width: '100%', marginBlock: 3 }}>
            <Divider />
          </Box>

          <Grid item={true} xs={12}>
            <ProductsList
              header='Similar Products'
              products={similarProductsData?.products}
              showPagination={false}
              totalCount={similarProductsData?.totalCount}
            />
          </Grid>
        </Grid>
      )}

      <RatingDialog
        showRatingModal={showRatingModal}
        setShowRatingModal={setShowRatingModal}
        rating={rating}
        setRating={setRating}
        rateProduct={handleRateProduct}
      />
    </>
  );
};

export default ProductDetails;
