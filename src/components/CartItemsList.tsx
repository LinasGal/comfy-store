import { useAppSelector } from '../features/hooks'
import CartItem from "./CartItem"


const CartItemsList = () => {
  const { cartItems } = useAppSelector((store) => store.cart)

  return (
    <div>
      {cartItems.map(item => <CartItem key={item.cartID} cartItem={item} />)}
    </div>
  )
}

export default CartItemsList