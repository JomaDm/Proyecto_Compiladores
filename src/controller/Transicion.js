import {Estado} from './Estado.js'

export default class Transicion {
    constructor(){
        this.simb_inicial = null;
        this.simb_final = null;
        this.edo_Trans = new Estado();
    }

    constructor(simb_inicial, edo_Trans){
        this.simb_inicial = simb_inicial;
        this.simb_final = simb_inicial;
        this.edo_Trans = edo_Trans;
    }

    constructor(simb_inicial, simb_final, edo_Trans){
        this.simb_inicial = simb_inicial;
        this.simb_final = simb_final;
        this.edo_Trans = edo_Trans;
    }

    setTransicion(simb_inicial, simb_final, edo_Trans){
        this.simb_inicial = simb_inicial;
        this.simb_final = simb_final;
        this.edo_Trans = edo_Trans;
    }

    setTransicion(simb_inicial, edo_Trans){
        this.simb_inicial = simb_inicial;
        this.simb_final = simb_inicial;
        this.edo_Trans = edo_Trans;
    }

    getSimb_Inicial(){
        return this.simb_inicial;
    }

    getSimb_Final(){
        return this.simb_final;   
    }

    getEdo_Trans(simb){
        if(this.simb_inicial.charCodeAt(0) >= simb && this.simb_final <= simb.charCodeAt(0)){
            return this.edo_Trans;
        }
        return null;
    } 

}