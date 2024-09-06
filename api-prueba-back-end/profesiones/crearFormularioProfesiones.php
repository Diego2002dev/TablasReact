<?php
require_once "../config/config.php";
require_once "../config/cabezeras/cabezeras.php";


function comprobarNombreRepetido($conexion, $nombre){
    $query = $conexion->prepare("SELECT COUNT(*) as count FROM profesiones WHERE nombre = ?");
    $query->bind_param("s", $nombre);
    $query->execute();
    $resultado = $query->get_result();
    $row = $resultado->fetch_assoc();
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

$datosFormulario = file_get_contents("php://input");
$datosFormularioJSON = json_decode($datosFormulario);

$nombre = isset($datosFormularioJSON->nombre) ? $datosFormularioJSON->nombre : "";
$nombre = trim(ucfirst(strtolower($nombre))); // strtolower : Combierte el String en minuscula
                                              // ucfirst : Combierte en mayuscula la primera letra del String
                                              
$nombre = implode(' ',array_filter(explode(' ',$nombre))); // Primero quita todos los espacios entre las palabras
                                                           // y luego añade un espacio entre cada palabras


if($_SERVER["REQUEST_METHOD"] === "POST"){

    $query = $conexion->prepare("INSERT INTO profesiones (nombre, estado) VALUES (?, ?)");
    $estado = "Activo";
    $query->bind_param("ss", $nombre, $estado);
    
    
    if(comprobarNombreRepetido($conexion, $nombre)){
        $response = [
            "mensaje" => 'La profesión con nombre "'.$nombre.'" ya existe y no se puede repetir',
            "tipo" => "error",
        ];
    }
    else{
        if($query->execute()){
            $response = [
                "mensaje" => 'La profesión se ha registrado con exito',
                "tipo" => "success",
            ];
        }
    }
    echo json_encode($response);
    exit;
        
}














?>