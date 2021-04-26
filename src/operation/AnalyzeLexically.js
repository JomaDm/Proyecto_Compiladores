import Operations from "../components/operations"
import AfdTable from '../components/afd';
import { useState } from "react";
import AnalizadorLexico from "../controller/AnalizadorLexico";
import AFD from "../controller/AFD"

const AnalyzeLexically = ({afd, setAfd, analizadorLexico, setAnalizadorLexico}) => {        
    const [cadena, setCadena] = useState('');
    const [tokens, setTokens] = useState([]);
    const [AFDtext, setAFDtext] = useState('');

    const deplegarTablaAfd = (afd) => {        
        if(afd === null){
            return (
                <div>
                    <h2>Ningun AFD convertido</h2>                
                    <form action="">
                        <input type="file" id="archivo" onChange={(event) => cargarAFD(event)}></input>
                        <button className="boton-descargar"  onClick={ (e) => cargarAFDtext(e)}>Cargar AFD(txt)</button>
                    </form>
                </div>
            );
        }else{
            return(
                <div>
                    <h2>AFD actual:</h2>
                    <form action="">
                        <input type="file" id="archivo" onChange={(event) => cargarAFD(event)}></input>
                        <button className="boton-descargar"  onClick={ (e) => cargarAFDtext(e)}>Cargar AFD(txt)</button>
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
        let analizador = new AnalizadorLexico(cadena, afd);
        setTokens(analizador.analizarSigma())        
    }

    const analizadorListo = () => {
        if (analizadorLexico === null) {
            return (
                <h2>Analizador lexico no cargado</h2>
            )            
        }else{
            return (
               <div >
                    <h2>Analizador lexico cargado</h2>
                    
                    <Operations></Operations>
                    <form className="create">
                        <h3>Analizar lexicamente una cadena</h3>            
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
                                onClick={(event)=> handleClickAnalizarCadena(event)}
                            >Analizar cadena</button>
                    </form>
                    <table>
                        <thead>
                            <tr>
                                <th>Token</th>
                                <th>Cadena</th>
                            </tr>
                        </thead>
                        <tbody>                            
                            {
                                tokens.map((objtok,index) => {
                                    return (                                            
                                        <tr key={index}>
                                            <td>
                                                {objtok.token}
                                            </td>
                                            <td>
                                                {objtok.cadena}
                                            </td>
                                        </tr>                                       
                                    );
                                })
                            }                                
                        </tbody>    
                    </table>                
               </div>
            );
        }
    }

    return (  
        <div className="AnalyzeLexically">    
            <h2>Analisis lexico</h2>
            {deplegarTablaAfd(afd)}             
            {analizadorListo()}              
        </div>
    );
}
 
export default AnalyzeLexically;