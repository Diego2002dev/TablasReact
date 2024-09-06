import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import instancia from '../../config/Instancia';
import "../validaciones/funciones";
import { alertaSwal } from '../validaciones/funciones';
import { validarNombre } from '../validaciones/expresionesRegulares';

function FormularioProfesiones() {

    const navigate = useNavigate();

    const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);

    const [errores, setErrores] = useState({});


    const { id } = useParams();


      /******************************
       *                            *
       *          USEEFECT          *
       *                            *
       ******************************/

      

    useEffect(() => {
      if (location.pathname !== '/profesiones/crear' && id) {
        establecerValores();
      }
      
    }, [location.pathname]);



    // Preparar los datos del formulario  
    const [datosFormulario, setDatosFormulario] = useState({
      nombre: "",
    });
    
    

    //const idBotonSeleccionado = id;


    // const idBotonSeleccionado = searchParams.get('id');




      /******************************
       *                            *
       *         FUNCIONES          *
       *                            *
       ******************************/


      const establecerValores = () => {
        instancia.post('profesiones/devolverCampos.php', { id })
        .then ( response => {
          setDatosFormulario(prevDatosFormulario => ({
            ...prevDatosFormulario,
            idBoton: response.data.id,
            nombre: response.data.nombre,
            estado: response.data.estado,
            }))
        })
         .catch (error => {
          console.error("Error: ", error);
        })
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatosFormulario(prevDatosFormulario => ({
            ...prevDatosFormulario,
            [name]: value.trimStart(),
        }))
      }

      const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setDatosFormulario(prevDatosFormulario => ({
            ...prevDatosFormulario,
            [name]: value
        }))
      }



        /******************************
         *                            *
         *     ENVÍO DE FORMULARIO    *
         *                            *
         ******************************/

    const enviarFormulario = (url) => (e) => {
      e.preventDefault();




        /******************************
         *                            *
         *      ERRORES EN FRONT      *
         *                            *
         ******************************/


      if(validarNombre(datosFormulario.nombre)){
        alertaSwal("error", validarNombre(datosFormulario.nombre));
        setErrores({nombre: "error"});
      }
      else{
        instancia.post(url, datosFormulario)
        .then(response => {
          if(response.data.tipo == "error"){
            setErrores({nombre: "error"});
            alertaSwal("error", response.data.mensaje);
          }
          else{
            localStorage.setItem("sweetAlertData", JSON.stringify({
              mensaje: response.data.mensaje,
            }));
            navigate("/profesiones");
          }
        })
        .catch(error => {
        // Maneja errores en el envío.
          console.error("Error:", error);
        });
      }
    }





  /******************************
   *                            *
   *           RETURN           *
   *                            *
   ******************************/
  return (
    <Fragment>
        {location.pathname == "/profesiones/crear" ? (
            <div className="contenedorFormulario" id="contenedorFormularioCrearProfesiones">
                <form onSubmit = {enviarFormulario("profesiones/crearFormularioProfesiones.php")}>
                    <h2 className="h2Formulario">Formulario</h2>
                    <h3 className="h3Formulario">Profesiones</h3>
                    <input
                        name = "id"
                        placeholder = "ID"
                        className = "bloqueadoFormulario"
                        readOnly
                    />
                    <input
                        name = "nombre"
                        placeholder = "Nombre"
                        value = {datosFormulario.nombre}
                        onChange = {handleInputChange}
                        className= {errores.nombre ? "errorInput" : ""}
                        required
                    />
                    <input className="bloqueadoFormulario" placeholder="Activo" readOnly/>
                    <button type="submit" className="botonFormularioProfesiones">Crear registro</button>

                </form>
            </div>
        ) : (
            <div className="contenedorFormulario" id="contenedorFormularioModificarProfesiones">
                <form onSubmit = {enviarFormulario("profesiones/modificarFormularioProfesiones.php")}>
                    <h2 className="h2Formulario">Formulario</h2>
                    <h3 className="h3Formulario">Profesiones</h3>
                    <input
                        name = "id"
                        placeholder = {id}
                        className = "bloqueadoFormulario"
                        readOnly
                    />
                    <input
                        name = "nombre"
                        placeholder = "Nombre"
                        value = {datosFormulario.nombre}
                        onChange = {handleInputChange}
                        className= {errores.nombre ? "errorInput" : ""}
                        required
                    />
                    <select
                    name = "estado"
                    value = {datosFormulario.estado}
                    onChange = {handleSelectChange}
                    required
                    >
                        <option value="Activo">Activo</option>
                        <option value="Baja">Baja</option>
                    </select>
                    <button type="submit" className="botonFormularioProfesiones">Modificar registro</button>
                </form>
            </div>
            ) 
        }
    </Fragment>
  )
}

export default FormularioProfesiones