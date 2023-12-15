import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useSelector, useDispatch } from '../../../providers/store/store';
import {
  selectNotification,
  hideNotification,
} from '../../../providers/store/features/notification/notificationSlice';

const ApiNotification = () => {
  const dispatch = useDispatch();

  const { type, message } = useSelector(selectNotification);

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <>
      {message ? (
        <Snackbar
          open={!!message}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity={type}>
            {message}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
};

export default ApiNotification;
