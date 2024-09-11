import { Form, useLoaderData, Link } from 'react-router-dom'
import { FormInput, FormSelect, FormRange, FormCheckbox } from './index'

interface ParamsProps {
  search: string,
  company: string,
  category: string,
  order: string,
  price: string,
  shipping: string
}

interface LoaderDataProps {
  meta: MetaProps,
  params: ParamsProps
}


const Filters = () => {
  const { meta: { categories, companies }, params } = useLoaderData() as LoaderDataProps

  const { search, company, category, order, price, shipping } = params

  const isShippingFree = shipping === 'on' ? true : false


  return (
    <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
      {/* SEARCH */}
      <FormInput
        type='search'
        label='search product'
        name='search'
        size='input-sm'
        defaultValue={search}
      />

      {/* CATEGORIES */}
      <FormSelect
        label='select category'
        name='category'
        list={categories}
        size='select-sm'
        defaultValue={category}

      />
      {/* COMPANIES */}
      <FormSelect
        label='select company'
        name='company'
        list={companies}
        size='select-sm'
        defaultValue={company}

      />
      {/* ORDER */}
      <FormSelect
        label='sort by'
        name='order'
        list={['a-z', 'z-a', 'high', 'low']}
        size='select-sm'
        defaultValue={order}

      />
      {/* Price */}
      <FormRange name='price' label='select price' size='range-sm' price={price} />

      {/* Shipping */}
      <FormCheckbox label='free shipping' name='shipping' size='checkbox-sm' defaultValue={isShippingFree} />

      {/* BUTTONS */}
      <button type='submit' className='btn btn-primary btn-sm uppercase'>
        search
      </button>
      <Link to='/products' className='btn btn-accent btn-sm uppercase'>
        reset
      </Link>
    </Form>
  )
}

export default Filters