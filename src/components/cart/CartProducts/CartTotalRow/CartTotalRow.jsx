import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const CartTotalRow = ({ cart }) => {
  const cartIds = Object.keys(cart);

  return (
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
  );
};

CartTotalRow.propTypes = {
  cart: PropTypes.object,
};

export default CartTotalRow;
