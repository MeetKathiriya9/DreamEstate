import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'


export default function Header() {

  const { currentUser } = useSelector((state) => state.user)
  const [searchTerm, setsearchTerm] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const SubmitHandler = (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search)

    urlParams.set('searchTerm', searchTerm);

    const searchQuery = urlParams.toString();

    navigate(`search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlSearchTerm = urlParams.get('searchTerm')

    if (urlSearchTerm) {
      setsearchTerm(urlSearchTerm);
    }

  }, [location.search])

  return (
    <div>
      <header className=' bg-slate-200 shadow-md'>
        <div className={`${isMenuOpen ? 'navbar_mb' : ''}  max-w-6xl mx-auto p-3 flex justify-between items-center relative`}>

          <Link to="/" className=' text-2xl font-bold max-md:text-xl max-sm:text-base'>
            <h1 className='logo'><span className=' text-slate-500'>Dream</span><span className=' text-slate-700'>Estate</span></h1>
          </Link>

          <form onSubmit={SubmitHandler} action="" className='relative bg-slate-100 rounded-lg max-sm:hidden' autoComplete='off'>

            <input type="text" name='search' id='search' placeholder='Search...' className='p-3 text-sm w-80 rounded-lg focus:outline-none bg-transparent max-lg:w-60 max-md:w-40' value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} />

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

            <span></span>
            <div className="block sm:hidden">
              <input
                type="checkbox"
                id="menu-toggle"
                className="hidden"
                checked={isMenuOpen}
                onChange={() => setIsMenuOpen(!isMenuOpen)}
              />
              <label htmlFor="menu-toggle" className="text-black cursor-pointer sm:hidden">
                <i className="ri-menu-line text-3xl ps-2"></i>
              </label>
            </div>

          </ul>




          {/* <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id="navbar-user">
 

             <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
               <li>
                  <a href="#" className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>Home</a>
                </li>    
               <li>
                  <a href="#" className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>About</a>
                </li>    
                 
             </ul>   
             
              
          </div> */}



        </div>

        <div className={`lg:flex lg:items-center absolute top-0 bg-slate-500 w-full text-center p-0 lg:w-auto ${isMenuOpen ? '' : 'hidden'}`} id="navbar">

          <div className="relative">
            <input
              type="checkbox"
              id="menu-toggle"
              className="hidden"
              checked={isMenuOpen}
              onChange={() => setIsMenuOpen(!isMenuOpen)}
            />
            <label htmlFor="menu-toggle" className="text-white cursor-pointer right-0 absolute min-[640px]:hidden">
              <i className="ri-close-line text-3xl ps-2"></i>
            </label>
          </div>

          <ul className="text-white text-lg font-semibold lg:flex justify-end leading-6 z-10 min-[640px]:hidden">
            <li className='py-4 hover:bg-slate-400 hover:text-white'><Link to="/" className='min-[640px]:hidden'>Home</Link></li>

            <li className='py-4 hover:bg-slate-400 hover:text-white'><Link to="/about" className='min-[640px]:hidden'>About</Link></li>
          </ul>
        </div>
      </header>

    </div>
  )
}
