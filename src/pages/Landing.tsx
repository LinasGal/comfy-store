import { Hero, FeaturedProducts } from '../components'
import { customFetch } from '../utils'

const url = '/products?featured=true'
import { QueryClient } from '@tanstack/react-query'

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch(url)
}

export const loader = (queryClient: QueryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery)
  const products = response.data.data

  return { products }
}


const Landing = () => {

  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}

export default Landing