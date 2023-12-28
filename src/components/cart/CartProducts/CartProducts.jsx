import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ModalImage from 'react-modal-image';

import { useSelector, useDispatch } from '../../../providers/store/store';
import { selectUser } from '../../../providers/store/features/user/userSlice';
import {
  selectCart,
  addToCart,
  removeFromCart,
  clearCart,
} from '../../../providers/store/features/cart/cartSlice';
import { CheckIcon, ClearIcon, DeleteIcon } from '../../mui/Icons';
import ProductImage from '../../../assets/images/product.png';

const CartProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);

  const cartIds = Object.keys(cart);

  return (
    <Box>
      <Paper sx={{ margin: 1 }}>
        <Toolbar variant='dense'>
          <Typography sx={{ flex: '1 1 100%' }} variant='h6'>
            {cartIds.length} products selected.
          </Typography>

          <Button
            sx={{ marginRight: 1 }}
            onClick={() => dispatch(clearCart())}
            size='small'
          >
            Clear cart
          </Button>

          <Button
            variant='contained'
            disabled={cartIds.length === 0}
            onClick={() => {
              if (user) {
                navigate('/checkout');
              } else {
                // if the user was trying to buy products from cart while not logged in, redirect it back to the cart page after login
                navigate('/login', { state: { customNavigateTo: '/cart' } });
              }
            }}
            size='small'
          >
            Go to Checkout
          </Button>
        </Toolbar>

        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Image</TableCell>
                <TableCell align='center'>Title</TableCell>
                <TableCell align='center'>Price</TableCell>
                <TableCell align='center'>Brand</TableCell>
                <TableCell align='center'>Color</TableCell>
                <TableCell align='center'>Quantity</TableCell>
                <TableCell align='center'>Shipping</TableCell>
                <TableCell align='center'>Total price</TableCell>
                <TableCell align='center'>Remove</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cartIds.map((cartProductId) => {
                const { product, count } = cart[cartProductId];
                const {
                  _id,
                  title,
                  images,
                  price,
                  quantity,
                  brand,
                  color,
                  shipping,
                } = product;

                return (
                  <TableRow key={cartProductId}>
                    <TableCell
                      align='center'
                      sx={{ '& > div > img': { height: '30px' } }} // only apply small height to the small image
                    >
                      {images.length > 0 ? (
                        <ModalImage
                          small={images[0].imageUrl}
                          large={images[0].imageUrl}
                          alt={title}
                        />
                      ) : (
                        <ModalImage
                          small={ProductImage}
                          large={ProductImage}
                          alt='Default preview'
                        />
                      )}
                    </TableCell>
                    <TableCell align='center'>{title}</TableCell>
                    <TableCell align='center'>$ {price.toFixed(2)}</TableCell>
                    <TableCell align='center'>{brand}</TableCell>
                    <TableCell align='center'>{color}</TableCell>
                    <TableCell align='center'>
                      <TextField
                        sx={{ maxWidth: 50 }}
                        type='number'
                        min='0'
                        variant='standard'
                        value={count}
                        onChange={(e) => {
                          const value = +e.target.value;
                          if (value > 0 && value <= quantity) {
                            dispatch(
                              addToCart({ product, count: +e.target.value })
                            );
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align='center'>
                      {shipping === 'Yes' ? (
                        <CheckIcon color='success' />
                      ) : (
                        <ClearIcon color='warning' />
                      )}
                    </TableCell>
                    <TableCell align='center'>
                      $ {(count * price).toFixed(2)}
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton
                        size='small'
                        onClick={() => dispatch(removeFromCart(_id))}
                      >
                        <DeleteIcon fontSize='inherit' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}

              <TableRow>
                <TableCell colSpan={5} />
                <TableCell colSpan={2} align='center'>
                  <strong>Total</strong>
                </TableCell>
                <TableCell align='center'>
                  <strong>
                    ${' '}
                    {cartIds
                      .map((cartProductId) => {
                        const {
                          product: { price },
                          count,
                        } = cart[cartProductId];

                        return price * count;
                      })
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)}
                  </strong>
                </TableCell>
                <TableCell colSpan={1} />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CartProducts;
