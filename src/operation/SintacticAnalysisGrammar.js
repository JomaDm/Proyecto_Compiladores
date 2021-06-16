import Operations from "../components/operations"
import AfdTable from '../components/afd';
import { useState } from "react";
import AFD from "../controller/AFD"
import analizadorSintactico_Grammar from '../controller/AnalizadorSintactico_Gramaticas'

const SintacticAnalysisAFNs = ({ afd, setAfd, analizadorLexico, setAnalizadorLexico}) => {
    const [cadena, setCadena] = useState('');
    const [gramatica, setGramatica] = useState('');
    const [AFDtext, setAFDtext] = useState('');
    const [AFDCalculadora, setAFDCalculadora] = useState(null);
    const [AFDtextCalculadora, setAFDtextCalculadora] = useState('');
    const [resultado1, setResultado1] = useState('Ninguna operacion realizada');
    const [resultado2, setResultado2] = useState('Ninguna operacion realizada');
    const [caso, setCaso] = useState(false);


    const deplegarTablaAfd = (afd) => {
        if (afd === null) {
            return (
                <div>
                    <h2>Ningun AFD convertido</h2>
                    <form action="">
                        <input type="file" id="archivo" onChange={(event) => cargarAFD(event)}></input>
                        <button className="boton-descargar" onClick={(e) => cargarAFDtext(e)}>Cargar AFD(txt)</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>AFD actual:</h2>
                    <form action="">
                        <input type="file" id="archivo" onChange={(event) => cargarAFD(event)}></input>
                        <button className="boton-descargar" onClick={(e) => cargarAFDtext(e)}>Cargar AFD(txt)</button>
                    </form>
                    <AfdTable afd={afd}></AfdTable>
                </div>
            );
        }
    }

    const cargarAFDtext = (e) => {
        e.preventDefault()
        let aux = JSON.parse(AFDtext)
        let auxAFD = new AFD(aux.alfabeto, aux.tablaTrans);
        setAfd(auxAFD);
        setAnalizadorLexico(afd)
    }

    const cargarAFD = (event) => {
        event.preventDefault()
        const reader = new FileReader()
        reader.onload = async (event) => {
            const text = (event.target.result)
            setAFDtext(text);
        };
        reader.readAsText(event.target.files[0])
    }

    const cargarAFDtextCalculadora = (e) => {
        e.preventDefault()
        let aux = JSON.parse(AFDtextCalculadora)
        let auxAFD = new AFD(aux.alfabeto, aux.tablaTrans);
        setAFDCalculadora(auxAFD);
    }

    const cargarAFDCalculadora = (event) => {
        event.preventDefault()
        const reader = new FileReader()
        reader.onload = async (event) => {
            const text = (event.target.result)
            setAFDtextCalculadora(text);
        };
        reader.readAsText(event.target.files[0])
    }

    const handleClickAnalizarGramatica = (event) => {
        event.preventDefault();
        if (gramatica !== '') {
            let analizadorSintactico = new analizadorSintactico_Grammar(gramatica, cadena, afd, null);
            let aux = analizadorSintactico.muestra();
            // console.log(aux)
            if (aux === false) {
                setResultado1("Operacion no valida");
            } else {
                setResultado1("La gramatica es correcta");
            }
        }
    }

    const handleClickAnalizarCadena = (event) => {
        event.preventDefault();
        if (cadena !== '') {
            let analizadorSintactico = new analizadorSintactico_Grammar(gramatica, cadena, afd, AFDCalculadora);
            let aux = analizadorSintactico.analisisDeCadena(caso);
            // console.log(aux)
            if (aux === false) {
                setResultado2("Operacion no valida");
            } else {
                setResultado2("La cadena es correcta");
            }
        }
    }

    const analizadorListo = () => {
        if (analizadorLexico === null) {
            return (
                <h2>Analizador lexico no cargado</h2>
            )
        } else {
            return (
                <div >
                    <h2>Analizador lexico cargado</h2>
                    <Operations></Operations>
                    <form className="create">
                        <h3>Analizar sintactico para la Gramatica de Gramaticas</h3>
                        <label>Ingrese la Gramatica.</label>
                        <input
                            className="create-input"
                            type="text"
                            id="input-id1"
                            value={gramatica}
                            onChange={(event) => setGramatica(event.target.value)}
                        ></input>
                        <button
                            className="boton"
                            onClick={(event) => handleClickAnalizarGramatica(event)}
                        >Analizar Gramatica</button>

                        <table>
                            <thead>
                                <tr>
                                    <th>Gramatica</th>
                                    <th>{resultado1}</th>
                                </tr>
                            </thead>
                        </table>
                        <br />

                        <label>Ingrese la cadena.</label>
                        <input
                            className="create-input"
                            type="text"
                            id="input-id2"
                            value={cadena}
                            onChange={(event) => setCadena(event.target.value)}
                        ></input>
                        <label>
                            <input type="checkbox"
                                name=""
                                id=""
                                onChange={() => setCaso(!caso)} />
                            Caso Calculadora
                        </label>
                        <div className={caso === true ? "" : "ocultar"}>
                            <h2>AFD Para la calculadora:</h2>
                            <form action="">
                                <input type="file" id="archivo" onChange={(event) => cargarAFDCalculadora(event)}></input>
                                <button className="boton-descargar" onClick={(e) => cargarAFDtextCalculadora(e)}>Cargar AFD de la calculadora(txt)</button>
                            </form>
                        </div>
                        <button
                            className="boton"
                            onClick={(event) => handleClickAnalizarCadena(event)}
                        >Analizar cadena</button>

                        <table>
                            <thead>
                                <tr>
                                    <th>Cadena</th>
                                    <th>{resultado2}</th>
                                </tr>
                            </thead>
                        </table>
                    </form>
                </div>
            );
        }
    }

    return (
        <div className="SintacticAnalysis">
            <h2>Analisis sintactico, Gramaticas de gramaticas</h2>
            {deplegarTablaAfd(afd)}
            {analizadorListo()}
        </div>
    );
}

export default SintacticAnalysisAFNs;