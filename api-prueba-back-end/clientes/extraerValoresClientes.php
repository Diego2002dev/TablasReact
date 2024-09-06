<?php
require_once "../config/config.php";
require_once "../config/cabezeras/cabezeras.php";


$datos = file_get_contents("php://input");
$datosJSON = json_decode($datos);
$id = $datosJSON->id;

$query = $conexion->prepare("SELECT * FROM clientes WHERE id = ? ");
$query->bind_param("i", $id);
$query->execute();
$resultado = $query->get_result();
$row = $resultado->fetch_assoc();

$profesion = $row["profesion"];
$provincia = $row ["provincia"];
$motivo_visita = $row ["motivo_visita"];


function deIdANombre($conexion, $campo, $id){
    $query = $conexion->prepare("SELECT nombre FROM ". $campo ." WHERE id = ? ");
    $query->bind_param("i", $id);
    $query->execute();
    $result = $query->get_result();
    $row = $result->fetch_assoc();

    return $row["nombre"];
}


    $profesion = deIdANombre($conexion, "profesiones", $row["profesion"]);
    $provincia = deIdANombre($conexion, "provincias", $row["provincia"]);
    $motivo_visita = deIdANombre($conexion, "motivos_visita", $row["motivo_visita"]);


$response = [
    "id" => $row["id"],
    "nombre" => $row ["nombre"],
    "apellidos" => $row ["apellidos"],
    "dni" => $row ["dni"],
    "email" => $row ["email"],
    "telefono_fijo" => $row ["telefono_fijo"],
    "telefono_movil" => $row ["telefono_movil"],
    "profesion" => $profesion,
    "direccion" => $row ["direccion"],
    "codigo_postal" => $row ["codigo_postal"],
    "ciudad" => $row ["ciudad"],
    "provincia" => $provincia,
    "fecha_nacimiento" => $row ["fecha_nacimiento"],
    "sexo" => $row ["sexo"],
    "mailing" => $row ["mailing"],
    "sms" => $row ["sms"],
    "motivo_visita" => $motivo_visita,
    "observaciones" => $row ["observaciones"],
    "estado" => $row ["estado"],
    "fecha_alta" => $row ["fecha_alta"],
    "hora" => $row ["hora"],
];


echo json_encode($response);


?>