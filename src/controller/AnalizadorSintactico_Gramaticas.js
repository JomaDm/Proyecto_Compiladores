import AnalizadorLexico from "./AnalizadorLexico";

export default class AnalizadorSintactico_Gramaticas {
    constructor(cadena, afd) {
        this.reglas = [];
        this.contador = 0;
        this.Vt = new Set();
        this.Vnt = new Set();
        this.lexemaActual = null;
        this.analizadoLexico = new AnalizadorLexico(cadena, afd);
    }

    muestra() {
        if (this.evaluador()) {
            return true;
        } else {
            return null;
        }
    }

    separarTerminales(){
        this.Vt.forEach((d) => {
            if(this.Vnt.has(d)){
                this.Vt.delete(d);
            }
        });
        console.log(this.reglas);
        console.log(this.Vnt);
        console.log(this.Vt);
    }

    evaluador() {
        let r = this.G();
        if (r) {
            this.separarTerminales();
            if (this.analizadoLexico.yylex().token !== 0) {
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    }

    G() {
        if (this.ListaReglas()) {
            return true;
        }
        return false;
    }

    ListaReglas() {
        // console.log("Lista de reglas")
        if (this.Regla()) {
            let token = this.analizadoLexico.yylex();
            // console.log("Lista de Reglas Prima " + token.token + "{}" + token.cadena)
            if (token.token === 20) {
                if (this.ListaReglasp()) {
                    return true;
                }
            }
        }
        return false;
    }

    ListaReglasp() {
        // console.log("Lista de Relgas Prima")
        let auxToken = this.analizadoLexico.token;
        if (this.Regla()) {

            let token = this.analizadoLexico.yylex();
            // console.log("Lista de Relgas Prima " + token.token + "{}" + token.cadena)

            if (token.token === 20) {
                if (this.ListaReglasp()) {
                    return true;
                }
                return false;
            }
        }
        this.analizadoLexico.token = auxToken;
        return true;
    }

    Regla() {
        if (this.LadoIzq()) {
            let token = this.analizadoLexico.yylex();
            // console.log("Regla + " + token.token + "{}" + token.cadena)
            if (token.token === 30) {
                
                if (this.LadosDerechos()) {
                    return true;
                }
            }
        }
        return false;
    }

    LadoIzq() {
        let token = this.analizadoLexico.yylex();
        // console.log("Lado Izquierdo + " + token.token + "{}" + token.cadena)
        if (token.token === 10) {
            this.Vnt.add(token.cadena);
            this.lexemaActual = token.cadena;
            return true;
        }
        return false;
    }

    LadosDerechos() {
        let l = new heredados();
        if (this.LadoDerecho(l)) {
            this.reglas.push({
                NoTerminal: this.lexemaActual,
                Regla: l.lista
            });
            console.log(l.lista);
            l = new heredados();
            if (this.LadosDerechosp()) {
                return true;
            }
        }
        return false;
    }

    LadosDerechosp() {
        let token = this.analizadoLexico.yylex();
        let l = new heredados();

        // console.log("Lados Derechos Primos + " + token.token + "{}" + token.cadena)
        if (token.token === 40) {
            if (this.LadoDerecho(l)) {
                console.log(l.lista);
                this.reglas.push({
                    NoTerminal: this.lexemaActual,
                    Regla: l.lista
                });
                if (this.LadosDerechosp(l)) {
                    return true;
                }
            }
            return false;
        }
        // l.lista.pop();
        this.analizadoLexico.undoToken();
        // console.log(this.analizadoLexico.token)
        return true;
    }

    LadoDerecho(l) {
        let token = this.analizadoLexico.yylex();
        // console.log("Lado Derecho + " + token.token + "{}" + token.cadena)

        if (token.token === 10) {
            l.lista.push(token.cadena);
            
            if(!this.Vnt.has(token.cadena)){
                this.Vt.add(token.cadena)
            }
            
            let token2 = this.analizadoLexico.yylex();
            // console.log("Lado Derecho2 + " + token2.token + "{}" + token2.cadena)
            if (token2.token === 50) {
                if (this.LadoDerechop(l)) {
                    return true;
                }
            }
            if (token2.token === 20) {
                this.analizadoLexico.undoToken();
                return true;
            }
        }
        return false;
    }

    LadoDerechop(l) {
        let token = this.analizadoLexico.yylex();
        // console.log("Lado Derecho Primo + " + token.token + "{}" + token.cadena)

        if (token.token === 10) {
            l.lista.push(token.cadena)

            if(!this.Vnt.has(token.cadena)){
                this.Vt.add(token.cadena)
            }

            let token2 = this.analizadoLexico.yylex();
            // console.log("Lado Derecho Primo2 + " + token2.token + "{}" + token2.cadena)
            if (token2.token === 50) {
                if (this.LadoDerechop(l)) {
                    return true;
                }
            }
            if (token2.token === 20 || token2.token === 40) {
                this.analizadoLexico.undoToken();
                // console.log(this.analizadoLexico.token)
                return true;
            }
            return false;
        }

        // l.lista.pop();
        this.analizadoLexico.undoToken();
        return true;
    }

}

class heredados {
    constructor() {
        this.lista = [];
    }
}