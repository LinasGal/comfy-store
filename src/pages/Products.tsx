import { customFetch } from "../utils"
import { Filters, ProductsContainer, PaginationContainer } from "../components"

import { QueryClient } from "@tanstack/react-query"

const url = '/products'


const productsQuery = (params: { [k: string]: string }) => {
  const { search, category, company, sort, price, shipping, page } = params
  return {
    queryKey: ['products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1],

    queryFn: () => customFetch(url, { params })
  }
}

export const loader = (queryClient: QueryClient) => async ({ request }: { request: Request }) => {

  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])
  const response = await queryClient.ensureQueryData(productsQuery(params))

  const products = response.data.data
  const meta = response.data.meta



  return { products, meta, params }
}

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  )
}

export default Products