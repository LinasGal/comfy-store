import { configureStore } from '@reduxjs/toolkit';
import cartReduder from './cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReduder,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
