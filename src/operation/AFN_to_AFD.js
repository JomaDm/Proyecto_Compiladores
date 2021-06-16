import Operations from "../components/operations"
import Table from "../components/table"
import AfdTable from '../components/afd';
import { useState } from "react";
import AnalizadorLexico from "../controller/AnalizadorLexico";

const AFNtoAFD = ({automatas, eliminarAutomata,afd, setAfd,setAnalizadorLexico}) => {
    const [op1, setOp1] = useState(-1);
    const [cadena, setCadena] = useState('');

    const handleClickConvertir = (event) => {
        event.preventDefault();
        if(op1 !== "-1"){
            let automata1 = automatas.find(automata => String(automata.idAFN) === String(op1));            
            let aux = automata1.convertirAFD();             
            setAfd(aux);            
            let analizador = new AnalizadorLexico();
            analizador.setAFD(afd);
            setAnalizadorLexico(analizador)            
        }               
        setOp1("-1"); 
    }

    const handleClickDescargar = (event) =>{
        event.preventDefault()
        let auxAFD =JSON.stringify(afd);
        descargarArchivo(auxAFD, cadena + '.txt', 'text/plain')
    }

    const descargarArchivo = (content, fileName, contentType) => {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;        
        a.click();
        
    }

    const deplegarTablaAfd = (afd) => {
        if(afd === null){
            return (
                <h2>Ningun AFD convertido</h2>
            );
        }else{
            return(
                <div>
                    <h2>AFD actual:</h2>
                    <form action="">
                        <input 
                            className="create-input-name"
                            type="text" 
                            id="input-name"
                            value={cadena}
                            onChange={(event) => setCadena(event.target.value)}
                        ></input>         
                        <button className="boton-descargar" onClick = {(event) => handleClickDescargar(event)}>Descargar AFD(txt)</button>
                    </form>                    
                    <AfdTable afd={afd}></AfdTable>                    
                </div>
            );
        }
    }

    return (  
        <div className="LexiconAnalyzer_AFNs">
            {deplegarTablaAfd(afd)}         		
			<Operations></Operations>
            <form className="create">
                <h3>Convertir a AFD</h3>            
                <label>ID del automata:</label>
                        <select 
                            value={op1}
                            id="Automata1"
                            onChange={(event) => setOp1(event.target.value)}>
                            <option 
                                value="-1" disabled hidden>
                                Selecciona ID
                            </option>{
                                automatas.map( automata => {
                                    return (
                                        <option 
                                            key={automata.idAFN}
                                            value={automata.idAFN}
                                        >ID {automata.idAFN}</option>
                                    )
                                })
                            }
                        </select>
                    <button className="boton" onClick={(event) => handleClickConvertir(event)}>Convertir</button>
            </form>
            <h2>Automatas</h2>	
            <Table automatas={automatas}eliminarAutomata={eliminarAutomata}></Table>
        </div>
    );
}
 
export default AFNtoAFD;