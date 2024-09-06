import React, { Fragment } from 'react'
import Profesiones from '../../pages/Profesiones';
import { Link } from 'react-router-dom';


function Profesion({profesion}) {

const {id, nombre, estado} = profesion; 

  return (
    <Fragment>
        <tr>
            <td className="tdProfesiones">{id}</td>
            <td className="tdProfesiones">{nombre}</td>
            <td className="tdProfesiones">{estado}</td>
            <td>
                <Link to={`modificar/${id}`}>
                  <button className="botonModificarProfesiones" id={id}>Modificar</button>
                </Link>
            </td>
        </tr>
    </Fragment>
  )
}

export default Profesion