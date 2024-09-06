import { Fragment, useEffect, useState } from "react";
import instancia from "../../config/Instancia";
import "../components/motivos_visita/motivosVisita.css";
import MotivoVisita from "../components/motivos_visita/MotivoVisita";
import { Link, useNavigate } from "react-router-dom";
import { alertaSwal } from "../validaciones/funciones";


export const MotivosVisita = () => {

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









  const [motivosVisita, setMotivosVisita] = useState ([]);

  useEffect(() => {
    llamarMotivoConsulta();
  }, []);

  async function llamarMotivoConsulta(){
    try{
    const respuesta = await instancia("motivos_visita/consultar.php");
    setMotivosVisita(respuesta.data);
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <Fragment>
    <h1>Motivos de visita</h1>  
    <div id="contenedor">
    <table id="tablaMotivosVisita">
      <thead>
        <tr>
          <th id="thIdMotivos" className="tHead">ID</th>
          <th id="thNombreMotivos" className="tHead">Nombre</th>
          <th id="thEstadoMotivos" className="tHead">Estado</th>
          <th className="ocultarScroll"></th>
        </tr>
      </thead>
      <tbody>
      {motivosVisita.map(( motivo, index ) =>
        <MotivoVisita key={index} motivo = {motivo} />
      )}
      </tbody>
    </table>
    </div>
    <Link id="contenedorBotonCrear" to="crear">
    <button id="botonCrear">Crear Motivo de Visita</button>
    </Link>
  </Fragment>
  )
}

export default MotivosVisita;



