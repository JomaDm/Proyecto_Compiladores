import {Transicion} from './Transicion.js'
import {Estado} from './Estado.js'

/*
Representacion de un automata finito no determinista

-Variable para el estado inicial
-Conjunto de estados de aceptacion
-Conjunto de estados
-Conjunto para el alfabeto
-Objeto para las transiciones
*/  

let idContadorAFN = 0;
let ep = 'ε';
let epsilon = String.fromCharCode(5);
let fin = String.fromCharCode(0);

export class AFN{  
    constructor(){
        this.idAFN = idContadorAFN++;
        this.edoInicial = null;
        this.edosAFN = new Set([Estado]);
        this.edosAceptacion = new Set([Estado]);
        this.alfabeto = new Set([CharacterData]);
    }

    //  Constructor con un caracter
    constructor(s1){
        e1 = new Estado();                  //  Creamos los nuevos estados
        e2 = new Estado();
        t = new Transicion(s1, e2);         //  Creamos la nueva transicion
        e1.setTranscion(t);                 //  Agreagamos la transicion al estado del que parte
        e2.setAceptacion(true);             //  Asignamos el estado de aceptacion
        this.alfabeto.add(s1);              //  Agregamos los datos a los conjuntos requeridos
        this.edosAFN.add(e1);
        this.edosAFN.add(e2);
        this.edoInicial = e1;
        this.edosAceptacion.add(e2);

        return this;
    }

    constructor(s1, s2){
        const i = s1.charCodeAt(0);         //  Valores ascii de los simbolos
        const j = s2.charCodeAt(0);
        
        if(!(i <= j))   return null;        //  Comprobacion
        
        e1 = new Estado();                  //  Nuevos estados
        e2 = new Estado();
        t = new Transicion(s1, s2, e2);     //  Nueva transicion
        e1.setTranscion(t);                 //  Asignar transicion
        e2.setAceptacion(true);             //  Asignar estado de aceptacion
        
        for(let k = i; k <= j; k++){        //  Agregar al alfabeto
            this.alfabeto.add(k);
        }

        this.edosAFN.add(e1);               //  Agregar estados
        this.edosAFN.add(e2);
        this.edoInicial = e1;               //  Estado inicial
        this.edosAceptacion.add(e2);        //  Estado de aceptacion

        return this;
    }

    unirAFNs(AFN2){
        e1 = new Estado();                  //  Nuevo edo inicial
        e2 = new Estado();                  //  Nuevo edo final
        t1 = new Transicion(epsilon, this.edoInicial);      //  Transicion al incio AFN1
        t2 = new Transicion(epsilon, AFN2.edoInicial);      //  Transicion al inicio AFN2

        e1.setTranscion(t1);                    //  Nuevas transiciones
        e1.setTranscion(t2);

        this.edosAceptacion.forEach(edo => {    //  Reemplazar transiciones y estados de aceptacion
            edo = new Transicion(epsilon, e2);
            edo.setAceptacion(false);
        });

        AFN2.edosAFN.forEach(edo => {
            edo = new Transicion(epsilon, e2);
            edo.setAceptacion(false);
        });

        this.edosAceptacion.clear();
        AFN2.edosAceptacion.clear();

        this.edoInicial = e1;                   //  Asignar nuevo edo inicial
        e2.setAceptacion(true);                 //  Asignar nuevo edo de aceptacion
        this.edosAceptacion.add(e2);
        this.edosAFN.add(e1);                   //  Agregar nuevos edos
        this.edosAFN.add(e2);
        
        AFN2.edosAFN.forEach(edo => {
            this.edosAFN.add(edo);
        });

        AFN2.alfabeto.forEach(simb => {
            this.alfabeto.add(simb);
        });

        return this;
    }


}

