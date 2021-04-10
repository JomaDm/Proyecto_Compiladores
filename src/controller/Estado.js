//let contadorIdEstado = 0;

export default class Estado {
    constructor(id){
        this.transiciones = new Set();
        this.aceptacion = false;
        this.idEstado = id;
        this.token = -1;
    }

    toStringEdo(){
        return this.idEstado;
    }

    printStringEdo(){
        let aux = "";
        this.transiciones.forEach((tran)=> {
            aux += String(`(${this.idEstado}) => ${tran.toStringTran()}`) +" "
        })
        return aux;
    }

    setIdEstado(idEstado){  
        this.idEstado = idEstado;   
    }
    setAceptacion(aceptacion){
        this.aceptacion = aceptacion 
    }
    setToken(token){    
        this.token = token   
    }  
    addTransicion(transiciones) { 
        this.transiciones.add(transiciones) 
    }
    getIdEstado(){  
        return this.idEstado;
    }
    getAceptacion(){ 
        return this.aceptacion 
    }
    getToken(){ 
        return this.token   
    }  
    getTransiciones() { 
        return this.transiciones 
    }

}