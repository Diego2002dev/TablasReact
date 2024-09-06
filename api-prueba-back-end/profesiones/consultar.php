<?php
require_once "../config/config.php";
require_once "../config/cabezeras/cabezeras.php";


$profesiones = [];

$query = $conexion->prepare("SELECT * FROM profesiones");
$query->execute();
$resultado = $query->get_result();

while($row = $resultado->fetch_assoc()){
    $profesiones[] = $row;
}

echo json_encode($profesiones);

exit;

?>