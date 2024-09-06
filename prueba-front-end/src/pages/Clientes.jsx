import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import instancia from '../../config/Instancia';
import Cliente from '../components/clientes/Cliente';
import "../components/clientes/clientes.css";
import { Link, useNavigate } from 'react-router-dom';
import { alertaSwal } from '../validaciones/funciones';

function Clientes() {
  

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
    


const [checks, setChecks] = useState({  
  id: true,
  nombre: false,
  apellidos: false,
  dni: false,
  email: false,
  telefono_fijo: false,
  telefono_movil: false,
  profesion: true,
  direccion: false,
  codigo_postal: false,
  ciudad: false,
  provincia: true,
  fecha_nacimiento: false,
  sexo: false,
  mailing: false,
  sms: false,
  motivo_visita: true,
  observaciones: false,
  estado: false,
  fecha_alta: false,
  hora: false,
  })










  // const [bloquearCheckBox, setBloquearCheckBox] = useState(false);
const handleCheckBox = (e) => {
  const {name, checked} = e.target;
  if(bloquearCheckBox || !checked){
    

    setChecks(checksPrevios => ({
      ...checksPrevios,
      [name]: checked,
    }))
  }
}



  const [clientes, setClientes] = useState([]);

  const mostrarTabla = () => {

    instancia("clientes/consultar.php")
    .then ( response => {
      setClientes(response.data);
    })
  }
  
  useEffect(() => {
    mostrarTabla();
  }, []);
  



























  const [bloquearCheckBox, setBloquearCheckBox] = useState(false);

  const tablaRef = useRef(null);
  const [dimensionVW, setDimensionVW] = useState(0);  // Estado para almacenar el ancho de la tabla en VW

  useEffect(() => {
    // Función para calcular el ancho de la tabla en vw
    const calcularDimensionVW = () => {
      const tablaAnchoPx = tablaRef.current.getBoundingClientRect().width;  // Ancho de la tabla en píxeles
      const ventanaAnchoPx = window.innerWidth;  // Ancho de la ventana en píxeles
      
      const tablaAnchoVW = (tablaAnchoPx / ventanaAnchoPx) * 100;  // Convertir el ancho de la tabla a VW
      console.log(tablaAnchoPx + "   " + tablaAnchoVW);
      // Actualizamos el estado con el ancho en VW
      setDimensionVW(tablaAnchoVW);

      
      if (tablaAnchoVW > 69) {
        setBloquearCheckBox(false);  // Si excede 75vw
      } else {
        setBloquearCheckBox(true); // Si está dentro del límite
      }
    };
    
    // Calculamos las dimensiones al montar el componente
    calcularDimensionVW();
  }, [checks]);









  return (
    <Fragment>
      <h1 id="h1Clientes">Clientes</h1>


        <div id="divCheckBox">
          <label><input name="id" type="checkbox" onChange={handleCheckBox} checked={checks.id} />id</label>
          <label><input name="nombre" type="checkbox" onChange={handleCheckBox} checked={checks.nombre} />Nombre</label>
          <label><input name="apellidos" type="checkbox" onChange={handleCheckBox} checked={checks.apellidos} />Apellidos</label>
          <label><input name="dni" type="checkbox" onChange={handleCheckBox} checked={checks.dni} />DNI</label>
          <label><input name="email" type="checkbox" onChange={handleCheckBox} checked={checks.email} />Email</label>
          <label><input name="telefono_fijo" type="checkbox" onChange={handleCheckBox} checked={checks.telefono_fijo} />Teléfono fijo</label>
          <label><input name="telefono_movil" type="checkbox" onChange={handleCheckBox} checked={checks.telefono_movil} />Teléfono movil</label>
          <label><input name="profesion" type="checkbox" onChange={handleCheckBox} checked={checks.profesion} />Profesion</label>
          <label><input name="direccion" type="checkbox" onChange={handleCheckBox} checked={checks.direccion} />Dirección</label>
          <label><input name="codigo_postal" type="checkbox" onChange={handleCheckBox} checked={checks.codigo_postal} />Codigo postal</label>
          <label><input name="ciudad" type="checkbox" onChange={handleCheckBox} checked={checks.ciudad} />Ciudad</label>
          <label><input name="provincia" type="checkbox" onChange={handleCheckBox} checked={checks.provincia} />Provincia</label>
          <label><input name="fecha_nacimiento" type="checkbox" onChange={handleCheckBox} checked={checks.fecha_nacimiento} />Fecha de nacimiento</label>
          <label><input name="sexo" type="checkbox" onChange={handleCheckBox} checked={checks.sexo} />Sexo</label>
          <label><input name="mailing" type="checkbox" onChange={handleCheckBox} checked={checks.mailing} />Mailing</label>
          <label><input name="sms" type="checkbox" onChange={handleCheckBox} checked={checks.sms} />SMS</label>
          <label><input name="motivo_visita" type="checkbox" onChange={handleCheckBox} checked={checks.motivo_visita} />Motivo de visita</label>
          <label><input name="observaciones" type="checkbox" onChange={handleCheckBox} checked={checks.observaciones} />Obervaciones</label>
          <label><input name="estado" type="checkbox" onChange={handleCheckBox} checked={checks.estado} />Estado</label>
          <label><input name="fecha_alta" type="checkbox" onChange={handleCheckBox} checked={checks.fecha_alta} />Fecha de alta</label>
          <label><input name="hora" type="checkbox" onChange={handleCheckBox} checked={checks.hora} />Hora</label>     
        </div>

        <div id="contenedorTablaClientes">

        <table ref={tablaRef} id="tablaClientes">
          <thead>
            <tr>
              <th style={{display: checks.id ? "" : "none"}}>ID</th>
              <th style={{display: checks.nombre ? "" : "none"}}>Nombre</th>
              <th style={{display: checks.apellidos ? "" : "none"}}>Apellidos</th>

              <th style={{display: checks.dni ? "" : "none"}}>DNI</th>

              <th style={{display: checks.email ? "" : "none"}}>Email</th>
              <th style={{display: checks.telefono_fijo ? "" : "none"}}>Teléfono fijo</th>
              <th style={{display: checks.telefono_movil ? "" : "none"}}>Teléfono móvil</th>
              <th style={{display: checks.profesion ? "" : "none"}}>Profesión</th>
              <th style={{display: checks.direccion ? "" : "none"}}>Dirección</th>
              <th style={{display: checks.codigo_postal ? "" : "none"}}>Código postal</th>
              <th style={{display: checks.ciudad ? "" : "none"}}>Ciudad</th>
              <th style={{display: checks.provincia ? "" : "none"}}>Provincia</th>
              <th style={{display: checks.fecha_nacimiento ? "" : "none"}}>Fecha de nacimiento</th>
              <th style={{display: checks.sexo ? "" : "none"}}>Sexo</th>
              <th style={{display: checks.mailing ? "" : "none"}}>Mailing</th>
              <th style={{display: checks.sms ? "" : "none"}}>sms</th>
              <th style={{display: checks.motivo_visita ? "" : "none"}}>Motivo de visita</th>
              <th style={{display: checks.observaciones ? "" : "none"}}>Observaciones</th>
              <th style={{display: checks.estado ? "" : "none"}}>Estado</th>
              <th style={{display: checks.fecha_alta ? "" : "none"}}>Fecha de alta</th>
              <th style={{display: checks.hora ? "" : "none"}}>Hora</th>
              <th className="ocultarScroll"></th>
            </tr>
          </thead>
          <tbody>
            {clientes.map ((cliente, index) =>
              <Cliente key = {index} checks = {checks} cliente = {cliente}/>
            )}
          </tbody>
        </table>
      </div>
      <Link to="crear">
        <button id="botonCrearClientes">Crear Cliente</button>
      </Link>
    </Fragment>
  )
}

export default Clientes