import Operations from "../components/operations"
import Table from "../components/table"
import { useState } from "react";

const LexiconAnalyzerAFNs = ({automatas, eliminarAutomata, elminarVariosAutomatas}) => {
    const [listaSeleccionados, setListaSeleccionados] = useState([]);
    const [checklistValues, setChecklistValues] = useState(Array(automatas.length).fill(false));
    const [tokenvalue, setTokenvalue] = useState(Array(automatas.length).fill(''));

    const hasDuplicates = (array) => {
        var valuesSoFar = [];
        for (var i = 0; i < array.length; ++i) {
            var value = array[i];
            if (valuesSoFar.indexOf(value) !== -1) {
                return true;
            }
            valuesSoFar.push(value);
        }
        return false;
    }

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
        let duplicados = hasDuplicates(tokenvalue);
        if(listaSeleccionados.length >= 1 && !tokenvalue.includes("0") && !duplicados){
            let tokenFinal = [];
            let automatasSeleccionados = []            
            listaSeleccionados.forEach(index => {                
                let automata_aux = automatas[index];
                automatasSeleccionados.push(automata_aux);
                tokenFinal.push(tokenvalue[index]);
            });            
            let automata1 = automatasSeleccionados[0];
            automatasSeleccionados.shift();
            
            automata1.generarAFNEspecial(automatasSeleccionados,tokenFinal);
            listaSeleccionados.shift();            
            let lista = listaSeleccionados;
            elminarVariosAutomatas(lista);

            setChecklistValues(Array(automatas.length).fill(false));
            setListaSeleccionados([]);
            setTokenvalue(Array(automatas.length).fill(''));
        }
        if(duplicados){
            alert("Tokens duplicados");
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
            {automatas.length > 0 && 
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