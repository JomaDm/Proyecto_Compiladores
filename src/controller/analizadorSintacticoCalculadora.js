import AnalizadorLexico from '../controller/AnalizadorLexico';

export default class analizadorSintacticoCalculadora {
    constructor(cadena, afd){
        this.analizadoLexico = new AnalizadorLexico(cadena, afd);
    }

    evaluador(){
        let v = new heredados();
        console.log("Valor inicial: " + v.V)
        let r = this.E(v);
        console.log("Resultado: " + v.V)
        console.log("Resultado token: " + this.analizadoLexico.token)
        if(r){
            if(this.analizadoLexico.token !== 0){
                return false;
            }
            else{
                return true;
            }
        }
        return false;
    }

    E(v){
        console.log("Valor E: " + v.V)
        if(this.T(v)){
            if(this.Ep(v)){
                return true;
            }
        }
        return false;
    }

    Ep(v){
        let token = this.analizadoLexico.yylex();
        let v1 = new heredados();
        console.log("Valor Ep: " + v.V)
        console.log(token)
        if(token.token === 10 || token.token === 20){
            if(this.T(v1)){
                v.V = v.V + (token.token === 10 ? v1.V : -v1.V);
                if(this.Ep(v)){
                    return true;
                }
            }
            return false;
        }

        this.analizadoLexico.undoToken();
        return true;
    }

    T(v){
        console.log("Valor T: " + v.V)
        if(this.F(v)){
            if(this.Tp(v)){
                return true;
            }
        }
        return false;
    }

    Tp(v){
        let token = this.analizadoLexico.yylex();
        let v1 = new heredados();
        console.log("Valor Tp: " + v.V)
        console.log(token)
        if(token.token === 30 || token.token === 40){
            if(this.F(v1)){
                v.V = (token.token === 30 ? v.V*v1.V : v.V/v1.V);
                if(this.Ep(v)){
                    return true;
                }
            }
            return false;
        }

        this.analizadoLexico.undoToken();
        return true;
    }

    F(v){
        console.log("Valor F: " + v.V)
        let token = this.analizadoLexico.yylex();
        console.log(token)
        if(token.token === 50){
            if(this.E(v)){
                token = this.analizadoLexico.yylex();
                if(token.token === 60){
                    return true;
                }
            }
        }
        else if(token.token === 70){
            v.V = parseFloat(token.cadena);
            console.log(v.V)
            return true; 
        }
        return false;
    }


}

class heredados{
    constructor(){
        this.V = 0.0;
    }
}