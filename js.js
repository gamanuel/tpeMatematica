'use strict';

let btnIngresarAutos = document.querySelector('#btn-ingresoAuto');
btnIngresarAutos.addEventListener('click', simularIngresoAutos);
let divContenedorMensaje = document.querySelector('#divContenedor');
let divContenedorColision = document.querySelector('#contenedorColision');
let divResultado = document.querySelector('#contenedorResultado');
let btnProbabilidad1 = document.querySelector('#botonEnviarDatos');
btnProbabilidad1.addEventListener('click', probabilidadDeColision);
let divContenedorEpsilon = document.querySelector('#contenedorEpsilon');
let btnEpsilon = document.querySelector('#botonEnviarDatosEpsilon');
btnEpsilon.addEventListener('click', funcionEpsilon);

function simularIngresoAutos(){
    let contador = 0;
    let espacio = ['','','','','','','','','','','','','','','','','','','',''];
    let estaciono = true;
    let inputCantidad = document.querySelector('#inputAutos').value;
    while (estaciono) {
        let patente = Math.floor(Math.random() * 1000); //Genera numero de patente entre 000 - 999
        let posicion = patente % 20; //Posicion de Patente
        if(espacio [posicion] == ""){ //Se fija que en el lugar posicion del arreglo no haya ninguna patente guardada
            espacio [posicion] = patente;  //Asigna el lugar a la patente
            contador++; 
            if(contador == (inputCantidad)){ //Si el contador (cantidad de veces que guardo una patente) es igual a la cantidad de autos que ingresaste significa que todos los autos  ingresaron
                divResultado.innerHTML = -1;
                contador = -1;
                estaciono = false;
            }
        }
        else {
            if(espacio [posicion] != patente){ //Si la posicion no esta vacia y no es igual a la patente que se va a ingresar imprime el contador y finaliza el while
                    divResultado.innerHTML = contador;
                    estaciono = false;
            }
        }    
    }

    divContenedorMensaje.innerHTML = 'Patentes ingresadas ' + espacio; 

    if(contador == -1){
        return 0;
    }
    else{
        return 1;
    }
    
}

function probabilidadDeColision(){
    let cant = document.querySelector('#cantidadProbabilidad').value;
    let valor = 0;
    for (let i = 0; i < cant; i++) { //itera la cantidad de veces que quieras
         let funcion = simularIngresoAutos(); //llama a la funcion que simula el ingreso de autos 
         valor = valor + funcion; //Si entraron todos los autos la funcion devuelve 0
    }
    let probabilidad = valor/cant; //Regla de Laplace
    divContenedorColision.innerHTML = probabilidad;
    return probabilidad;
}

function funcionEpsilon(){
    let epsilon = document.querySelector('#epsilon').value;
    let anterior = 0;
    let boolean = true;
    let cuenta = 0;
    let contador = 0;
    let contadorAciertos = 0;

    while (boolean) {   
        contador++;
        let valorRetorna = simularIngresoAutos(); //Devuelve la probabilidad del anterior
        if(valorRetorna == 0){
            contadorAciertos++;
        }
        let probabilidad = contadorAciertos/contador;
        cuenta = Math.abs(anterior - probabilidad); //Valor Absoluto
        if((cuenta < epsilon)&&(contador > 10)){  //Si cuenta es menoral epsilon finaliza el while 
                boolean = false;
        }
        else {  //Si es mayor cuenta a epsilon se reemplaza el parametro anterior con el nuevo
            anterior = probabilidad;            
        }
    }
    divContenedorEpsilon.innerHTML = 'Cantidad de iteraciones = ' + contador;
}