import {  useAppSelector } from '../features/hooks'
import { formatPrice } from "../utils/helpers"


const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useAppSelector((store) => store.cart)


  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <p className="flex justify-between text-xs border-b border-base-300 pb-2"><span >Subtotal</span><span>{formatPrice(cartTotal)}</span></p>
        <p className="flex justify-between text-xs border-b border-base-300 pb-2"><span >Shipping</span><span>{formatPrice(shipping)}</span></p>
        <p className="flex justify-between text-xs border-b border-base-300 pb-2"><span >Tax</span><span>{formatPrice(tax)}</span></p>
        <p className="mt-4 flex justify-between text-sm  pb-2"><span className="font-bold">Tax</span><span className="Order Total">{formatPrice(orderTotal)}</span></p>
      </div>
    </div>
  )
}

export default CartTotals