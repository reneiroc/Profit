/* 
Construct a simple Portfolio class that has a collection of Stocks and 
a "Profit" method that receives 2 dates and returns the profit of the 
Portfolio between those dates. Assume each Stock has a "Price" method that receives a date and returns its price. 

Bonus Track: make the Profit method return the "annualized return" of the 
portfolio between the given dates. 


Cartera
    - Metodo Ganancia(fecha1, fecha2) devuelve monto de ganancia entre el periodo de fechas
    - Collecion de accciones
    Bonus Track: haga que el método Profit devuelva el 
    "rendimiento anualizado" de la cartera entre las fechas dadas.
Accion
    - Metodo Precio(fecha) devuelve el precio en la fecha dada -- Resuelto--
*/

//Ganancia = Precio finale  - Precio inicial
//Rentabilidad = pf - p1/p1



//Importo libreria javascript para validar fecha
//var isValid = require('date-fns/is_valid'); 
var list = require("./datos/ent.json");
var falList = require("./datos/fal.json");
var ripList = require("./datos/rip.json");

var format = require('date-fns/format');
//var esLocale = require('date-fns/locale/es');
var addDays = require('date-fns/add_days');

class Stock {
    constructor(datos, name) {
        this.datos = datos;
        this.nombre = name;
    }
    get getDatos(){
        return this.datos;
    }

    setDatos(datos) {
        this.datos = datos;
        
    }
    set setNombre(nombre){
        this.nombre=nombre;
    }
    get getNombre(){
        return this.nombre;
    }
    
    price(fecha){


    //Cambio la fecha para poder ser usada en la fucnion debido al forato YYYY/DD/MMM
        // var tempFecha = fecha.split('/').reverse().join('/')


            var myStock = [];
          
            //Devuelve precio en esa fecha recibida usando el metodo fileter del array
            myStock = this.datos.filter((elemento) => {
                return elemento.fecha == fecha;
            
            });
            if(myStock.length > 0){
              
                  return myStock[0].precio;      
            }else{
             console.log("Precio no encontrado");
            }
    }
}
class Profit {
    constructor(){
        var i;
        this.myStocks = [];
    }
    addStock (datos, name){
        this.myStocks.push(new Stock(datos, name))
    }

    get stockCount(){
        return this.myStocks.length;
    }

    //Metodo para obtener la ganancia a nual o renta
    anualProfit(fechaI){
        // Actualmente se esta calculando la ganancia anual para un solo año 
        // dado al momento de llamar la funcion.
        // **Cambiarlo para generar Calculo par ados fechas dadas.**
        //Recorremos la coleccion de Stock y calculamos la ganancia para cada accion
        //
        var x = this.myStocks.map(function(elemento){
            var precioI = elemento.price(fechaI); 
           // Invierto la fehca para poder usar la funcion format, de lo contrario
           //genera error
            var tempFecha = fechaI.split('/').reverse().join('/')
            //Agrego los dias para completar un año bursatil (250 dias)
            var fechaF = format(addDays(tempFecha,250),'DD/MM/YYYY');
            var precioF = elemento.price(fechaF);
            //Calculo la gancia de un año
            var rent = precioF - precioI;
            console.log(elemento.getNombre);
            console.log(rent);
            //return rent;
            //crear una fucnion que permita sumar los datos del Stock
             console.log(fechaI + " " + precioI);
             console.log(fechaF + " " + (elemento.price(fechaF)));
             //console.log(elemento.price(fechaF));
        });
   

    }


}
 var x  = new Profit();
 x.addStock(list,"Entel");
 x.addStock(falList,"Falabella");
 x.addStock(ripList,"Riply");
 
 x.anualProfit("20/08/2015");

// var accion = new Stock(list,"Entel");
// console.log(accion.price("20/08/2018"));

