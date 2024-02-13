import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allError, signInFailure, signInStart, signInSuccess } from '../Redux/User/UserSlice'
import Googleauth from '../Components/Googleauth'

export default function SignIn() {
  const [formData, setFromData] = useState({})
  // const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(false)

  const { loading, error } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setFromData({
      ...formData,
      [event.target.id]: event.target.value,
    })
  }

  const submithandler = async (event) => {
    event.preventDefault();

    // setLoading(true);
    dispatch(signInStart())
    try {

      const res = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message))
        return;
      }
      // setLoading(false);
      // setError(null)
      dispatch(signInSuccess(data))

      navigate('/');

    } catch (error) {
      // setLoading(false);
      // setError(error.message)
      dispatch(signInFailure(error.message))
    }

  }

  useEffect(() => {
    dispatch(allError())
  }, [dispatch])

  // console.log(formData);

  return (
    <div className=' mx-auto max-w-lg'>
      <h1 className=' text-3xl mt-10 mb-7 text-center font-medium'>Sign In</h1>

      {error && <p className='text-red-600  bg-red-200 mt-5 text-center border-red-300 border-2 p-3 rounded-lg mb-5'>{error}</p>}

      <form action="" className=' flex flex-col gap-4' onSubmit={submithandler}>
        <input type="email" name="email" id="email" placeholder='Email' className=' border p-3 rounded-lg' onChange={changeHandler} />
        <input type="password" name="password" id="password" placeholder='Password' className=' border p-3 rounded-lg ' onChange={changeHandler} />

        <button disabled={loading} className=' bg-slate-700 hover:bg-slate-600 p-3 rounded-lg text-white'>{loading ? "Loading..." : "SIGN IN"}</button>

      </form>
      <Googleauth />    
      <p className=' pt-5'>Dont Have an account?  <span className=' text-blue-500'><Link to='/signup'>Sign up</Link></span></p>
    </div>
  )
}


