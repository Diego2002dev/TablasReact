// REVISAR (CONSOLE.LOG DEVUELVE 3 VECES POR RENDERIZADO Y NO 2 COMO DEBERÍA)

import React, { Fragment, useEffect, useState } from 'react'
import instancia from '../../config/Instancia'
import Profesion from '../components/profesiones/Profesion';
import styles from "../components/profesiones/profesiones.module.css";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { alertaSwal } from '../validaciones/funciones';
import Loading from '../components/loading/Loading';
import UseFetchingDatos from '../hooks/UseFetchingDatos';
function Profesiones() {


  const navigate = useNavigate();
  useEffect(() => {
    const sweetAlertData = localStorage.getItem("sweetAlertData");
    if (sweetAlertData) {
      const { mensaje } = JSON.parse(sweetAlertData);

      alertaSwal("success", mensaje)
      .then(() => {
        localStorage.removeItem("sweetAlertData");
      })
    }
  }, [navigate]);



  const [profesiones, setProfesiones] = useState([]);
  const {loading, datos, error} = UseFetchingDatos("/profesiones/consultar.php");
  
  useEffect(() => {
    if(datos){
      setProfesiones(datos);
    }
  }, [datos])


  return (
      loading ? (
          <Loading/>
      ) : (
        <>
          <h1 id={styles.h1Profesiones}>Profesiones</h1>
          <div id={styles.contenedorTablaProfesiones}>
          <table id={styles.tablaProfesiones}>
            <thead>
              <tr>
                <th id={styles.thIdProfesiones} className={styles.thProfesiones}>ID</th>
                <th id={styles.thNombreProfesiones} className={styles.thProfesiones}>Nombre</th>
                <th id={styles.thEstadoProfesiones} className={styles.thProfesiones}>Estado</th>
                <th className="ocultarScroll"></th>
              </tr>
            </thead>
            <tbody>
              {profesiones.map((profesion, index) =>
                <Profesion key = {index} profesion = {profesion}/>
              )}
            </tbody>
          </table>
          </div>
          <Link id={styles.contenedorBotonCrearProfesiones} to="crear">
              <button id={styles.botonCrearProfesiones}>Crear Profesión</button>
          </Link>
        </>
      )
  )
}

export default Profesiones