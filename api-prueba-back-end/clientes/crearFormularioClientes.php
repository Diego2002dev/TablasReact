<?php
require_once "../config/config.php";
require_once "../config/cabezeras/cabezeras.php";


function deNombreAId($conexion, $profesion, $tablas){
    $query = $conexion->prepare("SELECT id FROM " . $tablas . " WHERE nombre = ?");
    $query->bind_param("s", $profesion);
    $query->execute();
    $result = $query->get_result();
    $row = $result->fetch_assoc();
    return $row["id"];
}

function quitarEspaciosSobrantes($string){
    return implode(' ',array_filter(explode(' ',$string)));
}


function validarDuplicidadDNI($conexion, $id){
    $query = $conexion->prepare("SELECT dni FROM clientes WHERE id = ? ");
    $query->bind_param("i", $id);
    $query->execute();
    $result = $query->get_result();
    $row = $result->fetch_assoc();
    return $row["dni"];
}



$datos = file_get_contents("php://input");
$datosJSON = json_decode($datos);

$id = isset($datosJSON->id) ? $datosJSON->id : "";
$nombre = isset($datosJSON->nombre) ? $datosJSON->nombre : "";
$apellidos = isset($datosJSON->apellidos) ? $datosJSON->apellidos : "";
$dni = isset($datosJSON->dni) ? $datosJSON->dni : "";
$email = isset($datosJSON->email) ? $datosJSON->email : "";
$telefono_fijo = isset($datosJSON->telefono_fijo) ? $datosJSON->telefono_fijo : "";
$telefono_movil = isset($datosJSON->telefono_movil) ? $datosJSON->telefono_movil : "";
$profesion = isset($datosJSON->profesion) ? $datosJSON->profesion : "";
$direccion = isset($datosJSON->direccion) ? $datosJSON->direccion : "";
$codigo_postal = isset($datosJSON->codigo_postal) ? $datosJSON->codigo_postal : "";
$ciudad = isset($datosJSON->ciudad) ? $datosJSON->ciudad : "";
$provincia = isset($datosJSON->provincia) ? $datosJSON->provincia : "";
$fecha_nacimiento = isset($datosJSON->fecha_nacimiento) ? $datosJSON->fecha_nacimiento : "";
$sexo = isset($datosJSON->sexo) ? $datosJSON->sexo : "";
$mailing = isset($datosJSON->mailing) ? $datosJSON->mailing : "";
$sms = isset($datosJSON->sms) ? $datosJSON->sms : "";
$motivo_visita = isset($datosJSON->motivo_visita) ? $datosJSON->motivo_visita : "";
$observaciones = isset($datosJSON->observaciones) ? $datosJSON->observaciones : "";

$hora = date('H:i:s');
$fecha_alta = date("Y-m-d");



$nombre = trim(ucfirst(strtolower($nombre))); // strtolower : Combierte el String en minuscula
                                              // ucfirst : Combierte en mayuscula la primera letra del String
                                              
$nombre = implode(' ',array_filter(explode(' ',$nombre))); // Primero quita todos los espacios entre las palabras
                                                           // y luego añade un espacio entre cada palabras

$apellidos = trim(ucwords($apellidos)); // ucwords : Combierte en mayuscula la primera letra de cada palabra de un String
$dni = trim(strtoupper($dni)); // strtoupper : Combierte el String en mayusculas
$email = trim(ucfirst($email));
$direccion = trim(ucfirst($observaciones));
$ciudad = trim(ucfirst($observaciones));
$observaciones = trim(ucfirst($observaciones));

$nombre = quitarEspaciosSobrantes($nombre);
$apellidos = quitarEspaciosSobrantes($apellidos);
$dni = quitarEspaciosSobrantes($dni);
$email = quitarEspaciosSobrantes($email);
$direccion = quitarEspaciosSobrantes($direccion);
$ciudad = quitarEspaciosSobrantes($ciudad);
$observaciones = quitarEspaciosSobrantes($observaciones);


if($_SERVER["REQUEST_METHOD"] === "POST"){

    $response = [];

    if(validarDuplicidadDNI($conexion, $id) === $dni){
        $response["mensaje"] = "El DNI ya existe";
        $response["tipo"] = "error";
    }

    else{
        

        $profesion = deNombreAId($conexion, $profesion, "profesiones");
        $provincia = deNombreAId($conexion, $provincia, "provincias");
        $motivo_visita = deNombreAId($conexion, $motivo_visita, "motivos_visita");

        $query = $conexion->prepare("INSERT INTO clientes (nombre, apellidos, dni, email, telefono_fijo, telefono_movil, profesion, direccion, codigo_postal, ciudad, provincia, fecha_nacimiento, sexo, mailing, sms, motivo_visita, observaciones, estado, fecha_alta, hora)
                                    VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )");

        $estado = "Activo";
        $query->bind_param("ssssiissssssssssssss", $nombre, $apellidos, $dni, $email, $telefono_fijo, $telefono_movil, $profesion,
                                                $direccion, $codigo_postal, $ciudad, $provincia, $fecha_nacimiento, $sexo,
                                                $mailing, $sms, $motivo_visita, $observaciones, $estado, $fecha_alta, $hora);

        if($query->execute()){
            $response["mensaje"] = "El cliente se ha registrado correctamente";
            $response["tipo"] = "success";
        }
    }

    echo json_encode($response);

}

?>