import { useContext, useEffect, useState } from 'react'
import instancia from '../../config/Instancia';
import Cliente from '../components/clientes/Cliente';
import styles from "../components/clientes/clientes.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { alertaSwal } from '../utils/alertaSwal';
import Loading from '../components/loading/Loading';
import { GlobalContext } from '../components/context/GlobalStateProvider';

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";







const Clientes = () => {
  

  const navigate = useNavigate();

  const { rowSeleccionada, setRowSeleccionada } = useContext(GlobalContext);
  
  const handleRowClick = (rowData) => { 
    setRowSeleccionada((prevRows) => {
      if (rowData) {
    return {
      ...prevRows,
      clientes: {
        ...prevRows.clientes,
        [rowData]: !prevRows.clientes[rowData],
      },
    };
  }
  return prevRows;
});
    // window.getSelection().removeAllRanges();
  }


  
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
    





const [loading, setLoading] = useState(true);


const [checks, setChecks] = useState({
  nombre: true,
  apellidos: false,
  dni: true,
  email: false,
  telefono_fijo: false,
  telefono_movil: false,
  profesion: false,
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
  estado: true,
  fecha_alta: false,
  hora: false,
  })





const handleCheckBox = (e) => {
  const {name, checked} = e.target;

  setChecks(checksPrevios => ({
    ...checksPrevios,
    [name]: checked,
  }))

  if(selectBuscador === name){
    setSelectBuscador("--Selecciona--");
    setValorInputBuscar("");
    setClientes(clientesEstatico);
    return
  }

  if(cabezeraSeleccionada[name] || !cabezeraSeleccionada[name]){
    const clientesOrdenados = [...clientes].sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
    });
  
    setClientes(clientesOrdenados);
    setCabezeraSeleccionada({ id: true }); 
  }
}





  const [clientesEstatico, setClientesEstatico] = useState([]);
  const [clientes, setClientes] = useState([]);
  useEffect(() => {

    const mostrarTabla = async () => {
      await instancia("clientes/consultar.php")
      .then ( response => {
        setClientes(response.data);
        setClientesEstatico(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log("Error" + error);
      })
    }

    mostrarTabla();
  }, []);
  



    //   // const pruebaEstilo = (e) => {
    
    //   //   const numeroFila = e.target.getAttribute("data-numerofila");

    //   //   const estilo = document.querySelectorAll(`[data-numerofila = "${numeroFila}"]`);
    //   //   setCampoSeleccionado(campo => ([...campo, numeroFila]));
    //   //   estilo.forEach((element) => {
    //   //     if(element.style.backgroundColor !== "red"){
    //   //       element.style.backgroundColor = "red";
    //   //     }
    //   //     else{
    //   //       element.style.backgroundColor = "";
    //   //     }
          
    //   //   });
    //   //   // console.log(campoSeleccionado);
    //   // }
    

    //   // window.addEventListener("dblclick", pruebaEstilo);

    //   // return () => {
    //   //   window.removeEventListener("dblclick", pruebaEstilo);
    //   // }
    // }, [campoSeleccionado])




    const [cabezeraSeleccionada, setCabezeraSeleccionada] = useState({id: true});

    const handleOrdenarColumnas = (name) => {
      
    
      const isAscendente = !cabezeraSeleccionada[name];

      if (cabezeraSeleccionada[name] === false) {
        
        const clientesOrdenados = [...clientes].sort((a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        });
      
        setClientes(clientesOrdenados);
        setCabezeraSeleccionada({ id: true });
        return;
      }
      

      setCabezeraSeleccionada(() => ({
        [name]: isAscendente,
      }))

      
      const clientesOrdenados = [...clientes].sort((a, b) => {

        if (name === "fecha_nacimiento" || name === "fecha_alta") {

            const parseDate = (dateString) => {
              const [day, month, year] = dateString.split('-');
              return new Date(`${year}-${month}-${day}`);
            };
      
            const dateA = parseDate(a[name]);
            const dateB = parseDate(b[name]);
      
            if (isAscendente) {
              return dateA - dateB;
            } else {
              return dateB - dateA;
          }
        }

        if(!isNaN(a[name]) && !isNaN(b[name])){
          if (isAscendente) {
            if (a[name] < b[name]) return -1;
            if (a[name] > b[name]) return 1;
          } else {
            if (a[name] < b[name]) return 1;
            if (a[name] > b[name]) return -1;
          }
        }


        if(name === "sms" || name === "mailing"){
          if (a[name] === "Sí" && b[name] === "No") return isAscendente ? -1 : 1;
          if (a[name] === "No" && b[name] === "Sí") return isAscendente ? 1 : -1;
        }

        const aValor = a[name] || "";
        const bValor = b[name] || "";
      
        
        const aVacio = aValor.trim() === "";
        const bVacio = bValor.trim() === "";


        if (aVacio && !bVacio) return isAscendente ? 1 : -1;
        
        if (!aVacio && bVacio) return isAscendente ? -1 : 1;

        if (isAscendente) return a[name].localeCompare(b[name], 'es', { sensitivity: 'base' });
        return b[name].localeCompare(a[name], 'es', { sensitivity: 'base' });
        
      });
      
      setClientes(clientesOrdenados);
    }
    







   const [valorInputBuscar, setValorInputBuscar] = useState("");
    const handleInputBuscar = (e) => {

      if (!selectBuscador) return;

      const { value } = e.target;
      setValorInputBuscar(value);

      const clientesBuscados = clientesEstatico.filter(cliente =>
        cliente[selectBuscador].toLowerCase().includes(value.toLowerCase())
      );
      setClientes(clientesBuscados);
    };



   const [selectBuscador, setSelectBuscador] = useState("--Selecciona--");
    const handleSelectBuscar = (e) => {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const name = selectedOption.getAttribute("data-name");
      clientesEstatico
      
      
      setValorInputBuscar("");
      setClientes(clientesEstatico);
      setSelectBuscador(name);
      
    }


  return (

    loading ? (
      <Loading/>
    ) : (
      <>
        <h1 id={styles.h1Clientes}>Clientes</h1>

        <div id={styles.buscador}>
        <select onChange = {handleSelectBuscar}>
            <option data-name="--Selecciona--">--Selecciona--</option>
            {checks.nombre ? <option data-name="nombre">Nombre</option> : null}
            {checks.apellidos ? <option data-name="apellidos">Apellidos</option> : null}
            {checks.dni ? <option data-name="dni">DNI</option> : null}
            {checks.email ? <option data-name="email">Email</option> : null}
            {checks.telefono_fijo ? <option data-name="telefono_fijo">Telefono Fijo</option> : null}
            {checks.telefono_movil ? <option data-name="telefono_movil">Telefono Móvil</option> : null}
            {checks.profesion ? <option data-name="profesion">Profesión</option> : null}
            {checks.direccion ? <option data-name="direccion">Direccion</option> : null}
            {checks.codigo_postal ? <option data-name="codigo_postal">Código postal</option> : null}
            {checks.ciudad ? <option data-name="ciudad">Ciudad</option> : null}
            {checks.provincia ? <option data-name="provincia">Provincia</option> : null}
            {checks.fecha_nacimiento ? <option data-name="fecha_nacimiento">Fecha nacimiento</option> : null}
            {checks.sexo ? <option data-name="sexo">Sexo</option> : null}
            {checks.mailing ? <option data-name="mailing">Mailing</option> : null}
            {checks.sms ? <option data-name="sms">sms</option> : null}
            {checks.motivo_visita ? <option data-name="motivo_visita">Motivo visita</option> : null}
            {checks.observaciones ? <option data-name="observaciones">Observaciones</option> : null}
            {checks.estado ? <option data-name="estado">Estado</option> : null}
            {checks.fecha_alta ? <option data-name="fecha_alta">Fecha alta</option> : null}
            {checks.hora ? <option data-name="hora">Hora</option> : null}
        </select>
        
        <input
        onChange={handleInputBuscar}
        disabled={selectBuscador == "--Selecciona--" ? true : false}
        value={valorInputBuscar}
        className={selectBuscador == "--Selecciona--" ? styles.bloqueadoFormulario : ""}
        placeholder="Buscar..."
        >
        </input>
        </div>

        
        <div id={styles.divCheckBox}>
      {/* <label className={!bloquearCheckBox && !checks.id ? "checkedBox" : ""}><input className={!bloquearCheckBox && !checks.id ? "checkedBox" : ""} name="id" type="checkbox" onChange={handleCheckBox} checked={checks.id} />id</label> */}
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

        <div id={styles.contenedorTablaClientes}>

        <table>
          <thead>
            <tr>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("id")}>ID</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("nombre")} style={{display: checks.nombre ? "" : "none"}}>{cabezeraSeleccionada.nombre ? "⇩" : cabezeraSeleccionada.nombre == null ? "" : "⇧"}Nombre</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("apellidos")} style={{display: checks.apellidos ? "" : "none"}}>{cabezeraSeleccionada.apellidos ? "⇩" : cabezeraSeleccionada.apellidos == null ? "" : "⇧"}Apellidos</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("dni")} style={{display: checks.dni ? "" : "none"}}>{cabezeraSeleccionada.dni ? "⇩" : cabezeraSeleccionada.dni == null ? "" : "⇧"}DNI</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("email")} style={{display: checks.email ? "" : "none"}}>{cabezeraSeleccionada.email ? "⇩" : cabezeraSeleccionada.email == null ? "" : "⇧"}Email</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("telefono_fijo")} style={{display: checks.telefono_fijo ? "" : "none"}}>{cabezeraSeleccionada.telefono_fijo ? "⇩" : cabezeraSeleccionada.telefono_fijo == null ? "" : "⇧"}Teléfono fijo</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("telefono_movil")} style={{display: checks.telefono_movil ? "" : "none"}}>{cabezeraSeleccionada.telefono_movil ? "⇩" : cabezeraSeleccionada.telefono_movil == null ? "" : "⇧"}Teléfono móvil</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("profesion")} style={{display: checks.profesion ? "" : "none"}}>{cabezeraSeleccionada.profesion ? "⇩" : cabezeraSeleccionada.profesion == null ? "" : "⇧"}Profesión</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("direccion")} style={{display: checks.direccion ? "" : "none"}}>{cabezeraSeleccionada.direccion ? "⇩" : cabezeraSeleccionada.direccion == null ? "" : "⇧"}Dirección</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("codigo_postal")} style={{display: checks.codigo_postal ? "" : "none"}}>{cabezeraSeleccionada.codigo_postal ? "⇩" : cabezeraSeleccionada.codigo_postal == null ? "" : "⇧"}Código postal</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("ciudad")} style={{display: checks.ciudad ? "" : "none"}}>{cabezeraSeleccionada.ciudad ? "⇩" : cabezeraSeleccionada.ciudad == null ? "" : "⇧"}Ciudad</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("provincia")} style={{display: checks.provincia ? "" : "none"}}>{cabezeraSeleccionada.provincia ? "⇩" : cabezeraSeleccionada.provincia == null ? "" : "⇧"}Provincia</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("fecha_nacimiento")} style={{display: checks.fecha_nacimiento ? "" : "none"}}>{cabezeraSeleccionada.fecha_nacimiento ? "⇩" : cabezeraSeleccionada.fecha_nacimiento == null ? "" : "⇧"}Fecha de nacimiento</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("sexo")} style={{display: checks.sexo ? "" : "none"}}>{cabezeraSeleccionada.sexo ? "⇩" : cabezeraSeleccionada.sexo == null ? "" : "⇧"}Sexo</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("mailing")} style={{display: checks.mailing ? "" : "none"}}>{cabezeraSeleccionada.mailing ? "⇩" : cabezeraSeleccionada.mailing == null ? "" : "⇧"}Mailing</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("sms")} style={{display: checks.sms ? "" : "none"}}>{cabezeraSeleccionada.sms ? "⇩" : cabezeraSeleccionada.sms == null ? "" : "⇧"}sms</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("motivo_visita")} style={{display: checks.motivo_visita ? "" : "none"}}>{cabezeraSeleccionada.motivo_visita ? "⇩" : cabezeraSeleccionada.motivo_visita == null ? "" : "⇧"}Motivo de visita</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("observaciones")} style={{display: checks.observaciones ? "" : "none"}}>{cabezeraSeleccionada.observaciones ? "⇩" : cabezeraSeleccionada.observaciones == null ? "" : "⇧"}Observaciones</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("estado")} style={{display: checks.estado ? "" : "none"}}>{cabezeraSeleccionada.estado ? "⇩" : cabezeraSeleccionada.estado == null ? "" : "⇧"}Estado</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("fecha_alta")} style={{display: checks.fecha_alta ? "" : "none"}}>{cabezeraSeleccionada.fecha_alta ? "⇩" : cabezeraSeleccionada.fecha_alta == null ? "" : "⇧"}Fecha de alta</th>
              <th className={cabezeraSeleccionada ? styles.cabezeraSeleccionada : styles.cabezeraNoSeleccionada} onClick={() => handleOrdenarColumnas("hora")} style={{display: checks.hora ? "" : "none"}}>{cabezeraSeleccionada.hora ? "⇩" : cabezeraSeleccionada.hora == null ? "" : "⇧"}Hora</th>
              <th className="ocultarScroll"></th>
            </tr>
          </thead>
          <tbody>
            
            {clientes.map ((cliente, index) =>
              <Cliente
              rowSeleccionada = {rowSeleccionada}
              onRowClick={handleRowClick}
              key = {index}
              checks = {checks}
              cliente = {cliente}/>
            )}

          </tbody>
        </table>
        </div>

        <Link to="crear" id={styles.botonCrearClientes}>
          <button>Crear Cliente</button>
        </Link>
      </>
    )
  )
}

export default Clientes