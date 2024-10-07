/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import styles from "./clientes.module.css"

export default function Cliente({cliente, checks, onRowClick, rowSeleccionada}) {
 
 const { id, nombre, apellidos, dni, email, telefono_fijo, telefono_movil,
         profesion, direccion, codigo_postal, ciudad, provincia, fecha_nacimiento, sexo,
         mailing, sms, motivo_visita, observaciones, estado, fecha_alta, hora } = cliente


return (
    
    <>
        <tr onDoubleClick={() => onRowClick(id)} className={rowSeleccionada.clientes[id] ? styles.filaSeleccionada : "" }>

            

            <td className={styles.tdClientes}>{id}</td>
            <td className={styles.tdClientes} style={{display: checks.nombre ? "" : "none"}}>{nombre}</td>
            <td className={styles.tdClientes} style={{display: checks.apellidos ? "" : "none"}}>{apellidos}</td>
            <td className={styles.tdClientes} style={{display: checks.dni ? "" : "none"}}>{dni}</td>
            <td className={styles.tdClientes} style={{display: checks.email ? "" : "none"}}>{email}</td>

            <td className={styles.tdClientes} style={{display: checks.telefono_fijo ? "" : "none"}}>{telefono_fijo}</td>

            <td className={styles.tdClientes} style={{display: checks.telefono_movil ? "" : "none"}}>{telefono_movil}</td>
            <td className={styles.tdClientes} style={{display: checks.profesion ? "" : "none"}}>{profesion}</td>
            <td className={styles.tdClientes} style={{display: checks.direccion ? "" : "none"}}>{direccion}</td>
            <td className={styles.tdClientes} style={{display: checks.codigo_postal ? "" : "none"}}>{codigo_postal}</td>
            <td className={styles.tdClientes} style={{display: checks.ciudad ? "" : "none"}}>{ciudad}</td>
            <td className={styles.tdClientes} style={{display: checks.provincia ? "" : "none"}}>{provincia}</td>
            <td className={styles.tdClientes} style={{display: checks.fecha_nacimiento ? "" : "none"}}>{fecha_nacimiento}</td>
            <td className={styles.tdClientes} style={{display: checks.sexo ? "" : "none"}}>{sexo}</td>
            <td className={styles.tdClientes} style={{display: checks.mailing ? "" : "none"}}>{mailing}</td>
            <td className={styles.tdClientes} style={{display: checks.sms ? "" : "none"}}>{sms}</td>
            <td className={styles.tdClientes} style={{display: checks.motivo_visita ? "" : "none"}}>{motivo_visita}</td>
            <td className={styles.tdClientes} style={{display: checks.observaciones ? "" : "none"}}>{observaciones}</td>
            <td className={styles.tdClientes} style={{display: checks.estado ? "" : "none"}}>{estado}</td>
            <td className={styles.tdClientes} style={{display: checks.fecha_alta ? "" : "none"}}>{fecha_alta}</td>
            <td className={styles.tdClientes} style={{display: checks.hora ? "" : "none"}}>{hora}</td>

            <td className={styles.contenedorBotonModificarClientes}>
                <Link to={`modificar/${cliente.id}`}>
                    <button className={styles.botonClientes}> Modificar</button>
                </Link>
            </td>
            
        </tr>
    </>
    
  )
}