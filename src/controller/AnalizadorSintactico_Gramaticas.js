import AnalizadorLexico from "./AnalizadorLexico";

Set.prototype.union = function (setB) {
    var union = new Set(this);
    for (var elem of setB) {
        union.add(elem);
    }
    return union;
}

Set.prototype.difference = function (setB) {
    var difference = new Set(this);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
}

export default class AnalizadorSintactico_Gramaticas {
    constructor(cadena, afd) {
        this.reglas = [];
        this.contador = 0;
        this.Vt = new Set();
        this.Vnt = new Set();
        this.tablaLL1 = null;
        this.arrayFirst = [];
        this.arrayFollow = [];
        this.allV = new Set();
        this.lexemaActual = null;
        this.analizadoLexico = new AnalizadorLexico(cadena, afd);
    }

    iniciarCrearLL1() {
        let n = this.allV.size + 1;
        let m = this.Vt.size + 1;
        this.tablaLL1 = new Array(n);

        for (var i = 0; i < n; i++) {
            this.tablaLL1[i] = new Array(m);
        }

        for (var i = 0; i < n; i++) {
            for (var j = 0; j < m; j++) {
                this.tablaLL1[i][j] = -1;

            }
        }

        this.tablaLL1[n - 1][m - 1] = 'Aceptar';
        console.log(this.tablaLL1)

        let arraySimbolos = Array.from(this.allV);
        let arrayNoTerminales = Array.from(this.Vt);
        let arrayTerminales = Array.from(this.Vnt);
        let arrayReglas = [];

        this.reglas.forEach((elem => {
            arrayReglas.push(elem.NoTerminal);
        }));


        arraySimbolos.push('$');
        arrayNoTerminales.push('$');


        console.log(arraySimbolos)
        console.log(arrayNoTerminales)
        console.log(arrayTerminales)
        console.log(arrayReglas)

        for (var i = 0; i < n; i++) {
            if (!this.Vnt.has(arraySimbolos[i]) && arraySimbolos[i] !== '$') {
                let x = arrayNoTerminales.indexOf(arraySimbolos[i]);
                this.tablaLL1[i][x] = 'pop';
            }
        }

        for (var j = 0; j < this.reglas.length; j++) {
            let conjuntoTemporal = null;
            let beEpsilon = false;

            if (!this.verificarEpsilon(this.reglas[j].Regla)) {
                conjuntoTemporal = this.iniciarFirst(this.reglas[j].NoTerminal)
            } else {
                beEpsilon = true;
                conjuntoTemporal = this.iniciarFollow(this.reglas[j].NoTerminal)
            }
            console.log(conjuntoTemporal)
            conjuntoTemporal.forEach((elem) => {
                console.log(elem)

                console.log("X :" + arrayTerminales.indexOf(this.reglas[j].NoTerminal) + " Y :" + arrayNoTerminales.indexOf(elem))


                if(beEpsilon){
                    this.tablaLL1[arrayTerminales.indexOf(this.reglas[j].NoTerminal)][arrayNoTerminales.indexOf(elem)] = ['epsilon']
                }else{
                    this.tablaLL1[arrayTerminales.indexOf(this.reglas[j].NoTerminal)][arrayNoTerminales.indexOf(elem)] = this.reglas[j].Regla
                }
            })
        }



            // this.reglas.forEach((d) => {

            //     console.log("Regla :" + this.reglas.indexOf(d))

            //     let conjuntoTemporal = null;
            //     let beEpsilon = false;
            //     if (!this.verificarEpsilon(d.Regla)) {
            //         conjuntoTemporal = this.iniciarFirst(d.NoTerminal)
            //     } else {
            //         beEpsilon = true;
            //         conjuntoTemporal = this.iniciarFollow(d.NoTerminal)
            //     }

            //     console.log(conjuntoTemporal)
            //     conjuntoTemporal.forEach((elem) => {
            //         if (beEpsilon === true) {
            //             this.tablaLL1[arraySimbolos.indexOf(elem)][arrayNoTerminales.indexOf(elem)] = 'ep'
            //         }
            //         console.log(arraySimbolos.indexOf(elem))
            //         console.log(arrayNoTerminales.indexOf(elem))
            //     })
            // })
            console.log(this.tablaLL1)

        }

