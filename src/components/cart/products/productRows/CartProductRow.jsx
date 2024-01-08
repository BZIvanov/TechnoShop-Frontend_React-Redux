import PropTypes from 'prop-types';
import { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ModalImage from 'react-modal-image';

import { useDispatch } from '../../../../providers/store/store';
import {
  addToCart,
  removeFromCart,
} from '../../../../providers/store/features/cart/cartSlice';
import { CheckIcon, ClearIcon, DeleteIcon } from '../../../mui/Icons';
import ProductImage from '../../../../assets/images/product.png';

const CartProductRow = ({ product, count }) => {
  const {
    _id: productId,
    title,
    images,
    price,
    quantity,
    brand,
    color,
    shipping,
  } = product;

  const dispatch = useDispatch();

  const [tempCount, setTempCount] = useState(count);

  return (
    <TableRow>
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
          value={tempCount}
          onChange={(e) => {
            setTempCount(e.target.value);
          }}
          onBlur={() => {
            const finalCount = +tempCount;
            if (
              typeof finalCount === 'number' &&
              finalCount > 0 &&
              finalCount <= quantity
            ) {
              dispatch(addToCart({ product, count: finalCount }));
            } else {
              // set the count to the original count if no value or invalid value was provided
              setTempCount(count);
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
      <TableCell align='center'>$ {(count * price).toFixed(2)}</TableCell>
      <TableCell align='center'>
        <IconButton
          size='small'
          onClick={() => dispatch(removeFromCart(productId))}
        >
          <DeleteIcon fontSize='inherit' />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

CartProductRow.propTypes = {
  product: PropTypes.object,
  count: PropTypes.number,
};

export default CartProductRow;
