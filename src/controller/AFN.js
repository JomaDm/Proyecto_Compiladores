import Transicion from './Transicion'
import Estado from './Estado'

/*
Representacion de un automata finito no determinista

-Variable para el estado inicial
-Conjunto de estados de aceptacion
-Conjunto de estados
-Conjunto para el alfabeto
-Objeto para las transiciones
*/  


//let ep = 'ε';
let epsilon = String.fromCharCode(5);
//let fin = String.fromCharCode(0);

export default class AFN{      
    constructor(s1, s2 = '', id){
        this.noEdo = 0;
        this.idAFN = id;
        this.edoInicial = null;
        this.edosAFN = new Set();
        this.edosAceptacion = new Set();
        this.alfabeto = new Set();

        if(s2 === ''){
            this.constructor1(s1);
        }
        else{
            this.constructor2(s1, s2);
        }
    }

    //  Constructor con un caracter
    constructor1(s1){
        //console.log("Se uso constructor 1");
        let e1 = new Estado(++this.noEdo);                  //  Creamos los nuevos estados
        let e2 = new Estado(++this.noEdo);
        let t = new Transicion(s1, '' ,e2);         //  Creamos la nueva transicion
        e1.addTransicion(t);                 //  Agreagamos la transicion al estado del que parte
        e2.setAceptacion(true);             //  Asignamos el estado de aceptacion
        this.alfabeto.add(s1);              //  Agregamos los datos a los conjuntos requeridos
        this.edosAFN.add(e1);
        this.edosAFN.add(e2);
        this.edoInicial = e1;
        this.edosAceptacion.add(e2);        
    }

    constructor2(s1, s2){
        //console.log("Se uso constructor 2");
        const i = s1.charCodeAt(0);         //  Valores ascii de los simbolos
        const j = s2.charCodeAt(0);
        
        if(!(i <= j))   return null;        //  Comprobacion
        
        let e1 = new Estado(++this.noEdo);                  //  Nuevos estados
        let e2 = new Estado(++this.noEdo);
        let t = new Transicion(s1, s2, e2);     //  Nueva transicion
        e1.addTransicion(t);                 //  Asignar transicion
        e2.setAceptacion(true);             //  Asignar estado de aceptacion
        
        for(let k = i; k <= j; k++){        //  Agregar al alfabeto
            this.alfabeto.add(String.fromCharCode(k));
        }

        this.edosAFN.add(e1);               //  Agregar estados
        this.edosAFN.add(e2);
        this.edoInicial = e1;               //  Estado inicial
        this.edosAceptacion.add(e2);        //  Estado de aceptacion        
    }

    unirAFNs(AFN2){
                
        let auxId = this.noEdo+2;        
        AFN2.edosAFN.forEach( edo => edo.setIdEstado(auxId++)); 
        this.edosAFN.forEach( edo => edo.setIdEstado(edo.idEstado+1));
        let e1 = new Estado(1);                  //  Nuevo edo inicial
        let e2 = new Estado(auxId++);                  //  Nuevo edo final
        let t1 = new Transicion(epsilon, this.edoInicial);      //  Transicion al incio AFN1
        let t2 = new Transicion(epsilon, AFN2.edoInicial);      //  Transicion al inicio AFN2
        
        e1.addTransicion(t1);                    //  Nuevas transiciones
        e1.addTransicion(t2);

        AFN2.alfabeto.forEach( edo => {
            this.alfabeto.add(edo);                
        })        

        AFN2.edosAFN.forEach(edo => {
            this.edosAFN.add(edo); 
        });
        
        
        let t3 = new Transicion(epsilon, e2);      //  Transicion al fin        

        this.edosAceptacion.forEach(edo => {    //  Reemplazar transiciones y estados de aceptacion                  
            edo.addTransicion(t3);      
            edo.setAceptacion(false);
        });        
        this.edosAceptacion = new Set();    //Borramos los estados de aceptación actuales del automata1

        AFN2.edosAceptacion.forEach(edo => {            
            edo.addTransicion(t3);        
            edo.setAceptacion(false);
        });
        AFN2.edosAceptacion = new Set();
        

        this.edoInicial = e1;                   //  Asignar nuevo edo inicial
        e2.setAceptacion(true);                 //  Asignar nuevo edo de aceptacion
        this.edosAceptacion.add(e2);
        this.edosAFN.add(e1);                   //  Agregar nuevos edos
        this.edosAFN.add(e2);        
                
    }

