DROP DATABASE IF EXISTS pruebas;

-- Base de datos
CREATE DATABASE IF NOT EXISTS pruebas;
USE pruebas;

/*
 ***********************************************************
 *                                                         *
 *                        PROVINCIAS                       *
 *                                                         *
 ***********************************************************
*/

CREATE TABLE provincias (
    id INT(2) AUTO_INCREMENT, 
    nombre VARCHAR(40) NOT NULL,

    CONSTRAINT PK_Provincias PRIMARY KEY(id)
);

INSERT INTO provincias(nombre) 
VALUES
    ('Álava'), ('Albacete'), ('Alicante'), ('Almería'), ('Asturias'),
    ('Ávila'), ('Badajoz'), ('Barcelona'), ('Burgos'), ('Cáceres'),
    ('Cádiz'), ('Cantabria'), ('Castellón'), ('Ciudad Real'), ('Córdoba'),
    ('Cuenca'), ('Gerona'), ('Granada'), ('Guadalajara'), ('Guipúzcoa'),
    ('Huelva'), ('Huesca'), ('Islas Baleares'), ('Jaén'), ('La Coruña'),
    ('La Rioja'), ('Las Palmas'), ('León'), ('Lérida'), ('Lugo'),
    ('Madrid'), ('Málaga'), ('Murcia'), ('Navarra'), ('Orense'),
    ('Palencia'), ('Pontevedra'), ('Salamanca'), ('Santa Cruz de Tenerife'), ('Segovia'),
    ('Sevilla'), ('Soria'), ('Tarragona'), ('Teruel'), ('Toled'),
    ('Valencia'), ('Valladolid'), ('Vizcaya'), ('Zamora'), ('Zaragoza');

/*
 ***********************************************************
 *                                                         *
 *                    MOTIVOS DE VISITA                    *
 *                                                         *
 ***********************************************************
*/

CREATE TABLE motivos_visita (
    id INT(11) AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    estado enum('Activo', 'Baja'),

    CONSTRAINT PK_Motivos_Visita PRIMARY KEY(id)
);

INSERT INTO motivos_visita(nombre, estado) VALUES 
    ('Amigos y familiares', 'Activo'), 
    ('Cercanía de casa o trabajo', 'Activo'),   
    ('Redes sociales', 'Activo'), 
    ('Anuncio de televisión', 'Activo'), 
    ('Radio', 'Activo'), 
    ('Otro', 'Activo');



/*
 ***********************************************************
 *                                                         *
 *                      PROFESIONES                        *
 *                                                         *
 ***********************************************************
*/


CREATE TABLE profesiones (
    id INT(11) AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    estado enum('Activo', 'Baja'),

    CONSTRAINT PK_Profesiones PRIMARY KEY(id)
);

