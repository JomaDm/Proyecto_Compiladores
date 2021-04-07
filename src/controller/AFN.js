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
    constructor(s1, s2 = ''){
        this.idAFN = idContadorAFN++;
        this.edoInicial = null;
        this.edosAFN = new Set([Estado]);
        this.edosAceptacion = new Set([Estado]);
        this.alfabeto = new Set([CharacterData]);

        if(s2 === ''){
            this.constructor1(s1);
        }
        else{
            this.constructor2(s1, s2);
        }
    }

    //  Constructor con un caracter
    constructor1(s1){
        e1 = new Estado();                  //  Creamos los nuevos estados
        e2 = new Estado();
        t = new Transicion(s1, e2);         //  Creamos la nueva transicion
        e1.addTransicion(t);                 //  Agreagamos la transicion al estado del que parte
        e2.setAceptacion(true);             //  Asignamos el estado de aceptacion
        this.alfabeto.add(s1);              //  Agregamos los datos a los conjuntos requeridos
        this.edosAFN.add(e1);
        this.edosAFN.add(e2);
        this.edoInicial = e1;
        this.edosAceptacion.add(e2);

        return this;
    }

    constructor2(s1, s2){
        const i = s1.charCodeAt(0);         //  Valores ascii de los simbolos
        const j = s2.charCodeAt(0);
        
        if(!(i <= j))   return null;        //  Comprobacion
        
        e1 = new Estado();                  //  Nuevos estados
        e2 = new Estado();
        t = new Transicion(s1, s2, e2);     //  Nueva transicion
        e1.addTransicion(t);                 //  Asignar transicion
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

        e1.addTransicion(t1);                    //  Nuevas transiciones
        e1.addTransicion(t2);

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

    concatenar(AFN2){
        this.edosAceptacion.forEach(edo => {                //
            edo.addTransicion(AFN2.edoInicial.getTransiciones());
            edo.setAceptacion(false);
        });

        AFN2.edoInicial.transiciones.clear();
        AFN2.edosAFN.remove(AFN2.edoInicial);

        AFN2.edosAFN.forEach(edo => {
            this.edosAFN.add(edo);
        });

        AFN2.alfabeto.forEach(simb => {
            this.alfabeto.add(simb);
        });

        this.edosAceptacion.clear();
        this.edosAceptacion.add(AFN2.edosAceptacion);

        return this;
    }

    transitiva(){
        e1 = new Estado();
        e2 = new Estado();

        e1.addTransicion(new Transicion(epsilon, this.edoInicial));
        this.edosAceptacion.forEach(edo => {
            edo.addTransicion(new Transicion(epsilon, e2));
            edo.addTransicion(new Transicion(epsilon, e1));
            edo.edosAceptacion.setAceptacion(false);
        });

        this.edoInicial = e1;
        e2.setAceptacion(true);
        this.edosAceptacion.clear();
        this.edosAceptacion.add(e2);
        this.edosAFN(e1);
        this.edosAFN(e2);

        return this;
    }

    kleene(){
        AFN1 = this.transitiva();
        this.edosAceptacion.forEach(edo => {
            AFN1.edoInicial.addTransicion(new Transicion(epsilon, edo));
        });
        return AFN1;
    }   

    optional(){
        e1 = new Estado();
        e2 = new Estado();
        e1.addTransicion(new Transicion(epsilon, this.edoInicial));
        e1.addTransicion(new Transicion(epsilon, e2));
    
        this.edosAceptacion.forEach(edo => {
            edo.addTransicion(new Transicion(epsilon, e2));
            edo.setAceptacion(false);
        });

        e2.setAceptacion(true);

        this.edosAFN.add(e1);
        this.edosAFN.add(e2);
        this.edosAceptacion.clear();
        this.edosAceptacion.add(e2);
        this.edoInicial = e1;

        return this;
    }

}

