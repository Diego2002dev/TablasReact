/* eslint-disable no-unused-vars */
import Header from './BarraLateral'
import { Outlet } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import Ticket from '../components/ticket/Ticket'
import Prueba from '../components/ticket/Prueba'
import { GlobalStateProvider } from '../components/context/GlobalStateProvider'
import Print from '../components/ticket/Print'


function Principal() {
  return (
    <>
      <GlobalStateProvider>

        {/* <Prueba /> */}
        {/* <Print /> */}
        <Header />
        <Outlet />
      </GlobalStateProvider>
    </>
  )
}

export default Principal