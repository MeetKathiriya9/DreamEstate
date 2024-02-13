import React from 'react'
import Header from './Header'
import Routes from '../Routers/Routs'

export default function Layout() {
  return (
    <div>
      <Header></Header>

      <div>
        <Routes></Routes>
      </div>
    </div>
  )
}
