import Operations from "../components/operations"
import Table from "../components/table"
import { useState } from "react";

const LexiconAnalyzerAFNs = ({automatas, agregarAutomata, eliminarAutomata,elminarVariosAutomatas}) => {
    const [listaSeleccionados, setListaSeleccionados] = useState([]);
    const [checklistValues, setChecklistValues] = useState(Array(automatas.length).fill(false));
    const [tokenvalue, setTokenvalue] = useState(Array(automatas.length).fill(''));

    const verificarSeleccionados = (event) => {        
        handleCheck(Number(event.target.id));
        let lista_sel_aux = [];
        checklistValues.forEach( (element,index) => {
            if(element){
                lista_sel_aux.push(index);
            }
        })
        setListaSeleccionados(lista_sel_aux);   
    }
    
    const handleClickUnirAuto = (event) => {
        event.preventDefault();
        if(listaSeleccionados.length >= 2){
            let tokenFinal = [];
            let automatasSeleccionados = []
            listaSeleccionados.forEach(id => {                
                let automata_aux = automatas.find(automata => String(automata.idAFN) === String(id));
                automatasSeleccionados.push(automata_aux);
                tokenFinal.push(tokenvalue[id]);
            });
            console.log(listaSeleccionados);
            let automata1 = automatasSeleccionados[0];
            automatasSeleccionados = automatasSeleccionados.filter( automata => String(automata.idAFN) !== String(automata1.idAFN))        
            
            automata1.generarAFNEspecial(automatasSeleccionados,tokenFinal);        
            let lista = listaSeleccionados.filter( id => String(id) !== String(automata1.idAFN));
            elminarVariosAutomatas(lista);
            setChecklistValues(Array(automatas.length).fill(false));
            setListaSeleccionados([]);
            setTokenvalue(Array(automatas.length).fill(''));
        }
    }
    const handleCheck = (index) => {
        checklistValues[index] = !checklistValues[index];
        setChecklistValues(checklistValues);
    }

    const handleTokenValue = (event) => {
        let index = Number(event.target.id.replace("t",""));
        let tokenList = tokenvalue.slice();
        tokenList[index] = event.target.value;
        setTokenvalue(tokenList);        
    }

    return (  
        <div className="LexiconAnalyzer_AFNs">            		
			<Operations></Operations>
            {automatas.length > 1 && 
            <form className="create">
                <h3>Unir AFN's para construir un analizador léxico</h3>
                <p>Selecciona los automatas a unir:</p>
                {
                    automatas.map((automata,index) => {                                               
                        return (
                            <div key={"Check" + String(index)} className="create-input">                                 
                                <input           
                                    id={index}                              
                                    checked={checklistValues[index]}                                                            
                                    type="checkbox"                                     
                                    value={automata.idAFN}
                                    onChange={(event) => verificarSeleccionados(event)}
                                />
                                <span> ID {automata.idAFN}</span>                                
                                <span>  Token: </span>
                                <input
                                    id={"t"+index}                                     
                                    value={tokenvalue[index]}
                                    onChange={(event) => handleTokenValue(event)}
                                />                                
                            </div>
                        );
                    })   
                }                
                <button 
                    className="boton"
                    onClick={(event) => handleClickUnirAuto(event)}    
                >Unir automatas</button>                    
            </form>
            }
            <h2>Automatas</h2>	
            <Table 
                automatas={automatas}
                eliminarAutomata={eliminarAutomata}
            ></Table>
        </div>
    );
}
 
export default LexiconAnalyzerAFNs;