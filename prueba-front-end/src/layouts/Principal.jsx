import React, { Fragment } from 'react'
import Header from './BarraLateral'
import { Outlet } from 'react-router-dom'
import Ticket from '../components/ticket/Ticket'


function Principal() {
  return (
    <Fragment>

      {/* <Ticket></Ticket> */}
      <Header />
      <Outlet />
    
    </Fragment>
    
  )
}

export default Principal