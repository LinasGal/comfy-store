import { Link, useLoaderData } from "react-router-dom"

//helpers
import { formatPrice } from "../utils/helpers"

interface ProductProps {
  id: number,
  attributes: {
    title: string,
    price: string,
    image: string
  }
}
interface LoaderDataProps {
  products: ProductProps[]
}


const ProductsGrid = () => {
  const data = useLoaderData() as LoaderDataProps
  const products = data.products

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { id, attributes: { title, price, image } } = product

        return < SingleProduct key={id} id={id} title={title} price={price} image={image} />

      })}
    </div>
  )
}


interface SingleProductProps {
  title: string,
  price: string,
  image: string,
  id: number
}

const SingleProduct = ({ title, price, image, id }: SingleProductProps) => {
  return (
    <Link to={`/products/${id}`} className="card w-full  shadow-xl hover:shadow-2xl transition duration-300">
      <figure className='px-4 pt-4'>
        <img src={image} alt={title} className="rounded-xl h-64 md:h-48 w-full object-cover" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="capitalize">{title}</h2>
        <span className="text-secondary">{formatPrice(price)}</span>
      </div>
    </Link>)
}

export default ProductsGrid