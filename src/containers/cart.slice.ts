import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../model/Products';
import { RootState } from '../store';

interface CartItems extends IProduct {
  quantity: number;
}
const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItems[],
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const productIndex = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (productIndex !== -1) {
        state[productIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productIndex = state.findIndex(
        (product) => product.id === action.payload
      );
      if (state[productIndex].quantity > 1) {
        state[productIndex].quantity -= 1;
      } else {
        return state.filter((product) => product.id !== action.payload);
      }
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      return state.filter((product) => product.id !== action.payload);
    },
  },
});

export const getCartItems = (state: RootState) => state.cart;
export const getTotalPrice = (state: RootState) =>
  state.cart.reduce((acc, next) => (acc += next.price * next.quantity), 0);

export const { addToCart, removeFromCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
