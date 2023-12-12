import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, count } = action.payload;
      state.cart[product._id] = { product, count };
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
