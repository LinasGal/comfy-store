import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,

} from './pages'

import { ErrorElement } from './components'

//loaders
import { loader as LandingLoader } from './pages/Landing'
import { loader as SingleProductLoader } from './pages/SingleProduct'
import { loader as ProductsLoader } from './pages/Products'
import { loader as CheckoutLoader } from './pages/Checkout'
import { loader as OrdersLoader } from './pages/Orders'

//actions
import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import { action as checkoutAction } from './components/CheckoutForm'
//store
import { store } from './features/store'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5
    }
  }
})



const router = createBrowserRouter([{
  path: '/',
  element: <HomeLayout />,
  errorElement: <Error />,
  children: [
    {
      index: true,
      element: <Landing />,
      errorElement: <ErrorElement />,
      loader: LandingLoader(queryClient)
    },
    {
      path: 'products',
      element: <Products />,
      loader: ProductsLoader(queryClient)
    },
    {
      path: 'products/:id',
      element: <SingleProduct />,
      errorElement: <ErrorElement />,
      loader: ({ params }) => SingleProductLoader(queryClient)({ params: { id: params.id! } })
    },
    {
      path: 'cart',
      element: <Cart />,
    },
    { path: 'about', element: <About /> },
    {
      path: 'checkout',
      element: <Checkout />,
      loader: CheckoutLoader(store),
      action: checkoutAction(store, queryClient)
    },
    {
      path: 'orders',
      element: <Orders />,
      loader: OrdersLoader(store, queryClient)
    },
  ],
},
{
  path: '/login',
  element: <Login />,
  errorElement: <Error />,
  action: loginAction(store)
},
{
  path: '/register',
  element: <Register />,
  errorElement: <Error />,
  action: registerAction
},])
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}


export default App