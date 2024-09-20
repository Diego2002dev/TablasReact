import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import instancia from '../../config/Instancia';
import { alertaSwal } from '../validaciones/funciones';
import styles from "../components/clientes/clientes.module.css";
import { validarApellidos, validarCiudad, validarCodigoPostal, validarDireccion, validarDni, validarEmail, validarFechaNacimiento,
         validarNombreCliente, validarTFijo, validarTMovil }
         from '../validaciones/expresionesRegulares';


export default function FormularioClientes() {
    

    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();


    const [errores, setErrores] = useState({});

    const [validacionesCampo, setValidacionesCampos] = useState([
        { campo: "nombre", validacion: validarNombreCliente },
        { campo: "apellidos", validacion: validarApellidos },
        { campo: 'email', validacion: validarEmail },
        { campo: 'dni', validacion: validarDni },
        { campo: 'telefono_fijo', validacion: validarTFijo },
        { campo: 'telefono_movil', validacion: validarTMovil },
        { campo: 'direccion', validacion: validarDireccion },
        { campo: 'codigo_postal', validacion: validarCodigoPostal },
        { campo: 'ciudad', validacion: validarCiudad },
        { campo: 'fecha_nacimiento', validacion: validarFechaNacimiento },
    ]);

    const [datosFormulario, setDatosFormulario] = useState({
        
       nombre: "",
       apellidos: "",
       dni: "",
       email: "",
       telefono_fijo: "",
       telefono_movil: "",
       profesion: "",
       direccion: "",
       codigo_postal: "",
       ciudad: "",
       provincia: "",
       fecha_nacimiento: "",
       sexo: "",
       mailing: "", 
       sms: "",
       motivo_visita: "",
       observaciones: "",
       estado: "",
       fecha_alta: "",
       hora: "",
    });



    const [nombresProfesiones, setNombresProfesiones] = useState([]);
    const [nombresProvincias, setNombresProvincias] = useState([]);
    const [nombresMotivos, setNombresMotivos] = useState([]);

    // Función genérica para obtener nombres de las demas tablas
    






    useEffect(() => {
        if (location.pathname !== "/clientes/crear" && id) {
            extraerIds(id);
            extraerValores();
        }
        fetchNombres("clientes/extraerActivosTablaProfesiones.php", setNombresProfesiones);
        fetchNombres("provincias/consultar.php", setNombresProvincias);
        fetchNombres("clientes/extraerActivosTablaMotivosVisita.php", setNombresMotivos);
        // nombreDeOtrasTablasAPartirDelId("profesiones/devolverCampos.php", datosFormulario.profesion);
    }, [])


    



    /******************************
     *                            *
     *          FUNCIONES         *
     *                            *
     ******************************/

    const extraerIds = async (id) => {

        await instancia("clientes/consultar.php")
        .then(response => {
            const ids = response.data.some( dato => dato.id === Number(id))
            if(!ids){
                navigate("/clientes");
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    const extraerValores =  () => {

        instancia.post("clientes/extraerValoresClientes.php", {id})
        .then (response => {
            setDatosFormulario(datosPrevios => ({
                ...datosPrevios,
                id: response.data.id,
                nombre: response.data.nombre,
                apellidos: response.data.apellidos,
                dni: response.data.dni,
                email: response.data.email,
                telefono_fijo: response.data.telefono_fijo,
                telefono_movil: response.data.telefono_movil,

                profesion: response.data.profesion,

                direccion: response.data.direccion,
                codigo_postal: response.data.codigo_postal,
                ciudad: response.data.ciudad,
                provincia: response.data.provincia,
                fecha_nacimiento: response.data.fecha_nacimiento,
                sexo: response.data.sexo,
                mailing: response.data.mailing,
                sms: response.data.sms,

                motivo_visita: response.data.motivo_visita,

                observaciones: response.data.observaciones,
                estado: response.data.estado,
                fecha_alta: response.data.fecha_alta,
                hora: response.data.hora,
            }));
            
        })
        .catch (error => {
            console.log(`Error ${error}`);
        })
    }

    const fetchNombres = (api, setState) => {
        instancia(api)
        .then(response => {

            const nombres = response.data.map(dato => dato.nombre);
            // nombres.forEach((nombre, index) => {
            //     const nombreSplit = nombre.split("");
            //     if(nombreSplit.length > 21){
            //             while(nombreSplit.length >= 21){
            //                 nombreSplit.pop();
            //     }
            //         const result = nombreSplit.join("") + "...";

            //         nombres[index] = result;
            //     }
            // })
            
            nombres.sort((a, b) => {
                return a.localeCompare(b, undefined, { sensitivity: "base" });
            });



            
            setState(nombres);
        })
        .catch(error => {
            console.log("Error: " + error);
        });
    };


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setDatosFormulario ( datosPrevios => ({
            ...datosPrevios,
            [name]: value.trimStart(),
        }));
    }


    const handleSelectChange = (e) => {
        const {name, value} = e.target;
        setDatosFormulario ( datosPrevios => ({
            ...datosPrevios,
            [name]: value
        }));
    }

    
/******************************
 *                            *
 *     ENVIAR FORMULARIO      *
 *                            *
 ******************************/
    const enviarFormulario = (url) => (e) => {
        e.preventDefault();

        /******************************
         *                            *
         *      ERRORES EN FRONT      *
         *                            *
         ******************************/
        setErrores({});
        let hayError = false;

        validacionesCampo.forEach (({ campo, validacion }) => {
            if(validacion(datosFormulario[campo])){
                if(!hayError){
                alertaSwal("error", validacion(datosFormulario[campo]));
                hayError = true;
                }
                setErrores( erroresPrevios => ({
                    ...erroresPrevios,
                    [campo]: true,
                    
                }));
            }
        })

        if(!hayError){
            instancia.post(url, datosFormulario)
            .then( response => {

                localStorage.setItem("sweetAlertData", JSON.stringify({
                    mensaje: response.data.mensaje,
                }));
                navigate("/clientes");
            })
            .catch( error => {  
                console.log(`ErrorCATCH: ${error}`);
            })
        }
    }

  return (
    <Fragment>
        {location.pathname == "/clientes/crear" ? (

            
                <form className={styles.contenedorFormularioClientes} onSubmit={enviarFormulario("clientes/crearFormularioClientes.php")}>
                <h2 className={styles.h2FormularioClientes}>Formulario</h2>
                <h3 className={styles.h3FormularioClientes}>Clientes</h3>
                    <div className={styles.contenedorFormularioClientesScroll}>

                        <div className={styles.grupoForm}>

                            {/* <div>
                            <label>ID</label>
                            <input className = "bloqueadoFormulario" readOnly placeholder="ID"></input>
                            </div> */}

                             <div>
                            <label>Nombre</label>
                            <input name="nombre" onChange={handleInputChange} className={errores.nombre ? "errorInput" : ""} value={datosFormulario.nombre} required></input>
                            </div>
                            
                            <div>
                            <label>Apellidos</label>
                            <input name="apellidos" onChange={handleInputChange} className={errores.apellidos ? "errorInput" : ""} value={datosFormulario.apellidos} required></input>
                            </div>
                            
                            <div>
                            <label>DNI</label>
                            <input name="dni" onChange={handleInputChange} className={errores.dni ? "errorInput" : ""} value={datosFormulario.dni} required></input>
                            </div>
                            
                            <div>
                            <label>Email</label>
                            <input name="email" onChange={handleInputChange} className={errores.email ? "errorInput" : ""} value={datosFormulario.email} required type="email"></input>
                            </div> 
                             
                            <div>
                            <label>Teléfono Fijo</label>
                            <input name="telefono_fijo" type="number" onChange={handleInputChange} className={errores.telefono_fijo ? "errorInput" : ""} required></input>
                            </div>

                            <div>
                            <label>Teléfono Movil</label>
                            <input name="telefono_movil" type="number" onChange={handleInputChange} className={errores.telefono_movil ? "errorInput" : ""} required></input>
                            </div>  
                       
                            <div>
                            <label>Dirección</label>
                            <input name="direccion" onChange={handleInputChange} className={errores.direccion ? "errorInput" : ""} value={datosFormulario.direccion} required></input>
                            </div>

                            <div>
                            <label>Código postal</label>
                            <input name="codigo_postal" type="number" onChange={handleInputChange} className={errores.codigo_postal ? "errorInput" : ""} required></input>
                            </div>

                            <div>
                            <label>Ciudad</label>
                            <input name="ciudad" onChange={handleInputChange} className={errores.ciudad ? "errorInput" : ""} value={datosFormulario.ciudad} required></input>
                            </div>

                            <div>
                            <label className={styles.fecha_nacimiento}>Fecha de nacimiento</label>
                            <input name="fecha_nacimiento" onChange={handleInputChange} className={errores.fecha_nacimiento ? "errorInput" : ""} type="date" required></input>
                            </div>

                            <div>
                            <label>Sexo</label>
                            <select name="sexo" onChange={handleSelectChange} value={datosFormulario.sexo}>
                                <option value="Hombre">Hombre</option>
                                <option value="Mujer">Mujer</option>
                                <option value="Otro">Otro</option>
                            </select>
                            </div>

                            <div>
                            <label>Mailing</label>
                            <select name="mailing" onChange={handleSelectChange} value={datosFormulario.mailing}>
                                <option value="No">No</option>
                                <option value="Si">Si</option>
                            </select>
                            </div>

                            <div>
                            <label>SMS</label>
                            <select name="sms" onChange={handleSelectChange} value={datosFormulario.sms}>
                                <option value="No">No</option>
                                <option value="Si">Si</option>
                            </select>
                            </div>

                            <div>
                            <label>Observaciones</label>
                            <textarea className={styles.inputObservaciones} name="observaciones" onChange={handleInputChange} value={datosFormulario.observaciones}></textarea>
                            </div>

                            <div>
                            <label>Estado</label>
                            <input className={styles.bloqueadoFormulario} placeholder="Activo" readOnly></input>
                            </div>

                            <div>
                                <label>Profesión</label>
                                <select
                                name="profesion"
                                onChange={handleSelectChange}
                                className={errores.profesion ? "errorInput" : ""}
                                value={datosFormulario.profesion}
                                id={styles.selectProfesionesClientes}
                                >
                                    {nombresProfesiones.map((nombre, index) => 
                                        <option key={index} value={nombre}>{nombre}</option>
                                        )
                                    }
                                </select>
                            </div>

                            <div>
                                <label>Provincia</label>
                                <select
                                name="provincia"
                                onChange={handleSelectChange}
                                className={errores.provincia ? "errorInput" : ""}
                                value={datosFormulario.provincia}
                                id={styles.selectProvinciasClientes}
                                >
                                    {nombresProvincias.map((nombre, index) => 
                                        <option key={index} value={nombre}>{nombre}</option>
                                        )
                                    }
                                </select>
                            </div>

                            <div>
                                <label>Motivo de visita</label>
                                <select
                                name="motivo_visita"
                                onChange={handleSelectChange}
                                className={errores.motivo_visita ? "errorInput" : ""}
                                value={datosFormulario.motivo_visita}
                                id={styles.selectMotivosClientes}
                                >
                                    {nombresMotivos.map((nombre, index) => 
                                        <option key={index} value={nombre}>{nombre}</option>
                                        )
                                    }
                                </select>
                            </div>

                        </div>
                        {/* <label>Fecha de alta</label>
                        <input onChange={handleInputChange} required ></input> */}
                        {/* <label>Hora</label>
                        <input onChange={handleInputChange} required></input>  */}
                    </div>
                    <button className="botonFormulario" type="submit">Crear registro</button>
                </form>
            
        ) : (
            
            <form className={styles.contenedorFormularioClientes} onSubmit={enviarFormulario("clientes/modificarFormularioClientes.php")}>
            <h2 className={styles.h2FormularioClientes}>Formulario</h2>
            <h3 className={styles.h3FormularioClientes}>Clientes</h3>
                <div className={styles.contenedorFormularioClientesScroll}>
                    <div className={styles.grupoForm}>
                        {/* <div>
                        <label>ID</label>
                        <input className = "bloqueadoFormulario" readOnly placeholder={id}></input>
                        </div> */}

                        <div>
                        <label>Nombre</label>
                        <input name="nombre" onChange={handleInputChange} className={errores.nombre ? "errorInput" : ""} value={datosFormulario.nombre || ""} required></input>
                        </div>

                        <div>
                        <label>Apellidos</label>
                        <input name="apellidos" onChange={handleInputChange} className={errores.apellidos ? "errorInput" : ""} value={datosFormulario.apellidos || ""} required></input>
                        </div>

                        <div>
                        <label>DNI</label>
                        <input name="dni" onChange={handleInputChange} className={errores.dni ? "errorInput" : ""} value={datosFormulario.dni || ""} required></input>
                        </div>

                        <div>
                        <label>Email</label>
                        <input name="email" onChange={handleInputChange} className={errores.email ? "errorInput" : ""} value={datosFormulario.email || ""} type="email" required ></input>
                        </div>

                        <div>
                        <label>Teléfono Fijo</label>
                        <input name="telefono_fijo" type="number" onChange={handleInputChange}  className={errores.telefono_fijo ? "errorInput" : ""} value={datosFormulario.telefono_fijo || ""} required></input>
                        </div>

                        <div>
                        <label>Teléfono Movil</label>
                        <input name="telefono_movil" type="number" onChange={handleInputChange} className={errores.telefono_movil ? "errorInput" : ""} value={datosFormulario.telefono_movil || ""} required></input>
                        </div> 
                        
                        
                        <div>
                        <label>Dirección</label>
                        <input name="direccion" onChange={handleInputChange}  className={errores.direccion ? "errorInput" : ""} value={datosFormulario.direccion || ""} required></input>
                        </div>

                        <div>
                        <label>Código postal</label>
                        <input name="codigo_postal" type="number" onChange={handleInputChange} className={errores.codigo_postal ? "errorInput" : ""} value={datosFormulario.codigo_postal || ""} required></input>
                        </div>

                        <div>
                        <label>Ciudad</label>
                        <input name="ciudad" onChange={handleInputChange} value={datosFormulario.ciudad || ""} className={errores.ciudad ? "errorInput" : ""} required></input>
                        </div> 
                        

                        <div>
                        <label className={styles.fecha_nacimiento}>Fecha de nacimiento</label>
                        <input type="date" name="fecha_nacimiento" onChange={handleInputChange} className={errores.fecha_nacimiento ? "errorInput" : ""} value={datosFormulario.fecha_nacimiento || ""} required></input>
                        </div>

                        <div>
                        <label>Sexo</label>
                        <select name="sexo" onChange={handleSelectChange} value={datosFormulario.sexo}>
                            <option value="Hombre">Hombre</option>
                            <option value="Mujer">Mujer</option>
                            <option value="Otro">Otro</option>
                        </select>
                        </div>

                        <div>
                        <label>Mailing</label>
                        <select name="mailing" onChange={handleSelectChange} value={datosFormulario.mailing}>
                            <option value="No">No</option>
                            <option value="Si">Si</option>
                        </select>
                        </div>

                        <div>
                        <label>SMS</label>
                        <select name="sms" onChange={handleSelectChange} value={datosFormulario.sms}>
                            <option value="No">No</option>
                            <option value="Si">Si</option>
                        </select>
                        </div>

                        <div>
                        <label>Observaciones</label>
                        <textarea className={styles.inputObservaciones} name="observaciones" onChange={handleInputChange} value={datosFormulario.observaciones || ""}></textarea>
                        </div>

                        <div>
                        <label>Estado</label>
                        <select name="estado" onChange={handleSelectChange} value={datosFormulario.estado}>
                            <option value="Activo">Activo</option>
                            <option value="Baja">Baja</option>
                        </select>
                        </div>
                        
                        <div>
                        <label>Profesión</label>
                        <select
                        name="profesion"
                        onChange={handleSelectChange}
                        className={errores.profesion ? "errorInput" : ""}
                        value={datosFormulario.profesion}
                        id={styles.selectProfesionesClientes}
                        >
                            <option id={1} className={styles.primeraOpcionSelect} value={datosFormulario.profesion}>{datosFormulario.profesion}</option>
                            {nombresProfesiones.map((nombre, index) => 

                                nombre !== datosFormulario.profesion ? (
                                    <option key={index} id={index + 2} value={nombre}>{nombre}</option>
                                )
                                : null
                                )
                            }
                        </select>
                        </div>

                        <div>
                        <label>Provincia</label>
                        <select
                        name="provincia"
                        onChange={handleSelectChange}
                        className={errores.provincia ? "errorInput" : ""}
                        value={datosFormulario.provincia}
                        id={styles.selectProvinciasClientes}
                        >
                            <option className={styles.primeraOpcionSelect} value={datosFormulario.provincia}>{datosFormulario.provincia}</option>
                            {nombresProvincias.map((nombre, index) => 
                                    nombre !== datosFormulario.provincia ? (
                                        <option key={index} value={nombre}>{nombre}</option>
                                    ) : null
                                )
                            }
                        </select>
                        </div>
                        
                        <div>
                        <label>Motivo de visita</label>
                        <select
                        name="motivo_visita"
                        onChange={handleSelectChange}
                        className={errores.motivo_visita ? "errorInput" : ""}
                        value={datosFormulario.motivo_visita}
                        id={styles.selectMotivosClientes}
                        >
                            <option className={styles.primeraOpcionSelect} value={datosFormulario.motivo_visita}>{datosFormulario.motivo_visita}</option>
                            {nombresMotivos.map((nombre, index) => 
                                    nombre !== datosFormulario.motivo_visita ? (
                                        <option key={index} value={nombre}>{nombre}</option>
                                    ) : null
                                )
                            }
                        </select>
                        </div>

                    </div>

                    {/* <label>Fecha de alta</label>
                    <input onChange={handleInputChange} required ></input> */}
                    {/* <label>Hora</label>
                    <input onChange={handleInputChange} required></input>  */}
                </div>
                <button className="botonFormulario" type="submit">Modificar registro</button>
            </form>
        

        )}
</Fragment>
  )
}