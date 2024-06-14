import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },

    addItem: (state, action) => {
      const { id } = action.payload.product;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity++;
        state.items[existingItemIndex].totalPrice =
          state.items[existingItemIndex].quantity *
          state.items[existingItemIndex].price;
      } else {
        const newItem = {
          ...action.payload.product,
          quantity: 1,
          totalPrice: action.payload.product.price,
        };
        state.items.push(newItem);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    incrementQuantity: (state, action) => {
      const itemToIncrement = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToIncrement) {
        itemToIncrement.quantity++;
        itemToIncrement.totalPrice =
          itemToIncrement.price * itemToIncrement.quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    decrementQuantity: (state, action) => {
      const itemToDecrement = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToDecrement && itemToDecrement.quantity > 1) {
        itemToDecrement.quantity--;
        itemToDecrement.totalPrice =
          itemToDecrement.price * itemToDecrement.quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
  },
});

export const {
  addItem,
  setItems,
  removeItem,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
