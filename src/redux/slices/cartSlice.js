import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
        });

        state.cartItems = JSON.parse(JSON.stringify(state.cartItems));
        console.log(state.cartItems);
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.totalPrice);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    removeItem: (state, action) => {
      const id = action.payload;
      console.log(id);
      state.cartItems = JSON.parse(JSON.stringify(state.cartItems));
      const existingItem = state.cartItems.find((item) => item.id === id);

      console.log(existingItem);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);

        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
