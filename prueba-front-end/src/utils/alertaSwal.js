import Swal from "sweetalert2";
import styles from "./sweetAlert.module.css"


export const alertaSwal = (icon, mensaje) => {
      if(icon == "success")
      return Swal.fire({
        title: "ÉXITO",
        text: mensaje,
        icon: "success",
        confirmButtonText: "Vale",

        customClass: {  
          popup: styles["custom-popup-success"],
          title: styles["custom-title-success"],
          confirmButton: styles["custom-button-success"],
        },
        backdrop: "rgba(0, 0, 0, 0.6)",
        buttonsStyling: false,
      });
      if(icon == "error"){
        Swal.fire({
          title: "ERROR",
          text: mensaje,
          icon: "error",
          confirmButtonText: "Vale",

          customClass: {
            popup: styles["custom-popup-error"],
            title: styles["custom-title-error"],
            confirmButton: styles["custom-button-error"],
          },
          backdrop: "rgba(0, 0, 0, 0.6)",
          buttonsStyling: false,
        });
      }
      else{
        Swal.fire({
          title: "ERROR SWALERT",
          text: "ERROR SWALERT",
          icon: "",
          confirmButtonText: "ERROR SWALERT",
        });
      }
}