INSERT INTO profesiones(nombre, estado) 
    VALUES ('Operador de Atención al Cliente', 'Activo'), ('Médico', 'Activo'), ('Desarrollador Web', 'Activo'), ('Contable', 'Activo'), ('Futbolista', 'Activo'), ('Creador de Contenido Digital', 'Activo'), ('Policía', 'Activo'), ('Bombero', 'Activo'),
    ('Abogado', 'Activo'), ('Químico', 'Activo'), ('Profesor', 'Activo'), ('Guardia Civil', 'Activo'), ('Barrendero', 'Activo'), ('Cajero', 'Activo'), ('Celador', 'Activo'), ('Cirujano', 'Activo'), ('Empleado del Hogar', 'Activo'), 
    ('Recepcionista', 'Activo'), ('Pintor', 'Activo'), ('Banquero', 'Activo'), ('Veterinario', 'Activo'), ('Agricultor', 'Activo'), ('Agente Inmobiliario', 'Activo'), ('Arqueólogo', 'Activo'), ('Actor', 'Activo'), 
    ('Asesor Empresarial', 'Activo'), ('Cocinero', 'Activo'), ('Detective', 'Activo'), ('Dietista', 'Activo'), ('Dependiente', 'Activo'), ('Cazador', 'Activo'), ('Decorador', 'Activo'), ('Camarero', 'Activo'), ('Biólogo', 'Activo'), 
    ('Electricista', 'Activo'), ('Estilista', 'Activo'), ('Fotógrafo', 'Activo'), ('Músico', 'Activo'), ('Periodista', 'Activo'), ('Piloto', 'Activo'), ('Minero', 'Activo'), ('Pescador', 'Activo'), ('Militar', 'Activo'), ('Juez', 'Activo'), 
    ('Leñador', 'Activo'), ('Joyero', 'Activo'), ('Taxista', 'Activo'), ('Sastre', 'Activo'), ('Secretario', 'Activo'), ('Publicista', 'Activo'), ('Zapatero', 'Activo'), ('Traductor', 'Activo'), ('Relojero', 'Activo'),
    ('Trabajador Social', 'Activo'), ('Portero', 'Activo'), ('Político', 'Activo'), ('Programador', 'Activo'), ('Niñero', 'Activo'), ('Repartidor', 'Activo'), ('Panadero', 'Activo'), ('Modisto', 'Activo'), ('Marinero', 'Activo'),
    ('Mecánico', 'Activo'), ('Jardinero', 'Activo'), ('Ingeniero', 'Activo'), ('Gestor', 'Activo'), ('Conserje', 'Activo'), ('Frutero', 'Activo'), ('Carpintero', 'Activo'), ('Carnicero', 'Activo'), ('Bailarín', 'Activo'),
    ('Astronauta', 'Activo'), ('Asesor de Imagen', 'Activo'), ('Guardaespaldas', 'Activo'), ('Camionero', 'Activo'), ('Conductor', 'Activo'), ('Economista', 'Activo'), ('Editor', 'Activo'), ('Enfermero', 'Activo'),
    ('Escritor', 'Activo'), ('Empresario', 'Activo'), ('Entrenador', 'Activo'), ('Ganadero', 'Activo'), ('Granjero', 'Activo'), ('Herrero', 'Activo'), ('Historiador', 'Activo'), ('Físico', 'Activo'), ('Florista', 'Activo'),
    ('Nutricionista', 'Activo'), ('Optometrista', 'Activo'), ('Oftalmólogo', 'Activo'), ('Odontólogo', 'Activo'), ('Psicólogo', 'Activo'), ('Cerrajero', 'Activo'), ('Peluquero', 'Activo'), ('Fontanero', 'Activo'), ('Ebanista', 'Activo'),
    ('Tatuador', 'Activo'), ('Maquillador', 'Activo'), ('Alfarero', 'Activo'), ('Repostero', 'Activo'), ('Serigrafista', 'Activo'), ('Estibador', 'Activo'), ('Tapicero', 'Activo'), ('Transportista', 'Activo'), 
    ('Instalador de Climatización', 'Activo'), ('Albañil', 'Activo'), ('Operario de Logística', 'Activo'), ('Soldador', 'Activo'), ('Barnizador', 'Activo'), 
    ('Montador de Cristales y Vidrios', 'Activo'), ('Tenista', 'Activo'), ('Dentista', 'Activo');




/*
 ***********************************************************
 *                                                         *
 *                        CLIENTES                         *
 *                                                         *
 ***********************************************************
*/

CREATE TABLE clientes (
    id INT(11) AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(60),
    dni VARCHAR(9),
    email VARCHAR(50),
    telefono_fijo VARCHAR(9),
    telefono_movil VARCHAR(9) NOT NULL,
    profesion INT(11),
    direccion VARCHAR(100),
    codigo_postal VARCHAR(5),
    ciudad VARCHAR(40),
    provincia INT(2),
    fecha_nacimiento DATE,
    sexo ENUM('Hombre', 'Mujer', 'Otro'),
    mailing enum('Sí', 'No'),
    sms enum('Sí', 'No'),
    motivo_visita INT(11),
    observaciones VARCHAR(255),
    estado enum('Activo', 'Baja'),
    fecha_alta DATE NOT NULL,
    hora TIME NOT NULL,

    CONSTRAINT PK_Clientes PRIMARY KEY(id)
);

