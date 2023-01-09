import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");

    return JSON.parse(cart);
  }
};
// Initial state
const initialState = {
  isCartOpen: false,
  cart: loadCart() || {},
};

// Actual Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const isItemInCart = state.cart.hasOwnProperty(action.payload.name);
      if (!isItemInCart) {
        state.cart[action.payload.name] = {
          ...action.payload,
          qty: 1,
        };
      } else {
        state.cart[action.payload.name].qty++;
      }
    },

    removeFromCart: (state, action) => {
      delete state.cart[action.payload.name];
    },
    increaseCount: (state, action) => {
      state.cart[action.payload.name].qty++;
    },
    decreaseCount: (state, action) => {
      if (state.cart[action.payload.name].qty === 1) {
        delete state.cart[action.payload.name];
      } else {
        state.cart[action.payload.name].qty--;
      }
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

// Selectors

export const selectCart = (state) => state.cart;

// Actions

export const {
  setCart,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

// Cart Reducer

export default cartSlice.reducer;
