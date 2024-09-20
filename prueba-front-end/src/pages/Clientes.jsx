import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import instancia from '../../config/Instancia';
import Cliente from '../components/clientes/Cliente';
import styles from "../components/clientes/clientes.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { alertaSwal } from '../validaciones/funciones';
import Loading from '../components/loading/Loading';


function Clientes() {
  
  const [loading, setLoading] = useState(true);

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
  nombre: true,
  apellidos: false,
  dni: true,
  email: false,
  telefono_fijo: false,
  telefono_movil: false,
  profesion: true,
  direccion: false,
  codigo_postal: false,
  ciudad: false,
  provincia: false,
  fecha_nacimiento: false,
  sexo: false,
  mailing: false,
  sms: false,
  motivo_visita: false,
  observaciones: false,
  estado: false,
  fecha_alta: true,
  hora: false,
  })







const [bloquearCheckBox, setBloquearCheckBox] = useState(false);
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
      setLoading(false);
    })
    .catch(error => {
      console.log("Error" + error);
    })
  }
  
  useEffect(() => {
    mostrarTabla();
  }, []);
  


























  

  
  const tablaRef = useRef(true);
  const [primerUseEffect, setPrimerUseEffect] = useState(true);
  const [dimensionVW, setDimensionVW] = useState(0);  // Estado para almacenar el ancho de la tabla en VW
    useEffect(() => {
      // Función para calcular el ancho de la tabla en vw
      if(document.getElementById("tablaClientes") !== null){
        const calcularDimensionVW = () => {
          const tablaAnchoPx = tablaRef.current.getBoundingClientRect().width;  // Ancho de la tabla en píxeles
          const ventanaAnchoPx = window.innerWidth;  // Ancho de la ventana en píxeles
          
          const tablaAnchoVW = (tablaAnchoPx / ventanaAnchoPx) * 100;  // Convertir el ancho de la tabla a VW
          // Actualizamos el estado con el ancho en VW
          setDimensionVW(tablaAnchoVW);

          // console.log(tablaAnchoVW);
          if (tablaAnchoVW > 64 || primerUseEffect == true) {
            setBloquearCheckBox(false);  // Si excede 65vw
            if(primerUseEffect == true){
              setPrimerUseEffect(false);
            }
          } else {
            setBloquearCheckBox(true); // Si está dentro del límite
          }
        };
      
        // Calculamos las dimensiones al montar el componente
        calcularDimensionVW();
      }
    }, [checks]);


  







  return (

    loading ? (
      <Loading/>
    ) : (
      <>
        <h1 id={styles.h1Clientes}>Clientes</h1>

        <div id={styles.divCheckBox}>
          {/* <label className={!bloquearCheckBox && !checks.id ? "checkedBox" : "notCheckedBox"}><input className={!bloquearCheckBox && !checks.id ? "checkedBox" : "notCheckedBox"} name="id" type="checkbox" onChange={handleCheckBox} checked={checks.id} />id</label> */}
          <label className={!bloquearCheckBox && !checks.nombre ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.nombre ? styles.checkedBox : styles.notCheckedBox} name="nombre" type="checkbox" onChange={handleCheckBox} checked={checks.nombre} />Nombre</label>
          <label className={!bloquearCheckBox && !checks.apellidos ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.apellidos ? styles.checkedBox : styles.notCheckedBox} name="apellidos" type="checkbox" onChange={handleCheckBox} checked={checks.apellidos} />Apellidos</label>
          <label className={!bloquearCheckBox && !checks.dni ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.dni ? styles.checkedBox : styles.notCheckedBox} name="dni" type="checkbox" onChange={handleCheckBox} checked={checks.dni} />DNI</label>
          <label className={!bloquearCheckBox && !checks.email ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.email ? styles.checkedBox : styles.notCheckedBox} name="email" type="checkbox" onChange={handleCheckBox} checked={checks.email} />Email</label>
          <label className={!bloquearCheckBox && !checks.telefono_fijo ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.telefono_fijo ? styles.checkedBox : styles.notCheckedBox} name="telefono_fijo" type="checkbox" onChange={handleCheckBox} checked={checks.telefono_fijo} />Teléfono fijo</label>
          <label className={!bloquearCheckBox && !checks.telefono_movil ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.telefono_movil ? styles.checkedBox : styles.notCheckedBox} name="telefono_movil" type="checkbox" onChange={handleCheckBox} checked={checks.telefono_movil} />Teléfono movil</label>
          <label className={!bloquearCheckBox && !checks.profesion ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.profesion ? styles.checkedBox : styles.notCheckedBox} name="profesion" type="checkbox" onChange={handleCheckBox} checked={checks.profesion} />Profesion</label>
          <label className={!bloquearCheckBox && !checks.direccion ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.direccion ? styles.checkedBox : styles.notCheckedBox} name="direccion" type="checkbox" onChange={handleCheckBox} checked={checks.direccion} />Dirección</label>
          <label className={!bloquearCheckBox && !checks.codigo_postal ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.codigo_postal ? styles.checkedBox : styles.notCheckedBox} name="codigo_postal" type="checkbox" onChange={handleCheckBox} checked={checks.codigo_postal} />Codigo postal</label>
          <label className={!bloquearCheckBox && !checks.ciudad ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.ciudad ? styles.checkedBox : styles.notCheckedBox} name="ciudad" type="checkbox" onChange={handleCheckBox} checked={checks.ciudad} />Ciudad</label>
          <label className={!bloquearCheckBox && !checks.provincia ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.provincia ? styles.checkedBox : styles.notCheckedBox} name="provincia" type="checkbox" onChange={handleCheckBox} checked={checks.provincia} />Provincia</label>
          <label className={!bloquearCheckBox && !checks.fecha_nacimiento ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.fecha_nacimiento ? styles.checkedBox : styles.notCheckedBox} name="fecha_nacimiento" type="checkbox" onChange={handleCheckBox} checked={checks.fecha_nacimiento} />Fecha de nacimiento</label>
          <label className={!bloquearCheckBox && !checks.sexo ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.sexo ? styles.checkedBox : styles.notCheckedBox} name="sexo" type="checkbox" onChange={handleCheckBox} checked={checks.sexo} />Sexo</label>
          <label className={!bloquearCheckBox && !checks.mailing ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.mailing ? styles.checkedBox : styles.notCheckedBox} name="mailing" type="checkbox" onChange={handleCheckBox} checked={checks.mailing} />Mailing</label>
          <label className={!bloquearCheckBox && !checks.sms ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.sms ? styles.checkedBox : styles.notCheckedBox} name="sms" type="checkbox" onChange={handleCheckBox} checked={checks.sms} />SMS</label>
          <label className={!bloquearCheckBox && !checks.motivo_visita ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.motivo_visita ? styles.checkedBox : styles.notCheckedBox} name="motivo_visita" type="checkbox" onChange={handleCheckBox} checked={checks.motivo_visita} />Motivo de visita</label>
          <label className={!bloquearCheckBox && !checks.observaciones ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.observaciones ? styles.checkedBox : styles.notCheckedBox} name="observaciones" type="checkbox" onChange={handleCheckBox} checked={checks.observaciones} />Obervaciones</label>
          <label className={!bloquearCheckBox && !checks.estado ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.estado ? styles.checkedBox : styles.notCheckedBox} name="estado" type="checkbox" onChange={handleCheckBox} checked={checks.estado} />Estado</label>
          <label className={!bloquearCheckBox && !checks.fecha_alta ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.fecha_alta ? styles.checkedBox : styles.notCheckedBox} name="fecha_alta" type="checkbox" onChange={handleCheckBox} checked={checks.fecha_alta} />Fecha de alta</label>
          <label className={!bloquearCheckBox && !checks.hora ? styles.checkedBox : styles.notCheckedBox}><input  className={!bloquearCheckBox && !checks.hora ? styles.checkedBox : styles.notCheckedBox} name="hora" type="checkbox" onChange={handleCheckBox} checked={checks.hora} />Hora</label>     
        </div>

        <div id={styles.contenedorTablaClientes}>

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
        <button id={styles.botonCrearClientes}>Crear Cliente</button>
        </Link>
      </>
    )
  )
}

export default Clientes


// Cambiar método de " cuanta de columnas "



// HACER LOADING
// Carga devolver algo difrente cuando no se recive la tabla del servidor
// HACER LOADING