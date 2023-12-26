import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: '',
  price: [0, 4999],
  categories: [],
  subcategories: [],
  rating: null,
  shipping: '',
};

const productsFiltersSlice = createSlice({
  name: 'productFilters',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { changeFilter } = productsFiltersSlice.actions;

export default productsFiltersSlice.reducer;

export const selectFilters = (state) => state.productsFilters;
