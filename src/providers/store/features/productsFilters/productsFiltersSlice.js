import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: '',
  price: [0, 4999],
  categories: [],
  subcategories: [],
  rating: null,
  shipping: '',
  brands: [],
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
export const selectTextFilter = (state) => state.productsFilters.text;
export const selectPriceFilter = (state) => state.productsFilters.price;
export const selectCategoriesFilter = (state) =>
  state.productsFilters.categories;
export const selectSubcategoriesFilter = (state) =>
  state.productsFilters.subcategories;
export const selectRatingFilter = (state) => state.productsFilters.rating;
export const selectShippingFilter = (state) => state.productsFilters.shipping;
export const selectBrandsFilter = (state) => state.productsFilters.brands;
