import { configureStore } from '@reduxjs/toolkit';
import cart from './cart.slice';
const store = configureStore({
  reducer: {
    cart,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
