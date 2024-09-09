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

interface CartProps {
  cart: {
    cartItems: CartItemProps[];
    numItemsInCart: number;
    cartTotal: number;
    shipping: number;
    tax: number;
    orderTotal: number;
  };
}

export type { CartProps, CartItemProps };
