import React, { Fragment, useEffect, useState } from 'react'
import instancia from '../../config/Instancia'
import Profesion from '../components/profesiones/Profesion';
import "../components/profesiones/profesiones.css";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { alertaSwal } from '../validaciones/funciones';

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

  const mostrarTabla = async () => {
    await instancia("http://localhost/api-prueba-back-end/profesiones/consultar.php")
    .then ( response => {
      setProfesiones(response.data);
    })
    .catch ( error => {
      console.log(`ERROR.CATCH: ${error}`);
    })
  }

  useEffect(() => {
    mostrarTabla();
  })

  return (
    <Fragment>
    <h1 id="h1Profesiones">Profesiones</h1>
    <div id="contenedorTablaProfesiones">
    <table id="tablaProfesiones">
      <thead>
        <tr>
          <th id="thIdProfesiones" className="thProfesiones">ID</th>
          <th id="thNombreProfesiones" className="thProfesiones">Nombre</th>
          <th id="thEstadoProfesiones" className="thProfesiones">Estado</th>
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
    <Link id="contenedorBotonCrearProfesiones" to="crear">
        <button id="botonCrearProfesiones">Crear Profesión</button>
    </Link>
    </Fragment>
  )
}

export default Profesiones