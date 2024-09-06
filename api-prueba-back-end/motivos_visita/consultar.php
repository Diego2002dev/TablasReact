<?php
require_once "../config/config.php";
require_once "../config/cabezeras/cabezeras.php";

$motivos_visita = [];

$query = $conexion->prepare("SELECT * FROM motivos_visita");

$query->execute();
$resultado = $query->get_result();

    while($fila = $resultado->fetch_assoc()){
        //array_push($motivos_visita, $fila);
        $motivos_visita[] = $fila;
    }

    // var_dump($motivos_visita);

    echo json_encode($motivos_visita);

exit;

?>