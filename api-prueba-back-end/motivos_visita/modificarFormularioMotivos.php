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


function comprobarCampos($conexion, $nombre, $estado, $idBoton){

    $query = $conexion->prepare("SELECT nombre, estado FROM motivos_visita WHERE id = ?");
    $query->bind_param("i", $idBoton);
    $query->execute();
    $resultado = $query->get_result();
    $row = $resultado->fetch_assoc();
    
    $rowNombre = $row["nombre"];
    $rowEstado = $row["estado"];
    
    if ($rowEstado !== $estado && $rowNombre === $nombre){
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
$estado = isset($jsonData->estado) ? $jsonData->estado : "";
$idBoton = isset($jsonData->idBoton) ? $jsonData->idBoton : "";

$nombre = trim(ucfirst(strtolower($nombre))); // strtolower : Combierte el String en minuscula
                                              // ucfirst : Combierte en mayuscula la primera letra del String
                                              
$nombre = implode(' ',array_filter(explode(' ',$nombre))); // Primero quita todos los espacios entre las palabras
                                                           // y luego añade un espacio entre cada palabras





if($_SERVER["REQUEST_METHOD"] === "POST"){
    
    if((comprobarNombreRepetido($conexion, $nombre)) && !comprobarCampos($conexion, $nombre, $estado, $idBoton)){
        $response = [
        "mensaje" => 'El motivo con nombre "'.$nombre.'" ya existe y no se puede repetir',
        "tipo" => "error",
        ];
    }
    else{

        //Preparamos la consulta MODIFICAR
        $query = $conexion->prepare("UPDATE motivos_visita SET nombre = ?, estado = ? WHERE id = ?");
        //Pasamos los parametros (las variables anteriores)
        $query->bind_param("ssi", $nombre, $estado, $idBoton);
        
        if ($query->execute()) {
            // Respuesta exitosa
            $response = [
                "mensaje" => "El motivo se ha actualizado correctamente",
                "tipo" => "success",
                ];
            }
    }
}

echo json_encode($response);
exit;


// - Redirigir el url al boton seleccionado (si se modifica manualmente)

?>