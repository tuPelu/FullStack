suma();
manuel();
//Las declaraciones de JavaScript se pueden agrupar 
//en bloques de código, dentro de corchetes {...}.
function suma(){
    document.getElementById("demo").innerHTML = 5 + 6; /*Cada línea es una declaración*/
    document.write(6 + 6); //Esto son los operadores ( = + - * / ):
    window.alert(7 + 6);
    console.log(8 + 6);
}
function manuel(){
    let x, y, z;  // Statement 1// Declare 3 variables
    x = 9;        // Statement 2
    y = 6;        // Statement 3
    z = x + y;    // Statement 4
    document.getElementById("manuel").innerHTML =
    "The value of z is " + z + ".";  
}