import { useSelector } from "react-redux"
import { CartTotals, CheckoutForm, SectionTitle } from "../components"
import { redirect } from "react-router-dom"
import { toast } from "react-toastify"

import { RootState } from '../features/store'

export const loader = (store) => async () => {
  const user = store.getState().user.user

  if (!user) {
    toast.warn('You must be logged in to checkout')
    return redirect('/login')
  }
  return null
}

const Checkout = () => {

  const { cartTotal } = useSelector((store: RootState) => store.cart)

  if (!cartTotal) {
    return <SectionTitle text="Your cart is empty" />
  }

  return (
    <>
      <SectionTitle text="Place your order" />

      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  )
}

export default Checkout