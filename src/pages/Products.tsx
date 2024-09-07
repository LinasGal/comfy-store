import { customFetch } from "../utils"
import { Filters, ProductsContainer } from "../components"


export const loader = async () => {
  const response = await customFetch('/products')

  const products = response.data.data
  const meta = response.data.meta
  return { products, meta }

}

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
    </>
  )
}

export default Products