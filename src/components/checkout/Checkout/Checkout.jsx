import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useSelector, useDispatch } from '../../../providers/store/store';
import { useCreateOrderMutation } from '../../../providers/store/services/orders';
import {
  selectCart,
  clearCart,
} from '../../../providers/store/features/cart/cartSlice';
import { showNotification } from '../../../providers/store/features/notification/notificationSlice';
import FormProvider from '../../../providers/form/FormProvider';
import { useForm } from '../../../providers/form/hooks/useForm';
import TextFieldAdapter from '../../../providers/form/form-fields/TextFieldAdapter/TextFieldAdapter';
import { formConfig } from './form-schema';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);

  const [createOrder] = useCreateOrderMutation();

  const formMethods = useForm(formConfig);
  const { reset } = formMethods;

  const handleFormSubmit = async (values) => {
    const { address, coupon } = values;
    const cartItems = Object.keys(cart).map((cartProductId) => {
      return {
        count: cart[cartProductId].count,
        product: cart[cartProductId].product._id,
      };
    });

    const result = await createOrder({ address, coupon, cart: cartItems });

    if (!('error' in result)) {
      dispatch(clearCart());
      reset();
      dispatch(
        showNotification({
          type: 'success',
          message: 'Order created successfully',
        })
      );
      navigate('/shop');
    }
  };

  const hasNotCartItems = Object.keys(cart).length === 0;

  return (
    <Paper sx={{ margin: 2, padding: 1 }}>
      <Box>
        <Typography>
          Total price:{' '}
          <strong>
            ${' '}
            {Object.keys(cart)
              .map((cartProductKey) => {
                const {
                  product: { price },
                  count,
                } = cart[cartProductKey];

                return price * count;
              })
              .reduce((a, b) => a + b, 0)
              .toFixed(2)}
          </strong>
        </Typography>
      </Box>

      <Box>
        <FormProvider onSubmit={handleFormSubmit} methods={formMethods}>
          <Box my={1}>
            <TextFieldAdapter
              name='address'
              label='Address'
              multiline={true}
              minRows={2}
              maxRows={5}
            />
          </Box>

          <Box my={1}>
            <TextFieldAdapter name='coupon' label='Got a coupon?' />
          </Box>

          <Button variant='contained' type='submit' disabled={hasNotCartItems}>
            Buy
          </Button>
        </FormProvider>
      </Box>
    </Paper>
  );
};

export default Checkout;
