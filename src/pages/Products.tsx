import { customFetch } from "../utils"
import { Filters, ProductsContainer, PaginationContainer } from "../components"
import type { ActionFunction } from "react-router"

const url = '/products'


export const loader: ActionFunction = async ({ request }) => {

  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])

  const response = await customFetch(url, { params })

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