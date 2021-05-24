import Operations from "../components/operations"
import AfdTable from '../components/afd';
import { useState } from "react";
import AFD from "../controller/AFD"
import analizadorSintactico_Grammar from '../controller/AnalizadorSintactico_Gramaticas'

const SintacticAnalysisAFNs = ({afd, setAfd, analizadorLexico, setAnalizadorLexico }) => {
    const [cadena, setCadena] = useState('');
    const [AFDtext, setAFDtext] = useState('');
    const [resultado1, setResultado1] = useState('Ninguna operacion realizada');

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

    const handleClickAnalizarCadena = (event) => {
        event.preventDefault();
        // let analizador = new AnalizadorLexico(cadena, afd);
        let analizadorSintactico = new analizadorSintactico_Grammar(cadena, afd);
        let aux = analizadorSintactico.muestra();
        console.log(aux)
        if (aux === false) {
            setResultado1("Operacion no valida");
        } else {
            setResultado1("Es una Gramatica correcta");
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
                        <label>Ingrese la cadena.</label>
                        <input
                            className="create-input"
                            type="text"
                            id="input-id2"
                            value={cadena}
                            onChange={(event) => setCadena(event.target.value)}
                        ></input>
                        <button
                            className="boton"
                            onClick={(event) => handleClickAnalizarCadena(event)}
                        >Analizar cadena</button>
                    </form>
                    <table>
                        <thead>
                            <tr>
                                <th>Operacion</th>
                                <th>{resultado1}</th>
                            </tr>
                        </thead>
                    </table>
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