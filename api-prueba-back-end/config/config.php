<?php
require_once "parametros.php";
    $conexion = mysqli_connect(NOMBRESERVIDOR, USUARIO, CONTRASENA, BASEDATOS);
    if(!$conexion){
        die("Fallo de conexión");
    }
?>