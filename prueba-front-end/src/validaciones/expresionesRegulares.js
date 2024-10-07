
export function validarNombre(nombre){

    // const regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ ]+$/;
    const regexLongitudMax = /^.{2,45}$/;
    const regexLongitudMin = /^.{2,}$/;

    const nombreTrim = nombre.trim();

    // if (!regexSoloLetras.test(nombreTrim)) {
    //     return "El nombre solo puede contener letras";
    // }
    if (!regexLongitudMin.test(nombreTrim)) {
        return "El nombre debe tener mas de un caracter";
    }
    if (!regexLongitudMax.test(nombreTrim)) {
        return "El nombre solo puede tener hasta un máximo de 45 caracteres";
    }
}







export function validarNombreCliente(nombre){

    const regexLongitudMax = /^.{2,20}$/;
    const regexLongitudMin = /^.{2,}$/;

    if (!regexLongitudMin.test(nombre.trim())) {
        return "El nombre debe tener mas de un caracter";
    }
    if (!regexLongitudMax.test(nombre.trim())) {
        return "El nombre solo puede tener hasta un máximo de 20 caracteres";
    }
}


export function validarApellidos(apellidos){

    const regexLongitudMax = /^.{2,45}$/;
    const regexLongitudMin = /^.{2,}$/;

    if (!regexLongitudMin.test(apellidos.trim())) {
        return "El apellido debe tener mas de un caracter";
    }
    if (!regexLongitudMax.test(apellidos.trim())) {
        return "El apellido solo puede tener hasta un máximo de 45 caracteres";
    }
}


export function validarDni(dni){
    const regex = /^\d{8}[A-Za-z]$/;

    dni = dni.trim();

    if(!regex.test(dni)){
        return "El DNI debe contener nueve dígitos";
    }

    const letraDni = dni.split("");
    letraDni.pop();
    const dniSinLetra = letraDni.join("");

    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";

    const resto = dniSinLetra % 23;
    const nuevaLetraDni = letras.charAt(resto);
    if(dniSinLetra + nuevaLetraDni.toUpperCase() !== dni.toUpperCase()){
        return "La letra del DNI no corresponde con los números";
    }
}

export function validarEmail(email){
    const regex = /^[A-Za-zÁÉÍÓÚáéíóú0-9._%+-]+@[A-Za-zÁÉÍÓÚáéíóú0-9.-]+\.[A-Za-zÁÉÍÓÚáéíóú]{2,}$/;
    if(!regex.test(email)){
        return "El email es incorrecto";
    }
}

export function validarTFijo(telefono_fijo){
    if(telefono_fijo.length !== 9){
        return "El teléfono fijo debe contener 9 dígitos";
    }
}

export function validarTMovil(telefono_movil){
    if(telefono_movil.length !== 9){
        return "El teléfono móvil debe contener 9 dígitos";
    }
}



export function validarDireccion(direccion){
    if(direccion.length <= 1){
        return "La dirección debe tener mas de un caracter";
    }
}

export function validarCodigoPostal(codigoPostal){
    
    if(codigoPostal.length !== 5){
        return "El código postal debe tener 5 dígitos";
    }
}
export function validarCiudad(ciudad){
    
    if(ciudad.length <= 1){
        return "En la ciudad solo has puesto una letra";
    }
    
}
export function validarFechaNacimiento(fecha) {
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    const fechaInput = new Date(fecha);
    const fechaLimite = new Date("1910-01-01");

    if (fechaInput > fechaActual) {
        return "La fecha es posterior a la actual";
    }
    if (fechaInput < fechaLimite) {
        return "La fecha no es válida";
    }
}

export function validarProfesiones(profesion) {
    if(profesion == "--Selecciona--"){
        return "Selecciona una profesión";
    }
}
export function validarProvincias(provincia) {
    if(provincia == "--Selecciona--"){
        return "Selecciona una provincia";
    }
}
export function validarMotivos(motivos_visita) {
    if(motivos_visita == "--Selecciona--"){
        return "Selecciona un motivo de visíta";
    }
}
