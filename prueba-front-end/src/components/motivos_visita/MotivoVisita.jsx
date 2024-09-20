import React, { Fragment } from 'react'
import { Link } from "react-router-dom"
import styles from "./motivosVisita.module.css"

const MotivoVisita = ({motivo}) => {

  const{id, nombre, estado} = motivo

    return (
    <Fragment>
      <tr>
        <td className={styles.td}>{id}</td>
        <td className={styles.td}>{nombre}</td>
        <td className={styles.td}>{estado}</td>
        <td>
          <Link to={`modificar/${id}`}>
            <button className={styles.botonModificarMotivos} id={id}>Modificar</button>
          </Link>
        </td>
      </tr>
    </Fragment>
  )
}

export default MotivoVisita;