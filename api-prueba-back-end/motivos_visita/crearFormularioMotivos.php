<?php
require_once "../config/config.php";
require_once "../config/cabezeras/cabezeras.php";


/******************************
 *                            *
 *         FUNCIONES          *
 *                            *
 ******************************/

function comprobarNombreRepetido($conexion, $nombre){

    $queryNombreRepetido = $conexion->prepare("SELECT COUNT(*) as count FROM motivos_visita WHERE nombre = ?");
    $queryNombreRepetido->bind_param("s", $nombre);
    $queryNombreRepetido->execute();
    $result = $queryNombreRepetido->get_result();
    $row = $result->fetch_assoc();
    $count = $row["count"];

    if($count > 0){
        return true;
    }
    else{
        return false;
    }
}





/******************************
 *                            *
 *          VARIABLES         *
 *                            *
 ******************************/

// Obtiene el cuerpo de la solicitud
$data = file_get_contents("php://input");
//Lo transforma en JSON
$jsonData = json_decode($data);
//Asignamos cada elemento del objeto con una variable
$nombre = isset($jsonData->nombre) ? $jsonData->nombre : "";


$nombre = trim(ucfirst(strtolower($nombre))); // strtolower : Combierte el String en minuscula
                                              // ucfirst : Combierte en mayuscula la primera letra del String
                                              
$nombre = implode(' ',array_filter(explode(' ',$nombre))); // Primero quita todos los espacios entre las palabras
                                                           // y luego añade un espacio entre cada palabras




if($_SERVER["REQUEST_METHOD"] === "POST"){

    if(comprobarNombreRepetido($conexion, $nombre)){
        $response = [
        "mensaje" => 'El motivo con nombre "'.$nombre.'" ya existe y no se puede repetir',
        "tipo" => "error",
        ];
    }
    else{
    //Preparamos la consulta MODIFICAR
    $query = $conexion->prepare("INSERT INTO `motivos_visita`(`nombre`, `estado`) VALUES (?, ?)");
    //Pasamos los parametros (las variables declaradas inicialmente)
    $estado = "Activo";
    $query->bind_param('ss', $nombre, $estado);

        if ($query->execute()) {
            // Respuesta exitosa
            $response = [
                "mensaje" => "El motivo se ha registrado correctamente",
                "tipo" => "success",
            ];
            // } else {
            // // Error en la inserción
            //     $response = [
            //         "titulo" => "ERROR",
            //         "mensaje" => "El formulario no es válido",
            //         "icono" => "error",
            //         "botonConfirmacion" => "Vale",
            //     ];
        }
    }
}

    echo json_encode($response);
    exit;


?>