import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allError, signInFailure, signInStart, signInSuccess } from '../Redux/User/UserSlice'
import Googleauth from '../Components/Googleauth'

export default function SignUp() {

  const [formData, setFromData] = useState({})
  // const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(false)

  const { loading, error } = useSelector((state) => state.user)
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatcher(allError())
  }, [dispatcher])

  const changeHandler = (event) => {
    setFromData({
      ...formData,
      [event.target.id]: event.target.value,
    })
  }

  const submithandler = async (event) => {
    event.preventDefault();

    try {
      // setLoading(true);

      dispatcher(signInStart());

      const res = await fetch("api/auth/insert", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();
      console.log(data);

      if (data.success == false) {
        // setLoading(false);
        // setError(data.message);
        dispatcher(signInFailure(data.message))
        return;
      }

      // setLoading(false);
      // navigate('/sign-in');
      dispatcher(signInSuccess(data))

      navigate("/signin")

    } catch (error) {
      // setLoading(false);
      // setError(error.message)
      dispatcher(signInFailure(error.message));
    }

  }



  console.log(formData);

  return (
    <div className=' mx-auto max-w-lg'>
      <h1 className=' text-3xl mt-10 mb-7 text-center font-medium'>Sign Up</h1>

      {error && <p className='text-red-600  bg-red-200 mt-5 text-center border-red-300 border-2 p-3 rounded-lg mb-5'>{error}</p>}

      <form action="" className=' flex flex-col gap-4' onSubmit={submithandler}>
        <input type="name" name="username" id="username" placeholder='Username' className=' border p-3 rounded-lg' onChange={changeHandler} />
        <input type="email" name="email" id="email" placeholder='Email' className=' border p-3 rounded-lg' onChange={changeHandler} />
        <input type="password" name="password" id="password" placeholder='Password' className=' border p-3 rounded-lg ' onChange={changeHandler} />

        <button disabled={loading} className=' bg-slate-700 hover:bg-slate-600 p-3 rounded-lg text-white'>{loading ? "Loading..." : "SIGN UP"}</button>
        <Googleauth />
      </form>

      <p className=' pt-5'>Have an account?  <span className=' text-blue-500'><Link to='/signin'>Sign in</Link></span></p>

    </div>
  )
}
