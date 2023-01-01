import { createSlice } from "@reduxjs/toolkit";
// import { HYDRATE } from "next-redux-wrapper";

// Initial state
const initialState = {
  isCartOpen: false,
  cart: [{ qty: 2 }, { qty: 5 }, { qty: 3 }],
  cartItems: {},
  items: [],
};

// Actual Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      // const { item } = action.payload;
      const isItemInCart = state.cartItems.hasOwnProperty(action.payload.name);
      if (!isItemInCart) {
        state.cart.push(action.payload);
        state.cartItems[action.payload.name] = {
          ...action.payload,
          qty: 1,
        };
      } else {
        state.cartItems[action.payload.name].qty++;
      }
    },

    removeFromCart: (state, action) => {
      delete state.cartItems[action.payload.name];
    },
    increaseCount: (state, action) => {
      state.cartItems[action.payload.name].qty++;
    },
    decreaseCount: (state, action) => {
      if (state.cartItems[action.payload.name].qty === 1) {
        delete state.cartItems[action.payload.name];
      } else {
        state.cartItems[action.payload.name].qty--;
      }
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(HYDRATE, (state, action) => ({
  //       ...state,
  //       ...action.payload.cart,
  //     }));
  //   },
});

// Selectors

export const selectCart = (state) => state.cart;

// Actions

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

// Cart Reducer

export default cartSlice.reducer;
