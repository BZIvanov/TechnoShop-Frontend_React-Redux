import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';

import FormProvider from '../../../providers/form/FormProvider';
import { useForm } from '../../../providers/form/hooks/useForm';
import TextFieldAdapter from '../../../providers/form/form-fields/TextFieldAdapter/TextFieldAdapter';
import { formConfig } from './form-schema';

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

const ManageCoupon = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);

  const formMethods = useForm(formConfig);
  const { formState, reset } = formMethods;

  const handleCategorySubmit = (values) => {
    reset();
  };

  // TODO
  const loading = false;

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Coupons</Typography>

      <Divider sx={{ marginBlock: 2 }} />

      <Box sx={{ margin: 1 }}>
        <FormProvider onSubmit={handleCategorySubmit} methods={formMethods}>
          <Box my={1}>
            <TextFieldAdapter name='name' label='Coupon Name' />
          </Box>

          <Box my={1}>
            <TextFieldAdapter
              name='discount'
              label='Discount %'
              type='number'
            />
          </Box>

          <Button
            variant='contained'
            type='submit'
            disabled={formState.submitting || loading}
          >
            Create
          </Button>
        </FormProvider>
      </Box>

      <Divider sx={{ marginBlock: 2 }} />

      <Box>
        <Paper sx={{ margin: 1 }}>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Discount</TableCell>
                  <TableCell align='center'>Expiration Date</TableCell>
                  <TableCell align='center'>Created At</TableCell>
                  <TableCell align='center'>Remove</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default ManageCoupon;
