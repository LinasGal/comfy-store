import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface CartItemProps {
  cartID: string;
  productID: number;
  image: string;
  title: string;
  price: string;
  amount: number;
  productColor: string;
  company: string;
}

interface InitialStateProps {
  cartItems: CartItemProps[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
}

const initialState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getInitialStateFromLocalStorage = (): InitialStateProps => {
  const storedCart = localStorage.getItem('cart');

  return storedCart ? JSON.parse(storedCart) : initialState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialStateFromLocalStorage(),
  reducers: {
    addItem: (state, { payload }) => {
      const product = payload.product;
      const cartItems = state.cartItems;

      const item = cartItems.find((i) => i.cartID === product.cartID);

      if (item) {
        item.amount += product.amount;
      } else {
        cartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.success('Item added to cart');
    },
    clearCart: (state) => {
      localStorage.setItem('cart', JSON.stringify(initialState));
      return initialState;
    },
    removeItem: (state, { payload }) => {
      const { cartID } = payload.product;
      const item = state.cartItems.find((i) => i.cartID === cartID)!;

      state.cartItems = state.cartItems.filter((i) => i.cartID !== item.cartID);

      state.numItemsInCart = state.numItemsInCart - item.amount;
      state.cartTotal = state.cartTotal - parseInt(item.price) * item.amount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.error('Item removed from cart');
    },
    editItem: (state, { payload }) => {
      const { cartID, amount } = payload.product;
      const item = state.cartItems.find((i) => i.cartID === cartID)!;

      state.numItemsInCart += amount - item.amount;
      state.cartTotal += +item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);

      toast.success('Cart updated');
    },
    calculateTotals: (state) => {
      state.tax = state.cartTotal * 0.1;
      state.orderTotal = state.cartTotal + state.tax + state.shipping;

      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;
export default cartSlice.reducer;
