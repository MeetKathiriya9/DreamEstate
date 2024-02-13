import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import PrivateRoute from '../Components/PrivateRoute'
import Profile from '../pages/Profile'
import CreateListing from '../pages/CreateListing'
import UpdateListing from '../pages/UpdateListing'
import Listing from '../pages/Listing'
import Search from '../pages/Search'


export default function Routs() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/signin" element={<SignIn></SignIn>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path='/listing/:id' element={<Listing></Listing>}></Route>
        <Route path='/search' element={<Search></Search>}></Route>
        <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/createlisting" element={<CreateListing></CreateListing>}></Route>
          <Route path="/updatelisting/:id" element={<UpdateListing></UpdateListing>}></Route>
        </Route>
      </Routes>

    </div>
  )
}
