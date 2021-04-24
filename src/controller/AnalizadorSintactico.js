import AnalizadorLexico from '../controller/AnalizadorLexico';

export default class analizadorSintactico {
    constructor(afd){
        this.analizadoLexico = new AnalizadorLexico("", afd);
        this.V = new V();
    }

    E(v){
        if(this.T(v))
            if(this.Ep(v))
                return true;
        return false;
    }

    Ep(v){
        let token = this.analizadoLexico.yylex();
        let v1;

        if(token.token === tokens.MAS || token.token === tokens.MENOS){
            if(this.T(v1)){
                v = v + (token.token === token.MAS ? v1 : -v1);
                if(this.Ep(v))
                    return true;
            }
            return false;
        }

        this.analizadoLexico.undoToken();
        return true;
    }

    T(v){
        if(this.F(v))
            if(this.Tp(v))
                return true;
        return false;
    }

    Tp(v){
        let token = this.analizadoLexico.yylex();

        if(token.token === tokens.PRODUCTO || token.token === tokens.DIVISION){
            if(this.F(v))
                if(this.Ep(v))
                    return true;
            return false;
        }

        this.analizadoLexico.undoToken();
        return true;
    }

    F(v){
        let token = this.analizadoLexico.yylex();

        if(token.token === tokens.PAR_I)
            if(this.E(v)){
                token = this.analizadoLexico.yylex();
                if(token.token === tokens.PAR_D)
                    return true;
            }
        else if(token.token === tokens.NUM){
            v = parseFloar(token.cadena);
            return true; 
        }
        return false;
    }


}

class V{
    constructor(){
        this.V = 0.0;
    }
}