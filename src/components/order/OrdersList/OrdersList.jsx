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

import { useSelector } from '../../../providers/store/store';
import { selectUser } from '../../../providers/store/features/user/userSlice';

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

const OrdersList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[1]);

  const user = useSelector(selectUser);

  const isUserAdmin = user && user.role === 'admin';

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Orders</Typography>

      <Divider sx={{ marginBlock: 2 }} />

      <Box>
        <Paper sx={{ margin: 1 }}>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align='center'>Order ID</TableCell>
                  <TableCell align='center'>Created At</TableCell>
                  {isUserAdmin && (
                    <TableCell align='center'>Ordered By</TableCell>
                  )}
                  <TableCell align='center'>Total Amount</TableCell>
                  <TableCell align='center'>Delivery Address</TableCell>
                  <TableCell align='center'>Coupon</TableCell>
                  <TableCell align='center'>Order Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  // make every two rows with different color (1 and 2, then 5 and 6)
                  // should be every two, because of the additional expandable row
                  '& > tr:nth-of-type(4n-2), & > tr:nth-of-type(4n-3)': {
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                }}
              ></TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default OrdersList;
