<?php
require_once "../config/config.php";
require_once "../config/cabezeras/cabezeras.php";

$nombresActivos = [];

$query = $conexion->prepare("SELECT nombre FROM profesiones WHERE estado = 'Activo'");
$query->execute();
$result = $query->get_result();

    while($row = $result->fetch_assoc()){
        $nombresActivos[] = $row;
    }

echo json_encode($nombresActivos);

?>