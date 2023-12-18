import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FormProvider from '../../../providers/form/FormProvider';
import { useForm } from '../../../providers/form/hooks/useForm';
import TextFieldAdapter from '../../../providers/form/form-fields/TextFieldAdapter/TextFieldAdapter';
import SelectDropdownAdapter from '../../../providers/form/form-fields/SelectDropdownAdapter/SelectDropdownAdapter';
import { formConfig } from './form-schema';

const ManageProduct = () => {
  const { productId } = useParams();

  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // we will have these, when editing a product

  const formMethods = useForm(formConfig);
  const { formState, reset, watch, setValue } = formMethods;

  const handleProductSubmit = (values) => {
    if (productId) {
      // dispatch(
      //   updateProductAction({
      //     productId,
      //     existingImages,
      //     ...values,
      //   })
      // );
    } else {
      // dispatch(createProductAction(values));
    }

    reset();
    setExistingImages([]);
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Product Form</Typography>

      <Box sx={{ width: '99%' }}>
        <FormProvider onSubmit={handleProductSubmit} methods={formMethods}>
          <Box my={1}>
            <TextFieldAdapter name='title' label='Title' />
          </Box>
          <Box my={1}>
            <TextFieldAdapter name='description' label='Description' />
          </Box>
          <Box my={1}>
            <TextFieldAdapter name='price' label='Price' type='number' />
          </Box>
          <Box my={1}>
            <SelectDropdownAdapter
              name='shipping'
              label='Shipping'
              options={['Yes', 'No']}
            />
          </Box>
          <Box my={1}>
            <TextFieldAdapter name='quantity' label='Quantity' type='number' />
          </Box>
          <Box my={1}>
            <TextFieldAdapter name='color' label='Color' />
          </Box>
          <Box my={1}>
            <TextFieldAdapter name='brand' label='Brand' />
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default ManageProduct;