        verificarEpsilon(r) {
            for (var i = 0; i < r.length; i++) {
                if (r[i] === 'epsilon') {
                    return true;
                }
            }
            return false;
        }

        separarTerminales() {
            this.Vnt.forEach((d) => {
                this.allV.add(d)
            });

            this.Vt.forEach((d) => {
                if (this.Vnt.has(d)) {
                    this.Vt.delete(d);
                }
                this.allV.add(d);
            });
            this.allV.delete('epsilon');
            this.Vt.delete('epsilon');
            console.log(this.reglas)
            console.log(this.allV)

            this.Vnt.forEach((d) => {
                this.iniciarFirst(d);
            })

            this.Vnt.forEach((d) => {
                this.iniciarFollow(d);
            })

            this.iniciarCrearLL1();
        }

        first(symbol, visitados) {
            let resultado = this.arrayFirst.find(s => s.simbolo === symbol);
            if (!(undefined === resultado)) {
                return resultado.conjuntoFirst;
            }

            visitados.add(symbol);
            let s = new Set();

            if (symbol === 'epsilon' || this.Vt.has(symbol)) {
                s.add(symbol);
            } else {
                for (let i = 0; i < this.reglas.length; ++i) {
                    if (symbol === this.reglas[i].NoTerminal) {
                        if (!visitados.has(this.reglas[i].Regla[0])) {
                            let aux = this.first(this.reglas[i].Regla[0], visitados);
                            for (var elem of aux) {
                                s.add(elem);
                            }
                        }
                    }
                }
            }

            if (s.size !== 0) {
                this.arrayFirst.push({
                    simbolo: symbol,
                    conjuntoFirst: s
                });
            }
            return s;
        }

        iniciarFirst(symbol) {
            let visitados = new Set();
            let s = this.first(symbol, visitados);
            return s;
        }

        follow(symbol, visitados) {
            let resultado = this.arrayFollow.find(s => s.simbolo === symbol);
            if (!(undefined === resultado)) {
                return resultado.conjuntoFollow;
            }

            let s = new Set();
            visitados.add(symbol);

            if (symbol === this.reglas[0].NoTerminal) {
                s.add('$');
            }

            for (let i = -1; i < this.reglas.length; ++i) {
                let next = this.reglas[i + 1];

                if (next === undefined) {
                    break;
                }

                let j = 0;
                while (next.Regla[j] !== undefined) {
                    // console.log(next.Regla[j] === undefined)
                    let st = next.Regla[j];
                    if (st === symbol) {
                        // console.log(st);
                        let n = next.Regla[j + 1];
                        // console.log(n);
                        if (n === undefined) {
                            if (!visitados.has(this.reglas[i + 1].NoTerminal)) {
                                let aux = this.follow(this.reglas[i + 1].NoTerminal, visitados);
                                for (var elem of aux) {
                                    s.add(elem);
                                }
                            }
                        } else {
                            let aux = this.iniciarFirst(n);
                            // console.log(aux.has('epsilon'));/
                            if (aux.has('epsilon')) {
                                if (!visitados.has(this.reglas[i + 1].NoTerminal)) {
                                    let aux1 = this.follow(this.reglas[i + 1].NoTerminal, visitados);
                                    for (var elem of aux1) {
                                        s.add(elem);
                                    }
                                }
                                aux.delete('epsilon');
                            }
                            for (var elem of aux) {
                                s.add(elem);
                            }
                            // console.log(s)
                        }
                    }
                    j = j + 1;
                    // console.log(next.Regla[j])

                }
            }

            if (s.size !== 0) {
                this.arrayFollow.push({
                    simbolo: symbol,
                    conjuntoFollow: s
                });
            }

            // console.log(s)
            return s;

        }

        iniciarFollow(symbol) {
            let visitados = new Set();
            let s = this.follow(symbol, visitados);
            return s;
        }

        muestra() {
            if (this.evaluador()) {
                return true;
            } else {
                return null;
            }
        }

        evaluador() {
            let r = this.G();
            if (r) {
                this.separarTerminales();
                console.log(this.arrayFirst);
                console.log(this.arrayFollow);


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
                // console.log(l.lista);
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
                    // console.log(l.lista);
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

                if (!this.Vnt.has(token.cadena)) {
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

                if (!this.Vnt.has(token.cadena)) {
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
