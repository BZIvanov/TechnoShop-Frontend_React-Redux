import { isRejectedWithValue } from '@reduxjs/toolkit';

import { showNotification } from '../features/notification/notificationSlice';

// dispatch notification action which will be used by MUI Snackbar to display the Alert as a global app component
export const asyncErrorNotification =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      dispatch(
        showNotification({ type: 'error', message: action.payload.data.error })
      );
    }

    return next(action);
  };
