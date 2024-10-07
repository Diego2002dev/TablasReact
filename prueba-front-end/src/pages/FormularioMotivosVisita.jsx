import { Fragment, useEffect, useState } from 'react'
import styles from "../components/motivos_visita/motivosVisita.module.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import instancia from "../../config/Instancia";
import { validarNombre } from "../validaciones/expresionesRegulares";
import { alertaSwal } from '../utils/alertaSwal';



const FormularioMotivosVisita = () => {


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

        const establecerValores = async () => {
          try {
            const response = await instancia.post('motivos_visita/devolverCampos.php', { id });
            setFormData(prevFormData => ({
              ...prevFormData,
              idBoton: response.data.id,
              nombre: response.data.nombre,
              estado: response.data.estado,
            }));


          } catch (error) {
            console.error('Error:', error);
          }
        };

        const extraerIds = async (id) => {

          await instancia("motivos_visita/consultar.php")
          .then( response => {
            const ids = response.data.some(dato => dato.id === Number(id));
            if(!ids){
              navigate("../motivos/");
            }
          })
          .catch( error => {
            console.log(error);
          })
      }



        if (location.pathname !== '/motivos/crear' && id) {
          extraerIds(id);
          establecerValores();
        }
      },[id, location.pathname, navigate]);


 


      // Preparar los datos del formulario  
      const [formData, setFormData] = useState({
        nombre: "",
      });
      
      
      //const idBotonSeleccionado = id;


      // const idBotonSeleccionado = searchParams.get('id');
 



        /******************************
         *                            *
         *         FUNCIONES          *
         *                            *
         ******************************/


        

        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData(prevFormData => ({
              ...prevFormData,
              [name]: value.trimStart(),
          }));
        };
  
        const handleSelectChange = (e) => {
          const { name, value } = e.target;
          setFormData(prevFormData => ({
              ...prevFormData,
              [name]: value
          }));
        };






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



          if(validarNombre(formData.nombre)){
            alertaSwal("error", validarNombre(formData.nombre));
            setErrores({nombre: "error"});
          }
          else{
            instancia.post(url, formData)
            .then(response => {
            
              if(response.data.tipo == "error"){
                setErrores({nombre: "error"});
                alertaSwal("error", response.data.mensaje);
              }
              else{
                localStorage.setItem('sweetAlertData', JSON.stringify({
                  mensaje: response.data.mensaje,
                }));
                navigate("/motivos");
              }
              
            })
            .catch(error => {
              console.error('Error:', error);
            }); 
          }
        }

      return (
      <Fragment>
      {location.pathname === '/motivos/crear' ? (
        <div className="contenedorFormulario">
          <form id={styles.FormularioCrear} onSubmit={enviarFormulario("motivos_visita/crearFormularioMotivos.php")}>
            
              <h2 className={styles.h2Formulario}>Formulario</h2>
              <h3 className={styles.h3Formulario}>Motivos de visita</h3>
              <input className="bloqueadoFormulario" placeholder="ID" readOnly/>
              <input
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className={errores.nombre ? "errorInput" : ""}
                required
              />
              <input className="bloqueadoFormulario" placeholder="Activo" readOnly/>
            
            <button id={styles.botonFormularioMotivos} className="botonFormulario" name="crear" type="submit">Crear registro</button>
          </form>
        </div>
        ) : (
          <div className="contenedorFormulario">
            <form onSubmit={enviarFormulario("motivos_visita/modificarFormularioMotivos.php")}>
            
              <h2 className={styles.h2Formulario}>Formulario</h2>
              <h3 className={styles.h3Formulario}>Motivos de visita</h3>
              <input className="bloqueadoFormulario" placeholder={formData.idBoton} readOnly/>
              <input
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre || ""} 
                onChange={handleInputChange}
                className={errores.nombre ? "errorInput" : ""}
                required
              />
              <select
                name="estado"
                value={formData.estado}
                onChange={handleSelectChange}
                required
              >
                <option value="Activo">Activo</option>
                <option value="Baja">Baja</option>
              </select>
            
              <button id={styles.botonFormularioMotivos} className="botonFormulario" name="modificar" type="submit">Modificar registro</button>
            </form>
          </div>
        )}
      </Fragment>
      )
    }

export default FormularioMotivosVisita;


// X Establecer el objeto formData como un useState
// X Al darle al boton modificar, se muestre en el input el nombre del id del boton pulsado
// X Dos archivos (MODIFICAR Y CREAR)
// X Clase errores en useState
// X Reenviar a MotivosVisita.jsx
//
// - Redirigir el url al boton seleccionado (si se modifica manualmente)
// - Expresiones regulares
// 