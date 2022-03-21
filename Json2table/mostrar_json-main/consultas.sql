create table contacto(
     id_contacto int primary key auto_increment,
     nombre_contacto varchar(70),
     telefono varchar(10),
     correo varchar(50)
);

INSERT INTO contacto ( nombre_contacto, telefono, correo) VALUES ( 'Alfredo', '1234567890', 'contacto@amail.com');
INSERT INTO contacto ( nombre_contacto, telefono, correo) VALUES ( 'Juan', '0123456789', 'contacto@email.com');
INSERT INTO contacto ( nombre_contacto, telefono, correo) VALUES ( 'Manuel', '9874561230', 'contaco@bmail.com');