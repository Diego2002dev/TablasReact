import React, { Fragment } from 'react'
import Profesiones from '../../pages/Profesiones';
import { Link } from 'react-router-dom';
import styles from "./profesiones.module.css";

function Profesion({profesion}) {

const {id, nombre, estado} = profesion; 

  return (
    <Fragment>
        <tr>
            <td className={styles.tdProfesiones}>{id}</td>
            <td className={styles.tdProfesiones}>{nombre}</td>
            <td className={styles.tdProfesiones}>{estado}</td>
            <td>
                <Link to={`modificar/${id}`}>
                  <button className={styles.botonModificarProfesiones} id={id}>Modificar</button>
                </Link>
            </td>
        </tr>
    </Fragment>
  )
}

export default Profesion