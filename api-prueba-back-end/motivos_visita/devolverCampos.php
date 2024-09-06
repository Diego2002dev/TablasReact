<?php
require_once "../config/config.php";
require_once "../config/cabezeras/cabezeras.php";

$data = file_get_contents("php://input");
$jsonData = json_decode($data);

$idParametro = isset($jsonData->id) ? $jsonData->id : "";

$queryDevolverCampos = $conexion->prepare("SELECT * FROM motivos_visita WHERE id = ?");
$queryDevolverCampos->bind_param("i", $idParametro);
$queryDevolverCampos->execute();
$resultado = $queryDevolverCampos->get_result();
$row = $resultado->fetch_assoc();

$idConstante = $row["id"];
$nombre = $row["nombre"];
$estado = $row["estado"];

$response = [
  "id" => $idConstante,
  "nombre" => $nombre,
  "estado" => $estado,
];

echo json_encode($response);
exit;

?>