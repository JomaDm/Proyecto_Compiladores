
export default class AnalizadorLexico{

    constructor(sigma){
        this.tablaAFD = null;
        this.sigma = sigma;

        this.lexema = null;
        this.caracterActual = 0;
        this.inicioLexema = 0;
        this.inicioLexema = 0;
        this.edoAceptacion = false;
    }

    yylex(){
        //Va a devolver los tokens y sus lexemas (cadena correspondientes a ese token)

    }
}