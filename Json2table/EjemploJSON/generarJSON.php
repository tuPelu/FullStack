<?php

$server = "localhost";
$user = "tupelues_full_stack";
$pass = "Full_st4ck";
$bd = "tupelues_full_stack";

//Creamos la conexión
$conexion = mysqli_connect($server, $user, $pass,$bd) 
or die("Ha sucedido un error inexperado en la conexion de la base de datos");

//generamos la consulta
$sql = "SELECT * FROM clientes";
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

if(!$result = mysqli_query($conexion, $sql)) die();

$clientes = array(); //creamos un array

while($row = mysqli_fetch_array($result)) 
{ 
	$id=$row['id'];
	$nombre=$row['nombre'];
	$edad=$row['edad'];
	$genero=$row['genero'];
	$email=$row['email'];
	$localidad=$row['localidad'];
	$telefono=$row['telefono'];
	

	$clientes[] = array('id'=> $id, 'nombre'=> $nombre, 'edad'=> $edad, 'genero'=> $genero,
						'email'=> $email, 'localidad'=> $localidad, 'telefono'=> $telefono);

}
	
//desconectamos la base de datos
$close = mysqli_close($conexion) 
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");
  

//Creamos el JSON
//$clientes['clientes'] = $clientes;
$json_string = json_encode($clientes);
echo $json_string;

//Si queremos crear un archivo json, sería de esta forma:
/*
$file = 'clientes.json';
file_put_contents($file, $json_string);
*/
	

?>