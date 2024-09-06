import React, { Fragment } from 'react'
import Header from './BarraLateral'
import { Outlet } from 'react-router-dom'


function Principal() {
  return (
    <Fragment>

      <Header/>
      <Outlet />
    
    </Fragment>
    
  )
}

export default Principal