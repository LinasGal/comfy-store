import { useSelector } from "react-redux"
import CartItem from "./CartItem"

import { CartProps } from '../utils/types'

const CartItemsList = () => {
  const { cartItems } = useSelector((store: CartProps) => store.cart)

  return (
    <div>
      {cartItems.map(item => <CartItem key={item.cartID} cartItem={item} />)}
    </div>
  )
}

export default CartItemsList