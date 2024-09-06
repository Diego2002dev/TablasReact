<?php
require_once "../config/config.php";
require_once "../config/cabezeras/cabezeras.php";


$query = $conexion->prepare("SELECT * FROM clientes");
$query->execute();
$resultado = $query->get_result();

while($row = $resultado->fetch_assoc()){

    if(isset($row["fecha_nacimiento"])){
        $fechaNacimiento = new DateTime($row['fecha_nacimiento']);
        $row['fecha_nacimiento'] = $fechaNacimiento->format('d-m-Y');
    }
    if(isset($row["fecha_alta"])){
        $fechaAlta = new DateTime($row['fecha_alta']);
        $row['fecha_alta'] = $fechaAlta->format('d-m-Y');
    }
    if(isset($row["hora"])){
        $hora = new DateTime($row["hora"]);
        $row['hora'] = $hora->format('H:i');
    }





    if(isset($row["profesion"])){
        
        $queryMotivo  = $conexion->prepare("SELECT nombre FROM profesiones WHERE id = ? ");
        $queryMotivo->bind_param("i", $row["profesion"]);
        $queryMotivo->execute();
        
        $queryMotivo->bind_result($nombreProfesion);
        $queryMotivo->fetch();
        
        $row["profesion"] = $nombreProfesion;
        
        $queryMotivo->close();
    }
    if(isset($row["motivo_visita"])){

        $queryMotivo  = $conexion->prepare("SELECT nombre FROM motivos_visita WHERE id = ? ");
        $queryMotivo->bind_param("i", $row["motivo_visita"]);
        $queryMotivo->execute();
        
        $queryMotivo->bind_result($nombreMotivo);
        $queryMotivo->fetch();
        
        $row["motivo_visita"] = $nombreMotivo;
        
        $queryMotivo->close();
    }
    if(isset($row["provincia"])){

        $queryMotivo  = $conexion->prepare("SELECT nombre FROM provincias WHERE id = ? ");
        $queryMotivo->bind_param("i", $row["provincia"]);
        $queryMotivo->execute();
        
        $queryMotivo->bind_result($nombreProvincia);
        $queryMotivo->fetch();
        
        $row["provincia"] = $nombreProvincia;
        
        $queryMotivo->close();
    }


    $clientes[] = $row;
}

echo json_encode($clientes);

?>