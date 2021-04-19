
export default class AnalizadorLexico{

    constructor(sigma='',afd=null){
        this.AFD = afd;
        this.sigma = sigma;

        this.lexema = null;
        this.caracterActual = 0;
        this.inicioLexema = 0;
        this.finLexema = 0;
        this.edoAceptacion = false;        
    }

    setAFD(AFD){
        this.AFD = AFD;
    }

    setSigma(sigma){
        this.sigma = sigma;
    }

    analizarSigma(){
        if (this.sigma !== '' && this.AFD !== null) {            
            let aux_tok = []
            let aux = this.yylex();
            aux_tok.push(aux);
            console.log(aux);
            while (aux.token !== 0) {
                console.log(aux);
                aux = this.yylex();
                aux_tok.push(aux);
            }
            return aux_tok;
        }
        return [];
    }

    yylex(){        
        //Va a devolver los tokens y sus lexemas (cadena correspondientes a ese token)
        let alfabeto = this.AFD.alfabeto;
        let caracter = this.AFD.alfabeto.indexOf(this.sigma.charAt(this.inicioLexema))       
        let irA = this.AFD.tablaTrans[0][caracter];  
        this.finLexema++;
        let token = 0; 
        if(this.finLexema >= this.sigma.length){
            return {
                token:0,
                inicio:this.inicioLexema,
                fin:this.finLexema,
                cadena:''
            };  
        }
        while (caracter !== -1 && this.finLexema <= this.sigma.length && irA !== -1) {                                  
            token = this.AFD.tablaTrans[irA][alfabeto.length];            
            irA = this.AFD.tablaTrans[irA][caracter];            
            caracter = this.AFD.alfabeto.indexOf(this.sigma.charAt(this.finLexema))
            this.finLexema++;
        } 
        console.log(this.inicioLexema,this.finLexema); 
        this.finLexema--;
        let info = {
            token,
            inicio:this.inicioLexema,
            fin:this.finLexema-1,
            cadena:this.sigma.substring(this.inicioLexema,this.finLexema)
        };             

        this.inicioLexema = this.finLexema;
        return info;
    }
}