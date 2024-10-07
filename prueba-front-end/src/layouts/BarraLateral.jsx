import "./barraLateral.css"
import { Link, useLocation } from 'react-router-dom'

export function Header() {
  return (
    <div id="barra">
        <nav>
            <ul>
              <li id="principal"><Link to="/" className={useLocation().pathname === '/' ? 'active-link' : ''}>Principal</Link></li>
              <li><Link to="clientes" id="clientes" className={useLocation().pathname.startsWith('/clientes') ? 'active-linkClientes' : ''}>Clientes</Link></li>
              <li><Link to="motivos" id="motivos" className={useLocation().pathname.startsWith('/motivos') ? 'active-linkMotivos' : ''}>Motivos</Link></li>
              <li><Link to="profesiones" id="profesiones" className={useLocation().pathname.startsWith('/profesiones') ? 'active-linkProfesiones' : ''}>Profesiones</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header