INSERT INTO clientes (nombre, apellidos, dni, email, telefono_fijo, telefono_movil, profesion, direccion, codigo_postal, ciudad, provincia, fecha_nacimiento, sexo, mailing, sms, motivo_visita, observaciones, estado, fecha_alta, hora) VALUES 
    ('Andrea', 'Abad Costa', '84146180J', 'andrea.abad@opticmize.net', '915647281', '679381192', 1, 'Avenida de la ONU, 1', '27930', 'Móstoles', 31, '2000-02-12', 'Mujer', 'Sí', 'Sí', 1, '', 'Activo', DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(NOW(), '%H:%i:%s')),
    ('Jose', 'Correas Martin', '61946539H', 'jose.correas@opticmize.net', '912201102', '728229202', 1, 'Avenida de la ONU, 1', '27930', 'Alcorcón',31, '2000-02-12', 'Hombre', 'No', 'No', 1, '', 'Activo', DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(NOW(), '%H:%i:%s')),
    ('Sara', 'Sánchez Lara', '27569487P', 'sara.sanchez@opticmize.net', '917969669', '690192203', 1, 'Avenida de la ONU, 1', '27930', 'Fuenlabrada', 31, '2000-02-12', 'Mujer', 'Sí', 'Sí', 1, '', 'Activo', DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(NOW(), '%H:%i:%s')),
    ('Daniel', 'Rivas López', '54496342G', 'daniel.rivas@opticmize.net', '900192293', '609099012', 1, 'Avenida de la ONU, 1', '27930', 'Móstoles', 31, '2000-02-12', 'Hombre', 'Sí', 'No', 1, '', 'Activo', DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(NOW(), '%H:%i:%s')),
    ('Sergio', 'Fernández Rayo', '00102073E', 'sergio.fernandez@opticmize.net', '992033940', '778172831', 9, 'Avenida de la ONU, 1', '27930', 'Fuenlabrada', 31, '2000-02-12', 'Hombre', 'Sí', 'No', 1, '', 'Activo',  DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(NOW(), '%H:%i:%s')),
    ('Amelia', 'Mena Tamayo', '48155743E', 'amelia.mena@opticmize.net', '939203919', '700902930', 2, 'Avenida de la ONU, 1', '27930', 'Móstoles', 31, '2000-02-12', 'Mujer', 'Sí', 'Sí', 1, '', 'Activo', DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(NOW(), '%H:%i:%s')),
    ('Ivan', 'Martinez Soria', '83993907T', 'ivan.martinez@opticmize.net', '959330523', '630229309', 2, 'Avenida de la ONU, 1', '27930', 'Alcorcón', 31, '2000-02-12', 'Hombre', 'No', 'No', 1, '', 'Activo',  DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(NOW(), '%H:%i:%s')),
    ('Álvaro', 'Lago Benito', '14810664K', 'alvaro.lago@opticmize.net', '970219293', '701929330', 2, 'Avenida de la ONU, 1', '27930', 'Leganés', 31, '2000-02-12', 'Hombre', 'No', 'Sí', 1, '', 'Activo',  DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(NOW(), '%H:%i:%s')),
    ('Beatriz', 'Cobos Cuadra', '42231380L', 'beatriz.cobos@opticmize.net', '987283890', '689402293', 2, 'Avenida de la ONU, 1', '27930', 'Móstoles', 31, '2000-02-12', 'Mujer', 'No', 'No', 1, '', 'Activo',  DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(NOW(), '%H:%i:%s')),
    ('Miguel', 'Corvillo Rea', '27916955S', 'miguel.corvillo@opticmize.net', '929789687', '602293384', 2, 'Avenida de la ONU, 1', '27930', 'Fuenlabrada', 31, '2000-02-12', 'Hombre', 'Sí', 'Sí', 1, '', 'Activo',  DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(NOW(), '%H:%i:%s')),
    ('Héctor', 'García Cortés', '73189683A', 'hector-garcia@opticmize.net', '940339392', '689482293', 10, 'Calle Badajoz, 19', '28944', 'Fuenlabrada', 31, '2000-01-03', 'Hombre', 'Sí', 'Sí', 1, '', 'Activo',  DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(NOW(), '%H:%i:%s')),
    ('Jorge', 'Sanz Vázquez', '31581311W', 'jorge.sanz@opticmize.net', '909203394', '777891003', 2, 'Avenida de la ONU, 1', '01922', 'Alcorcón', 37, '2000-02-12', 'Hombre', 'No', 'Sí', 1, '', 'Activo', DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(NOW(), '%H:%i:%s'));