import { configureStore } from '@reduxjs/toolkit';
import cartReduder from './cart/cartSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReduder,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
