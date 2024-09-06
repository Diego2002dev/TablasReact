import Swal from "sweetalert2";

/******************************
 *                            *
 *          Alertas           *
 *                            *
 ******************************/


export const alertaSwal = (icon, mensaje) => {
      if(icon == "success")
      return Swal.fire({
        title: "ÉXITO",
        text: mensaje,
        icon: "success",
        confirmButtonText: "Vale",
      });
      else{
        Swal.fire({
          title: "ERROR",
          text: mensaje,
          icon: "error",
          confirmButtonText: "Vale",
        });
      }
};









  