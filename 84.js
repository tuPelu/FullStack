const flores = ["Amapola", "Margarita", "Rosa"];

//Bucle For normal
let mitexto = "";
for (let i=0; i < flores.length ; i++) {       //BUCLE O ITERACION O LOOP FOR
    var lafloreliminada = flores.splice(0, 1);
    flores [flores.length] = lafloreliminada;
    mitexto = mitexto + flores.toString() + "<br>";
}

document.getElementById("quelindasflores1").innerHTML = mitexto;


//Bucle For in
for (let i in flores) {
    var lafloreliminada = flores.splice(0, 1);
    flores [flores.length] = lafloreliminada;

    mitexto = mitexto + flores.toString() + "<br>";
  }

document.getElementById("quelindasflores2").innerHTML = mitexto;


//Bucle do while
let i = 0;
do {
    var lafloreliminada = flores.splice(0, 1);
    flores [flores.length] = lafloreliminada;
    mitexto = mitexto + flores.toString() + "<br>";

    i=i+1;
} while (i < flores.length );

document.getElementById("quelindasflores3").innerHTML = mitexto;

//Condicional if
const hour = new Date().getHours(); 
document.getElementById("demo1").innerHTML = hour;
let greeting;

if (hour < 13) {
  greeting = "Buenos dias";
} else if(hour < 20){
  greeting = "Buenas tardes";
} else{
    greeting = "Buenas noches";
}

document.getElementById("demo2").innerHTML = greeting;

//Condicional switch case
const diaDeLaSemana = new Date().getDay(); 
document.getElementById("demo3").innerHTML = diaDeLaSemana;

let day;
switch (diaDeLaSemana) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case  6:
    day = "Saturday";
}
document.getElementById("demo4").innerHTML = "Today is " + day;

mitexto = "";
for (let i=0; i < flores.length ; i++) {       //BUCLE O ITERACION O LOOP FOR
    var lafloreliminada = flores.splice(0, 1);
    flores [flores.length] = lafloreliminada;

    if (i == 1) { break; }
    mitexto = mitexto + flores.toString() + "<br>";
}

document.getElementById("demo5").innerHTML = mitexto;
document.getElementById("chivato").innerHTML = flores.toString();

mitexto = "";
for (let i=0; i < flores.length ; i++) {       //BUCLE O ITERACION O LOOP FOR
    var lafloreliminada = flores.splice(0, 1);
    flores [flores.length] = lafloreliminada;

    if (flores[0] == "Rosa") { break; }
    mitexto = mitexto + flores.toString() + "<br>";
}

document.getElementById("demo6").innerHTML = mitexto;
document.getElementById("chivato1").innerHTML = flores.toString();


mitexto = "";
for (let i=0; i < flores.length ; i++) {       //BUCLE O ITERACION O LOOP FOR
    var lafloreliminada = flores.splice(0, 1);
    flores [flores.length] = lafloreliminada;

    if (i%2==0) { 
        mitexto = mitexto + flores.toString() + "<br>";
    }else{
        mitexto = mitexto + "<!--" + flores.toString() + "<br>" + "-->";
    }
}

document.getElementById("demo7").innerHTML = mitexto;




const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
const orden = [2, 3, 1, 5, 4];
const fruitsOrdenats = ["", "", "", "", ""];


for (let i = 0; i < fruits.length ; i++) {       //BUCLE O ITERACION O LOOP FOR
    var frutaQueToca = fruits[i]; //Banana
    var ordenQueToca = orden[i] - 1; //2-1 = 1
    fruitsOrdenats[ordenQueToca] = frutaQueToca; //fruitsOrdenats[1] = "Banana"; 
}
document.getElementById("demo8").innerHTML = fruitsOrdenats.toString();




const nuevoArray = [];
document.getElementById("chivato2").innerHTML = nuevoArray.length;
for (let index = 0; index < fruits.length; index++) {
    // nuevoArray[nuevoArray.length] = fruits[index];
    nuevoArray[index] = fruits[index];
}
document.getElementById("demo9").innerHTML = nuevoArray.toString();


for (let index = 0; index < orden.length; index++) {
    var elemento = orden[index];
    fruitsOrdenats[fruitsOrdenats.length] = elemento;
}
document.getElementById("demo10").innerHTML = "hola cocacola" + fruitsOrdenats.toString();






