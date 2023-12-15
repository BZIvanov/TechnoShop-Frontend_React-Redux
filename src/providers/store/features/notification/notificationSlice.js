import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'success',
  message: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      const { type, message } = action.payload;

      state.type = type;
      state.message = message;
    },
    hideNotification: () => {
      return initialState;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

export const selectNotification = (state) => state.notification;
