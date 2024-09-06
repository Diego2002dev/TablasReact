<?php
require_once "../config/config.php";
require_once "../config/cabezeras/cabezeras.php";


$idURL = file_get_contents("php://input");
$idURLJSON = json_decode($idURL);
$id = isset($idURLJSON->id) ? $idURLJSON->id : "";

$query = $conexion->prepare("SELECT * FROM profesiones WHERE id = ?");
$query->bind_param("i", $id);
$query->execute();
$queryResultados = $query->get_result();
$row = $queryResultados->fetch_assoc();

$nombre = $row["nombre"];
$estado = $row["estado"];

$response = [
    "id" => $id,
    "nombre" => $nombre,
    "estado" => $estado,
];

echo json_encode($response);

?>