import React, { Fragment } from 'react'
import { Link } from "react-router-dom";

const MotivoVisita = ({motivo}) => {

  const{id, nombre, estado} = motivo

    return (
    <Fragment>
      <tr>
        <td className='td'>{id}</td>
        <td className='td'>{nombre}</td>
        <td className='td'>{estado}</td>
        <td>
          <Link to={`modificar/${id}`}>
            <button className="botonModificarMotivos" id={id}>Modificar</button>
          </Link>
        </td>
      </tr>
    </Fragment>
  )
}

export default MotivoVisita;