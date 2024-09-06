<?php
require_once "../config/config.php";
require_once "../config/cabezeras/cabezeras.php";

$query = $conexion->prepare("SELECT * FROM provincias");
$query->execute();
$resultado = $query->get_result();
$row = $resultado->fetch_assoc();


while($row = $resultado->fetch_assoc()){
    $provincias[] = $row;
}

echo json_encode($provincias);

?>