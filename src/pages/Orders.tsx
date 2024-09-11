import { redirect, useLoaderData } from "react-router-dom"
import { toast } from "react-toastify"
import { customFetch } from "../utils"
import { ComplexPaginationContainer, OrdersList, SectionTitle } from "../components"

import { QueryClient } from '@tanstack/react-query'
import { throwErrorWithResponse } from "../utils/helpers"
import type { Store } from '@reduxjs/toolkit'

interface ParamsProps {
  [k: string]: string
}

interface UserProps {
  username: string,
  token: string
}

const ordersQuery = (params: ParamsProps, user: UserProps) => {
  const { username, token } = user

  return {
    queryKey: ['orders', username, params.page ? parseInt(params.page) : 1],
    queryFn: () => customFetch('/orders', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

  }
}

export const loader = (store: Store, queryClient: QueryClient) => async ({ request }: { request: Request }) => {
  const user = store.getState().user.user

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])

  if (!user) {
    toast.warning('Please log in')
    return redirect('/login')
  }


  try {
    const response = await queryClient.ensureQueryData(ordersQuery(params, user))

    return { orders: response.data.data, meta: response.data.meta }

  } catch (error: unknown) {

    return throwErrorWithResponse(error, 'there was an error accessing your orders')

  }

}

interface LoaderDataProps {
  meta: MetaProps
}


const Orders = () => {

  const { meta } = useLoaderData() as LoaderDataProps

  if (meta.pagination.total < 1) {
    return <SectionTitle text='Please make an order' />
  }
  return (
    <>
      <SectionTitle text='Your Orders' />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  )
}

export default Orders