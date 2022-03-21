<?php

function conexion(){
    return mysqli_connect('localhost','tupelues_full_stack','Full_st4ck','tupelues_full_stack');
}


$conexion = conexion();
$sql = "SELECT id_contacto,nombre_contacto,telefono,correo FROM contacto";
$resultado = mysqli_query($conexion,$sql);
$datos = mysqli_fetch_all($resultado,MYSQLI_ASSOC);

if(!empty($datos)){
    echo json_encode($datos);
}else{
    echo json_encode([]);
}