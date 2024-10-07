/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import styles from "./motivosVisita.module.css"

const MotivoVisita = ({motivo, onRowClick, rowSeleccionada}) => {

  const{id, nombre, estado} = motivo

    return (
    <>
      <tr onDoubleClick={() => onRowClick(id)} className={rowSeleccionada.motivos[id] ? styles.filaSeleccionada : "" }>
        <td className={styles.td}>{id}</td>
        <td className={styles.td}>{nombre}</td>
        <td className={styles.td}>{estado}</td>
        <td>
          <Link to={`modificar/${id}`}>
            <button className={styles.botonModificarMotivos} id={id}>Modificar</button>
          </Link>
        </td>
      </tr>
    </>
  )
}

export default MotivoVisita;