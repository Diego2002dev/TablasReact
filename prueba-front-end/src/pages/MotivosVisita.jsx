import { useEffect, useState } from "react";
import instancia from "../../config/Instancia";
import styles from "../components/motivos_visita/motivosVisita.module.css";
import MotivoVisita from "../components/motivos_visita/MotivoVisita";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useContext } from "react";
import { GlobalContext } from "../components/context/GlobalStateProvider";
import { alertaSwal } from "../utils/alertaSwal";



export const MotivosVisita = () => {


  const { rowSeleccionada, setRowSeleccionada } = useContext(GlobalContext);

  const handleRowClick = (rowData) => { 
    setRowSeleccionada((prevRows) => {
      if (rowData) {
        return {
          ...prevRows,
          motivos: {
            ...prevRows.motivos,
            [rowData]: !prevRows.motivos[rowData],
          },
        };
      }
      return prevRows;
    });
    window.getSelection().removeAllRanges();
  }




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


  const [motivosVisita, setMotivosVisita] = useState ([]);

  useEffect(() => {
    llamarMotivoConsulta();
  }, []);


  const llamarMotivoConsulta = () => {
    instancia("motivos_visita/consultar.php")
    .then(response => {
      setMotivosVisita(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.log("Error: " + error);
    })
  }
  

  return (
    loading ? (
      <Loading/>
    ) : (
      <>
        <h1>Motivos de visita</h1>  
        <div id={styles.contenedor}>
        <table id={styles.tablaMotivosVisita}>
          <thead>
            <tr>
              <th id={styles.thIdMotivos} className={styles.tHead}>ID</th>
              <th id={styles.thNombreMotivos} className={styles.tHead}>Nombre</th>
              <th id={styles.thEstadoMotivos} className={styles.tHead}>Estado</th>
              <th className="ocultarScroll"></th>
            </tr>
          </thead>
          <tbody>
          {motivosVisita.map(( motivo, index ) =>
            <MotivoVisita
            rowSeleccionada={rowSeleccionada}
            onRowClick={handleRowClick}
            key={index}
            motivo = {motivo} />
          )}
          </tbody>
        </table>
        </div>
        <Link id={styles.contenedorBotonCrear} to="crear">
        <button id={styles.botonCrear}>Crear Motivo de Visita</button>
        </Link>
      </>
    )
  )
}

export default MotivosVisita;
