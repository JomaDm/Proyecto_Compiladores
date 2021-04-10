import Operations from "../components/operations"
import Table from "../components/table"
import { useState } from "react";

const LexiconAnalyzerAFNs = ({automatas, agregarAutomata, eliminarAutomata,elminarVariosAutomatas}) => {
    const [listaSeleccionados, setListaSeleccionados] = useState([]);
    const [checklistValues, setChecklistValues] = useState(Array(automatas.length).fill(false));

    const verificarSeleccionados = (event) => {
        setListaSeleccionados(listaSeleccionados.concat(event.target.value));   
        handleCheck(Number(event.target.id))     ;
    }
    
    const handleClickUnirAuto = (event) => {
        event.preventDefault();
        if(listaSeleccionados.length >= 2){
            let automatasSeleccionados = []
            listaSeleccionados.forEach(id => {
                let automata_aux = automatas.find(automata => String(automata.idAFN) === String(id));
                automatasSeleccionados.push(automata_aux);
            });
            let automata1 = automatasSeleccionados[0];
            automatasSeleccionados = automatasSeleccionados.filter( automata => String(automata.idAFN) !== String(0))        
            automata1.generarAFNEspecial(automatasSeleccionados);        
            let lista = listaSeleccionados.filter( id => String(id) !== String(0));
            elminarVariosAutomatas(lista);
            setChecklistValues(Array(automatas.length).fill(false));
            setListaSeleccionados([]);
        }
    }
    const handleCheck = (index) => {
        checklistValues[index] = !checklistValues[index];
        setChecklistValues(checklistValues);
    }

    return (  
        <div className="LexiconAnalyzer_AFNs">            		
			<Operations></Operations>
            <form className="create">
                <h3>Unir AFN's para construir un analizador léxico</h3>
                <p>Selecciona los automatas a unir:</p>
                {
                    automatas.map((automata,index) => {                                               
                        return (
                            <div key={"Check" + String(index)}> 
                                <label>
                                <input     
                                    id={index}
                                    checked={checklistValues[index]}                                                            
                                    type="checkbox"                                     
                                    value={automata.idAFN}
                                    onChange={(event) => verificarSeleccionados(event)}
                                />
                                <span> ID {automata.idAFN}</span>
                                </label>
                            </div>
                        );
                    })   
                }                
                <button 
                    className="boton"
                    onClick={(event) => handleClickUnirAuto(event)}    
                >Unir automatas</button>                    
            </form>
            <h2>Automatas</h2>	
            <Table 
                automatas={automatas}
                eliminarAutomata={eliminarAutomata}
            ></Table>
        </div>
    );
}
 
export default LexiconAnalyzerAFNs;