import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

import ProductCard from '../ProductCard/ProductCard';

const ProductsList = ({
  header,
  products = [],
  page,
  productsPerPage,
  onPageChange,
  totalCount = 0,
  showPagination = true,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: { xs: '10px', sm: '20px' },
      }}
    >
      <Typography
        variant='h5'
        sx={{
          width: '100%',
          textAlign: 'center',
          backgroundColor: (theme) => theme.palette.grey[300],
        }}
      >
        {header}
      </Typography>

      <Paper sx={{ width: '100%', padding: 2 }}>
        {products.length > 0 ? (
          <Grid container={true} spacing={3}>
            {products.map((product) => (
              <Grid
                key={product._id}
                item={true}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography sx={{ textAlign: 'center' }} variant='subtitle2'>
            No products found.
          </Typography>
        )}

        {showPagination && totalCount > productsPerPage && (
          <Stack sx={{ margin: 2, display: 'flex', alignItems: 'center' }}>
            <Pagination
              page={page}
              onChange={onPageChange}
              count={Math.ceil(totalCount / productsPerPage)}
              boundaryCount={2}
              showFirstButton={true}
              showLastButton={true}
            />
          </Stack>
        )}
      </Paper>
    </Box>
  );
};

ProductsList.propTypes = {
  header: PropTypes.string,
  products: PropTypes.array,
  page: PropTypes.number,
  productsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  totalCount: PropTypes.number,
  showPagination: PropTypes.bool,
};

export default ProductsList;
