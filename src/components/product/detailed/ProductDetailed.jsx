import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import {
  useGetProductQuery,
  useGetSimilarProductsQuery,
  useRateProductMutation,
} from '../../../providers/store/services/products';
import { useDispatch } from '../../../providers/store/store';
import {
  addToCart,
  setDrawerOpen,
} from '../../../providers/store/features/cart/cartSlice';
import { useAddToWishlistMutation } from '../../../providers/store/services/wishlists';
import { showNotification } from '../../../providers/store/features/notification/notificationSlice';
import AverageRating from '../../common/rating/AverageRating';
import ProductsList from '../ProductsList';
import ImagesCarousel from '../../common/imagePreview/carousel/ImagesCarousel';
import InfoTextListItem from './InfoTextListItem';
import InfoChipsListItem from './InfoChipsListItem';
import InfoTabs from './InfoTabs';
import AddToCart from '../actions/AddToCart';
import AddToWishlist from '../actions/AddToWishlist';
import RateProduct from '../actions/RateProduct';

const ProductDetailed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productId } = useParams();

  const { data: productData } = useGetProductQuery(productId);
  const product = productData?.product;
  const { data: similarProductsData } = useGetSimilarProductsQuery(productId);

  const [rateProduct] = useRateProductMutation();
  const [addToWishlist] = useAddToWishlistMutation();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, count: 1 }));
    dispatch(setDrawerOpen(true));
  };

  const handleAddToWishlist = async () => {
    const result = await addToWishlist(product._id);

    if ('error' in result) {
      navigate('/user/wishlist');
    } else {
      dispatch(
        showNotification({ type: 'success', message: 'Added to the wishlist' })
      );
    }
  };

  const handleRateProduct = async (rating) => {
    const result = await rateProduct({ id: product._id, rating });

    if (!('error' in result)) {
      dispatch(
        showNotification({
          type: 'success',
          message: `Successfully rated with rating of ${rating} stars`,
        })
      );
    }
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
                <InfoTextListItem
                  itemKey='Price'
                  itemValue={`$ ${product.price.toFixed(2)}`}
                />
                <InfoChipsListItem
                  linkType='category'
                  itemKey='Category'
                  itemValues={product.category}
                />
                <InfoChipsListItem
                  linkType='subcategory'
                  itemKey='Subcategories'
                  itemValues={product.subcategories}
                />
                <InfoTextListItem
                  itemKey='Shipping'
                  itemValue={product.shipping}
                />
                <InfoTextListItem itemKey='Color' itemValue={product.color} />
                <InfoTextListItem itemKey='Brand' itemValue={product.brand} />
                <InfoTextListItem
                  itemKey='Quantity'
                  itemValue={product.quantity}
                />
                <InfoTextListItem itemKey='Sold' itemValue={product.sold} />
              </CardContent>

              <CardActions>
                <AddToCart
                  productId={product._id}
                  productQuantity={product.quantity}
                  onAddToCart={handleAddToCart}
                />
                <AddToWishlist
                  productId={product._id}
                  onAddToWishlist={handleAddToWishlist}
                />
                <RateProduct
                  productId={product._id}
                  onRateProduct={handleRateProduct}
                  productRatings={product.ratings}
                />
              </CardActions>
            </Card>
          </Grid>

          <Box sx={{ width: '100%', marginBlock: 3 }}>
            <Divider />
          </Box>

          <Grid item={true} xs={12}>
            <InfoTabs description={product.description} />
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
    </>
  );
};

export default ProductDetailed;
