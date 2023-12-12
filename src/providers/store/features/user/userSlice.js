import { createSlice } from '@reduxjs/toolkit';

import { usersApi } from '../../services/users';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.getCurrentUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user;