    concatenar(AFN2, id){
        let aux = this;
        let aux1 = AFN2;
        aux.idAFN = id;
        console.log(aux.edoInicial.getTransiciones())  
        console.log(aux1.edoInicial.getTransiciones())  
        aux.edosAceptacion.forEach(edo => {       
            console.log(aux1.edoInicial.getTransiciones())        
            edo.addTransicion(aux1.edoInicial.getTransiciones());
            edo.setAceptacion(false);
        });

        aux1.edoInicial.transiciones.clear();
        aux1.edosAFN.delete(aux1.edoInicial);

        aux1.edosAFN.forEach(edo => {
            aux.edosAFN.add(edo);
        });

        aux1.alfabeto.forEach(simb => {
            aux.alfabeto.add(simb);
        });

        aux.edosAceptacion.clear();
        aux.edosAceptacion.add(aux1.edosAceptacion);
        
        return aux;
    }

    transitiva(id){
        let aux = this;
        aux.idAFN = id;
        let e1 = new Estado(++aux.noEdo);
        let e2 = new Estado(++aux.noEdo);

        e1.addTransicion(new Transicion(epsilon, aux.edoInicial));

        aux.edosAceptacion.forEach(edo => {
            edo.addTransicion(new Transicion(epsilon, e2));
            edo.addTransicion(new Transicion(epsilon, aux.edoInicial));
            edo.setAceptacion(false);
        });

        aux.edoInicial = e1;
        e2.setAceptacion(true);
        aux.edosAceptacion.clear();
        aux.edosAceptacion.add(e2);
        aux.edosAFN.add(e1);
        aux.edosAFN.add(e2);
        
        return aux;
    }

    kleene(id){
        let aux = this;
        let AFN1 = aux.transitiva(id);
        aux.edosAceptacion.forEach(edo => {
            AFN1.edoInicial.addTransicion(new Transicion(epsilon, edo));
        });
        return AFN1;
    }   

    optional(id){
        let aux = this;
        aux.idAFN = id;
        let e1 = new Estado(++aux.noEdo);
        let e2 = new Estado(++aux.noEdo);
        e1.addTransicion(new Transicion(epsilon, aux.edoInicial));
        e1.addTransicion(new Transicion(epsilon, e2));
    
        aux.edosAceptacion.forEach(edo => {
            edo.addTransicion(new Transicion(epsilon, e2));
            edo.setAceptacion(false);
        });

        e2.setAceptacion(true);

        aux.edosAFN.add(e1);
        aux.edosAFN.add(e2);
        aux.edosAceptacion.clear();
        aux.edosAceptacion.add(e2);
        aux.edoInicial = e1;
        return aux;
    }

    cerraduraEpsilon(e){
        let Resultado = new Set([Estado]);
        let Stack = [];        
        let aux = new Estado();

        Stack.push(e);

        while(Stack.length !== 0){
            aux = Stack.pop();
            Resultado.add(aux);

            aux.transiciones.forEach(t => {
                let edo = t.getTransiciones(epsilon);
                if(edo != null)
                    if(!Resultado.has(edo))
                        Stack.push(edo)
            })
        }
        
        return Resultado;
    }

    cerraduraEpsilonEdos(e){
        let Resultado = new Set([Estado]);
        let Stack = [];        
        let aux = new Estado();

        e.forEach(ed => {
            Stack.push(ed);
        })
        
        while(Stack.length !== 0){
            aux = Stack.pop();
            Resultado.add(aux);

            aux.transiciones.forEach(t => {
                let edo = t.getEdo_Trans(epsilon);
                if(edo != null)
                    if(!Resultado.has(edo))
                        Stack.push(edo)
            })
        }
        
        return Resultado;
    }

    mover(edo, simb){
        let c = new Set([Estado]);
        let aux = new Estado();
        c.clear();

        edo.transiciones.forEach(t => {
            aux = t.getEdo_Trans(simb);
            if(aux !== null)
                c.add(aux);
        });
        return c;
    }

    moverEdos(edos, simb){
        let c = new Set([Estado]);
        let aux = new Estado();
        c.clear();

        edos.forEach(edo => {
            edo.transiciones.forEach(t => {
                aux = t.getEdo_Trans(simb);
                if(aux !== null)
                    c.add(aux);
            });
        });

        return c;
    }

    irA(edos, simb){
        let c = new Set([Estado]);
        c.clear();
        c = this.cerraduraEpsilonEdos(this.moverEdos(edos, simb));
        return c;
    }

     
}

