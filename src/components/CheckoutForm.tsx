import { Form, redirect } from 'react-router-dom'
import FormInput from './FormInput'
import SubmitBtn from './SubmitBtn'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { clearCart } from '../features/cart/cartSlice'
import { formatPrice, throwErrorWithResponse } from '../utils/helpers'
import { ActionFunctionArgs } from "react-router"
import { QueryClient } from '@tanstack/react-query'

import type { Store } from '@reduxjs/toolkit'

export const action =
  (store: Store, queryClient: QueryClient) =>
    async ({ request }: ActionFunctionArgs) => {

      const formData = await request.formData()
      const { name, address } = Object.fromEntries(formData)
      const user = store.getState().user.user
      const { cartItems, orderTotal, numItemsInCart } =
        store.getState().cart

      const info = {
        name,
        address,
        chargeTotal: orderTotal,
        orderTotal: formatPrice(orderTotal),
        cartItems,
        numItemsInCart,
      }
      try {
        await customFetch.post(
          '/orders',
          { data: info },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )

        queryClient.removeQueries(['orders'])
        store.dispatch(clearCart())
        toast.success('order placed successfully')
        return redirect('/orders')

      } catch (error: unknown) {

        return throwErrorWithResponse(error, 'there was an error placing your order')

      }
    }

const CheckoutForm = () => {
  return (
    <Form method='POST' className='flex flex-col gap-y-4'>
      <h4 className='font-medium text-xl'>Shipping Information</h4>
      <FormInput label='first name' name='name' type='text' />
      <FormInput label='address' name='address' type='text' />
      <div className='mt-4'>
        <SubmitBtn text='Place Your Order' />
      </div>
    </Form>
  )
}

export default CheckoutForm