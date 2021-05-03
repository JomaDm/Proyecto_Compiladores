import AnalizadorLexico from './AnalizadorLexico';
import AFN from './AFN';

export default class analizadorSintactico_AFNs {
    constructor(cadena, afd, id){
        this.analizadoLexico = new AnalizadorLexico(cadena, afd);
        this.id = id;
    }

    muestra(){
        let f = new heredados();
        if(this.evaluador(f)){
            console.log(f.F)
            console.log(this.id)

            return {
                AFN: f.F,
                id: this.id
            };
        }else{
            return false;
        }
    }

    evaluador(f){
        let r = this.E(f);
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

    E(f){
        if(this.T(f)){
            if(this.Ep(f)){
                return true;
            }
        }
        return false;
    }

    Ep(f){
        let f2 = new heredados();
        if(this.analizadoLexico.yylex().token === 10){
            if(this.T(f2)){
                f.F.unirAFNs(f2.F);
                if(this.Ep(f)){
                    return true;
                }
            }
            return false;
        }
        this.analizadoLexico.undoToken();
        return true;
    }


    T(f){
        if(this.C(f)){
            if(this.Tp(f)){
                return true;
            }
        }
        return false;
    }

    Tp(f){
        let f2 = new heredados();
        if(this.analizadoLexico.yylex().token === 20){
            if(this.C(f2)){
                f.F.concatenar(f2.F);
                if(this.Tp(f)){
                    return true;
                }
            }
            return false;
        }
        this.analizadoLexico.undoToken();
        return true;
    }
    
    C(f){
        if(this.F(f)){
            if(this.Cp(f)){
                return true;
            }
        }
        return false;
    }

    Cp(f){
        // console.log(f)
        let token = this.analizadoLexico.yylex().token;

        if(token === 30){
            f.F.transitiva();
            
            if(this.Cp(f)){
                return true;
            }
            
            return false;
        }else if(token === 40){
            f.F.kleene();
            
            if(this.Cp(f)){
                return true;
            }
            
            return false;
        }else if(token === 50){
            f.F.optional();
            
            if(this.Cp(f)){
                return true;
            }
            
            return false;
        }
        this.analizadoLexico.undoToken();
        return true;
    }

    F(f){
        // console.log(f)
        let token = this.analizadoLexico.yylex();
        // console.log(token)
        let inicial;
        let final;
        
        if(token.token === 60){
            if(this.E(f)){
                token = this.analizadoLexico.yylex();
                // console.log(token)
                if(token.token === 70){
                    return true;
                }
            }
            
            return false;

        }else if(token.token === 80){
            token = this.analizadoLexico.yylex();
            
            if(token.token === 110){
                inicial = (token.cadena[0] === '\\' ? token.cadena[1]:token.cadena[0]);
                token = this.analizadoLexico.yylex();
            
                if(token.token === 100){
                    token = this.analizadoLexico.yylex();
            
                    if(token.token === 110){
                        final = (token.cadena[0] === '\\' ? token.cadena[1]:token.cadena[0]);
                        token = this.analizadoLexico.yylex();
            
                        if(token.token === 90){
                            f.F = new AFN(inicial, final, this.id++);
                            return true;
                        }
                    }
                }
            }
            
            return false;

        }else if(token.token === 110){
            
            inicial = (token.cadena[0] === '\\' ? token.cadena[1]:token.cadena[0]);
            f.F = new AFN(inicial, '', this.id++);
            // console.log(this.id);
            return true;
        
        }
        return false;
    }

}

class heredados{
    constructor(){
        this.F = new AFN();
    }
}