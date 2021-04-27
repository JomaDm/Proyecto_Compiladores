import AnalizadorLexico from './AnalizadorLexico';

export default class analizadorSintacticoCalculadora {
    constructor(cadena, afd){
        this.analizadoLexico = new AnalizadorLexico(cadena, afd);
    }

    muestra(operador){
        let v = new heredados();
        if(operador === 0 && this.evaluador(v)){
            return v.V;
        }else if(operador === 1 && this.evaluador(v)){
            return v.X;
        }else{
            return null;
        }
    }

    evaluador(v){
        let r = this.E(v);
        if(r){
            if(this.analizadoLexico.yylex().token !== 0){
                return false;
            }
            else{
                return true;
            }
        }
        return false;
    }

    E(v){
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
        if(token.token === 10 || token.token === 20){
            if(this.T(v1)){
                v.V = v.V + (token.token === 10 ? v1.V : -v1.V);
                v.X = v.X + " " + v1.X + " " + (token.token === 10 ? "+" : "-");
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
        if(token.token === 30 || token.token === 40){
            if(this.F(v1)){
                v.V = (token.token === 30 ? v.V*v1.V : v.V/v1.V);
                v.X = v.X + " " + v1.X + " " + (token.token === 30 ? "*" : "/");
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
        let token = this.analizadoLexico.yylex();
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
            v.X = v.X + token.cadena;
            return true; 
        }
        return false;
    }


}

class heredados{
    constructor(){
        this.V = 0.0;
        this.X = "";
    }
}