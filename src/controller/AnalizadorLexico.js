
export default class AnalizadorLexico{

    constructor(sigma='', afd=null){
        this.AFD = afd;
        this.sigma = sigma;

        this.lexema = null;
        this.indiceCaracterActual = 0;
        this.inicioLexema = 0;
        this.finLexema = -1;
        this.edoAceptacion = false;     
        
        this.stack = [];
        this.simbActual = '';
        this.token = -1;
        this.edoSig = -1;
        this.edoActual = -1;
    }

    setAFD(AFD){
        this.AFD = AFD;
    }

    setSigma(sigma){
        this.sigma = sigma;
    }

    analizarSigma(){
        if (this.sigma !== '' && this.AFD !== null) {    
            // console.log(this.sigma)        
            let aux_tok = []
            let aux = this.yylex();
            aux_tok.push(aux);
            // console.log(aux);
            while (aux.token !== 0) {
                // console.log(aux);
                aux = this.yylex();
                aux_tok.push(aux);
            }
            return aux_tok;
        }
        return [];
    }

    yylex(){        
        let tamAlfabeto = this.AFD.alfabeto.length;  
        // console.log("Inicio del yylex")
        // console.log("Pos actual: " + this.indiceCaracterActual);
        this.stack.push(this.indiceCaracterActual);
        // console.log("Pila: " + this.stack);

        if(this.indiceCaracterActual >= this.sigma.length){
            // console.log("Terminamos")
            return {
                token: 0,
                inicio: this.inicioLexema,
                fin: this.finLexema,
                cadena: ''
            };  
        }

        this.inicioLexema = this.indiceCaracterActual;
        this.edoActual = 0;
        this.edoAceptacion = false;
        this.finLexema = -1;
        this.token = -1;

        while(this.indiceCaracterActual < this.sigma.length){
            // console.log("1-simb actual: " + this.simbActual + " Pos actual: " + this.indiceCaracterActual + " Edo Actual: " + this.edoActual)
            this.simbActual = this.sigma[this.indiceCaracterActual];
            if(!this.AFD.alfabeto.includes(this.simbActual)){
                this.indiceCaracterActual = this.inicioLexema + 1;
                this.lexema = this.sigma.substring(this.inicioLexema, 1);
                this.token = 2000;
                return {
                    token: this.token,
                    inicio: this.inicioLexema,
                    fin: this.finLexema,
                    cadena: this.lexema
                };  
            }

            this.edoSig = this.AFD.tablaTrans[this.edoActual][this.AFD.alfabeto.indexOf(this.simbActual)];
            // console.log("2-simb actual: " + this.simbActual + " Pos actual: " + this.indiceCaracterActual +" Edo sig: " + this.edoSig)
            
            if(this.edoSig !== -1){
                // console.log(this.AFD.tablaTrans[this.edoSig][tamAlfabeto])
                if(this.AFD.tablaTrans[this.edoSig][tamAlfabeto] !== -1){
                    this.edoAceptacion = true;
                    this.token = this.AFD.tablaTrans[this.edoSig][tamAlfabeto];
                    this.finLexema = this.indiceCaracterActual;
                }
                this.indiceCaracterActual++;
                this.edoActual = this.edoSig;
                // console.log("Token: " + this.token + " Inicio Lex: " + this.inicioLexema + " Fin Lexema: " + this.finLexema)
                continue;
            }
            break;
        }

        if(!this.edoAceptacion){
            this.indiceCaracterActual = this.inicioLexema + 1;
            this.lexema = this.sigma.substring(this.inicioLexema, 1);
            this.token = 2000;
            return {
                token: this.token,
                inicio: this.inicioLexema,
                fin: this.finLexema,
                cadena: this.lexema
            };  
        }

        let info = {
            token: this.token,
            inicio: this.inicioLexema,
            fin: this.finLexema,
            cadena: this.sigma.substring(this.inicioLexema, this.finLexema + 1)
        }; 

        this.indiceCaracterActual = this.finLexema + 1;
        this.inicioLexema = this.finLexema
        

        return info;
    }

    undoToken(){
        if(this.stack.length === 0)
            return false;
        this.indiceCaracterActual = this.stack.pop();
        return true;
    }
}