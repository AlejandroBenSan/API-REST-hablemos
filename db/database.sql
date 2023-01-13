DROP DATABASE IF EXISTS HABLEMOS;
CREATE DATABASE HABLEMOS;
USE HABLEMOS;

CREATE TABLE estudiantes(
    id int primary key auto_increment,
    nombre varchar(100) not null,
    apellidos varchar(150) not null,
    email varchar(150) not null unique,
    contrasenya varchar(50) not null,
    edad date not null,
    info varchar(300) null,
    foto mediumblob null
);

CREATE TABLE profesores(
    id int primary key auto_increment,
    nombre varchar(100) not null,
    apellidos varchar(150) not null,
    email varchar(150) not null unique,
    contrasenya varchar(14) not null,
    edad date null,
    info varchar(300) null,
    foto mediumblob null
);

CREATE TABLE clases(
    id int primary key auto_increment,
    titulo varchar(50) not null,
    hora_fecha datetime not null,
    clase_realizada ENUM('SI','NO'),
    comentarios varchar(500) null,
    precio float not null,
    id_profesor int not null,
    foreign key (id_profesor) references profesores(id)
        on delete cascade on update cascade
);

create table clases_alumnos(
    id int primary key auto_increment,
    id_clase int not null,
    id_estudiantes int NULL UNIQUE ,
    foreign key (id_clase) references clases(id)
        on delete cascade on update cascade,
    foreign key (id_estudiantes) references estudiantes(id)
        on delete restrict on update cascade
-- HAY QUE COMPROBAR QUE NO CUANDO SE MODIFIQUE UN USUARIO NO SE BORRE LA CLASE
);

create table profesor_estudiantes(
    id int auto_increment primary key,
    id_profesor int not null,
    id_estudiante int not null UNIQUE,
    foreign key (id_profesor) references profesores(id),
    foreign key (id_estudiante) references estudiantes(id)
);

-- HISTORICO DE ALUMNOS Y PROFESORES EN RELACIÓN A LAS CLASES --
create table estudiantes_historico_clases(
    id int auto_increment primary key,
    id_estudiante int not null,
    id_clase int not null,
    foreign key (id_estudiante) references estudiantes(id),
    foreign key (id_clase) references clases(id)
);

create table profesores_historico_clases(
    id int auto_increment primary key,
    id_profesor int not null,
    id_clase int not null,
    foreign key (id_profesor) references profesores(id),
    foreign key (id_clase) references clases(id)
);

-- TODO PROCEDIMIENTOS --

-- INSERTS -- 
INSERT INTO estudiantes (nombre, apellidos,email,contrasenya,edad,info,foto) VALUES (
"Natalia", "Nowakowska Benitez", "natalcia9405@gmail.com", "soyNatalia","1994-11-20","Vivo en alicante
, pero soy polaca",null)
-- CREAR UN ESTUDIANTE --
DELIMITER $$
$$
drop procedure if exists crear_estudiante;
create procedure crear_estudiante (
    in nombre_estudiante varchar(100),
    in apellidos_estudiante varchar(150),
    in email_estudiante varchar(150),
    in contrasenya_estudiante varchar(50),
    in edad_estudiante date,
    in info_estudiante varchar(300),
    in foto_estudiante mediumblob)
begin
    declare continue handler for SQLEXCEPTION
        begin
            select 'Error al insertar los datos';
        end;
    insert into estudiantes (nombre, apellidos, email, contrasenya, edad,foto,info)
        values (nombre_estudiante,apellidos_estudiante,email_estudiante,contrasenya_estudiante,
                edad_estudiante,foto_estudiante,info_estudiante);
end
$$
DELIMITER ;
 -- call crear_estudiante('Alejandro','Benitez Sanchez','alexbbss1992@gmail.com','micontraseña', --
 --   '1992-01-12','BASICO','Hola me llamo Alex'); --

-- CREAR UN PROFESOR --

DELIMITER $$
$$
drop procedure if exists crear_profesor;
create procedure crear_profesor(
    in nombre_profesor varchar(100),
    in apellidos_profesor varchar(150),
    in email_profesor varchar(150),
    in contrasenya_profesor varchar(50),
    in edad_profesor date,
    in info_profesor varchar(300))
begin

    insert into profesores(nombre, apellidos, email, contrasenya, edad, info)
        values (nombre_profesor,apellidos_profesor,email_profesor,contrasenya_profesor,edad_profesor,info_profesor);
end
$$
DELIMITER ;

-- CREAR UNA CLASE --

DELIMITER $$
$$
drop procedure if exists crear_clase_profesor;
create procedure crear_clase_profesor(
    in titulo_clase varchar(50),
    in hora_fecha_clase datetime,
    in clase_hecha varchar(2),
    in comentarios_clase varchar(500),
    in precio_clase float,
    in id_profesor_clase int)
begin
    declare continue handler for SQLEXCEPTION
        begin
            select 'Error al insertar los datos';
        end;
    insert into clases (titulo, hora_fecha, clase_realizada, comentarios, precio, id_profesor)
        values (titulo_clase,hora_fecha_clase,clase_hecha,comentarios_clase,precio_clase,id_profesor_clase);
end
$$
Delimiter ;

-- METER ESTUDIANTES RELACIONADOS CON PROFESOR --

delimiter $$
$$
drop procedure if exists meter_estudiante_profesor;
create procedure meter_estudiante_profesor(
    in id_profesor_clase int,
    in id_alumno int)
begin
    declare continue handler for SQLEXCEPTION
        begin
            select 'Error al insertar los datos';
        end;
    insert into profesor_estudiantes(ID_PROFESOR, ID_ESTUDIANTE)
        VALUES (id_profesor_clase,id_alumno);
end
$$
delimiter ;

-- METER ESTUDIANTES EN LA CLASE

delimiter $$
$$
drop procedure if exists meter_alumnos_clase;
create procedure meter_alumnos_clase(
    in id_clase_ int,
    in id_estudiante int)
begin
    declare continue handler for SQLEXCEPTION
        begin
            select 'Error al insertar los datos';
        end;
    insert into clases_alumnos(id_clase, id_estudiantes) values (id_clase_,id_estudiante);
end
$$
delimiter ;
-- TODO TRIGGERS --