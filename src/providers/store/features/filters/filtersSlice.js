import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: '',
  shipping: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { changeFilter } = filtersSlice.actions;

export default filtersSlice.reducer;

export const selectFilters = (state) => state.filters;
