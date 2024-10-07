/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from "./profesiones.module.css";

function Profesion({profesion, onRowClick, rowSeleccionada}) {

const {id, nombre, estado} = profesion;

  return (
        <tr onDoubleClick={() => onRowClick(id)} className={rowSeleccionada.profesiones[id] ? styles.filaSeleccionada : "" }>
            <td className={styles.tdProfesiones}>{id}</td>
            <td className={styles.tdProfesiones}>{nombre}</td>
            <td className={styles.tdProfesiones}>{estado}</td>
            <td>
                <Link to={`modificar/${id}`}>
                  <button className={styles.botonModificarProfesiones} id={id}>Modificar</button>
                </Link>
            </td>
        </tr>
  )
}

export default Profesion