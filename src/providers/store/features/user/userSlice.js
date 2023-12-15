import { createSlice } from '@reduxjs/toolkit';

import { usersApi } from '../../services/users';

const initialState = {
  user: null,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        usersApi.endpoints.register.matchFulfilled,
        (state, action) => {
          state.user = action.payload.user;
        }
      )
      .addMatcher(usersApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addMatcher(usersApi.endpoints.logout.matchFulfilled, () => {
        return initialState;
      })
      .addMatcher(
        usersApi.endpoints.getCurrentUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload.user;
        }
      );
  },
});

export default userSlice.reducer;

export const selectUser = (state) => state.user.user;
