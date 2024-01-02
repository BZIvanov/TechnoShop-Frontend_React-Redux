import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { format, parseISO } from 'date-fns';

import FormProvider from '../../../providers/form/FormProvider';
import { useForm } from '../../../providers/form/hooks/useForm';
import TextFieldAdapter from '../../../providers/form/formFields/TextFieldAdapter';
import DatePickerFieldAdapter from '../../../providers/form/formFields/DatePickerFieldAdapter';
import {
  useGetCouponsQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
} from '../../../providers/store/services/coupons';
import { DeleteIcon } from '../../mui/Icons';
import ConfirmDialog from '../../common/dialogs/ConfirmDialog/ConfirmDialog';
import { formConfig } from './form-schema';

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

const ManageCoupon = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);

  const { data } = useGetCouponsQuery({ page, perPage: rowsPerPage });
  const { coupons = [], totalCount = 0 } = data || {};
  const [createCoupon] = useCreateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const formMethods = useForm(formConfig);
  const { formState, reset } = formMethods;

  const handleCategorySubmit = (values) => {
    createCoupon(values);
    reset();
  };

  const [removeCouponDialog, setRemoveCouponDialog] = useState({
    open: false,
    text: '',
    onConfirm: () => {},
  });

  const handleCouponDelete = (couponId) => () => {
    setRemoveCouponDialog({
      open: false,
      text: '',
      onConfirm: () => {},
    });

    deleteCoupon(couponId);
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

          <Box my={1}>
            <DatePickerFieldAdapter
              name='expirationDate'
              label='Expiration Date'
              disablePast={true}
            />
          </Box>

          <Button
            variant='contained'
            type='submit'
            disabled={formState.submitting || loading}
          >
            Create Coupon
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
              <TableBody>
                {coupons.map(
                  ({ _id, name, discount, expirationDate, createdAt }) => {
                    return (
                      <TableRow key={_id}>
                        <TableCell align='center'>{name}</TableCell>
                        <TableCell align='center'>
                          - {discount.toFixed(2)} %
                        </TableCell>
                        <TableCell align='center'>
                          {format(parseISO(expirationDate), 'dd-MMM-yyyy')}
                        </TableCell>
                        <TableCell align='center'>
                          {format(parseISO(createdAt), 'dd-MMM-yyyy')}
                        </TableCell>
                        <TableCell align='center'>
                          <IconButton
                            size='small'
                            onClick={() => {
                              setRemoveCouponDialog({
                                open: true,
                                text: 'Are you sure you want to delete this coupon?',
                                onConfirm: handleCouponDelete(_id),
                              });
                            }}
                          >
                            <DeleteIcon fontSize='inherit' />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            component='div'
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>
      </Box>

      <ConfirmDialog
        dialogConfig={removeCouponDialog}
        setDialogConfig={setRemoveCouponDialog}
      />
    </Box>
  );
};

export default ManageCoupon;
