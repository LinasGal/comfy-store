import { FormInput, SubmitBtn } from '../components/index'
import { Form, Link, redirect, useNavigate } from 'react-router-dom'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { loginUser } from '../features/user/userSlice'
import { useAppDispatch } from '../features/hooks'
import type { ActionFunctionArgs } from "react-router"

import type { Store } from '@reduxjs/toolkit'


export const action = (store: Store) => async ({ request }: ActionFunctionArgs) => {

  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    const response = await customFetch.post('auth/local', data)
    store.dispatch(loginUser(response.data))

    toast.success('Logged in successfully')
    return redirect('/')

  } catch (error) {
    console.log(error)
    toast.error('details are missing')
    return null
  }

}


const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret'
      })

      dispatch(loginUser(response.data))
      toast.success('welcome guest user')
      navigate('/')

    } catch (error) {
      console.log(error)

      toast.error('guest user login error.please try later.')
    }
  }


  return (
    <section className='h-screen grid place-items-center'>
      <Form
        method='post'
        className='card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Login</h4>
        <FormInput type='email' label='email' name='identifier' />
        <FormInput type='password' label='password' name='password' />
        <div className='mt-4'>
          <SubmitBtn text='login' />
        </div>
        <button
          type='button'
          className='btn btn-secondary btn-block uppercase'
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className='text-center'>
          Not a member yet?{' '}
          <Link
            to='/register'
            className='ml-2 link link-hover link-primary capitalize'
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  )
}

export default Login