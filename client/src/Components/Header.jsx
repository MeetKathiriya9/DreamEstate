import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'


export default function Header() {

  const { currentUser } = useSelector((state) => state.user)
  const [searchTerm, setsearchTerm] = useState("")
  const navigate = useNavigate();

  const SubmitHandler = (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search)

    urlParams.set('searchTerm',searchTerm);

    const searchQuery = urlParams.toString();

    navigate(`search?${searchQuery}`);
  }

  useEffect(()=>{
      const urlParams = new URLSearchParams(location.search);
      const urlSearchTerm = urlParams.get('searchTerm')

      if(urlSearchTerm){
          setsearchTerm(urlSearchTerm);
      }

  },[location.search])

  return (
    <div>
      <header className=' bg-slate-200 shadow-md'>
        <div className=' max-w-6xl mx-auto p-3 flex justify-between items-center	'>

          <Link to="/" className=' text-2xl font-bold max-md:text-xl max-sm:text-base'>
            <h1 className='logo'><span className=' text-slate-500'>Dream</span><span className=' text-slate-700'>Estate</span></h1>
          </Link>

          <form onSubmit={SubmitHandler} action="" className='relative bg-slate-100 rounded-lg' autoComplete='off'>

            <input type="text" name='search' id='search' placeholder='Search...' className='p-3 text-sm w-80 rounded-lg focus:outline-none bg-transparent max-lg:w-60 max-md:w-40' value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)}/>

            <button>
                 <i className="ri-search-line absolute top-3 right-3"></i>
            </button>

          </form>

          <ul className='flex items-center'>

            <NavLink to="/" className='nav-link text-base relative z-10 max-sm:hidden'><p>Home</p></NavLink>
            <NavLink to="/about" className='nav-link text-base relative z-10 max-sm:hidden'><p>About</p></NavLink>

            {currentUser ? (
              <NavLink to='/profile'>
                <img src={currentUser.avatar} alt='profile'
                  className='rounded-full w-7 h-7 object-cover'></img>
              </NavLink>
            ) : (
              <NavLink to={'/signin'} className='nav-link text-base relative z-10'><p>Sign in</p></NavLink>
            )}

          </ul>

        </div>
      </header>

    </div>
  )
}
