import Estado from './Estado'

export default class Transicion {
    constructor(s1, s2 = '', edo_Trans){
        this.simb_inicial = null;
        this.simb_final = null;
        this.edo_Trans = new Estado();

        if(s2 === ''){
            this.constructor1(s1, edo_Trans);
        }else{
            this.constructor2(s1, s2, edo_Trans);
        }
    }

    constructor1(simb_inicial, edo_Trans){
        this.simb_inicial = simb_inicial;
        this.simb_final = simb_inicial;
        this.edo_Trans = edo_Trans;
    }

    constructor2(simb_inicial, simb_final, edo_Trans){
        this.simb_inicial = simb_inicial;
        this.simb_final = simb_final;
        this.edo_Trans = edo_Trans;
    }

    setTransicion1(simb_inicial, simb_final, edo_Trans){
        this.simb_inicial = simb_inicial;
        this.simb_final = simb_final;
        this.edo_Trans = edo_Trans;
    }

    setTransicion2(simb_inicial, edo_Trans){
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
        let aux = simb.charCodeAt(0);
        if(typeof this.simb_final !== 'string'){
            if(this.simb_inicial.charCodeAt(0) === aux){
                return this.edo_Trans;
            }
        }
        if(typeof this.simb_final === 'string'){
            if(this.simb_inicial.charCodeAt(0) <= aux && this.simb_final.charCodeAt(0) >= aux){
                return this.edo_Trans.toStringEdo();            
            }
        }
        
        return null;
    } 

    toStringTran(){
        let aux  = this.getEdo_Trans(this.simb_inicial);
        if(typeof this.simb_final === 'string' && this.simb_final !== null){
            return String(`(${this.simb_inicial} - ${this.simb_final} -> ${aux})`);
        }
        else{
            return String(`(${this.simb_inicial} -> ${aux}})`)
        }
    }

}