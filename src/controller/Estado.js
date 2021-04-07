import {Transicion} from './Transicion.js'

let contadorIdEstado = 0;

export class Estado {
    constructor(){
        this.transiciones = new Set([Transicion]);
        this.aceptacion = false;
        this.idEstado = contadorIdEstado++;
        this.token = -1;
    }

    setIdEstado(idEstado){  this.idEstado = idEstado;   }
    setAceptacion(aceptacion){ this.aceptacion = aceptacion }
    setToken(token){    this.token = token   }  
    setTransicion(transiciones) { this.transiciones.add(transiciones) }
    getIdEstado(){  return this.idEstado;   }
    getAceptacion(){ return this.aceptacion }
    getToken(){ return this.token   }  
    getTransicion() { return this.transiciones }

}