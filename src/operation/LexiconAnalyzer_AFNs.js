import Operations from "../components/operations"
import Table from "../components/table"
import { useState } from "react";

const LexiconAnalyzerAFNs = ({automatas, agregarAutomata, eliminarAutomata}) => {
    const [listaSeleccionados, setListaSeleccionados] = useState([]);

    const verificarSeleccionados = (event) => {
        setListaSeleccionados(listaSeleccionados.concat(event.target.value));        
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
            listaSeleccionados.forEach( id => eliminarAutomata(Number(id)))
        }
    }

    return (  
        <div className="LexiconAnalyzer_AFNs">            		
			<Operations></Operations>
            <form className="create">
                <h3>Unir AFN's para construir un analizador léxico</h3>
                <label>Selecciona los automatas a unir:</label>
                {console.log("Lexic Keys:")}
                {
                    automatas.map((automata,index) => {    
                        let key = automata.idAFN+automatas.length+1;
                        console.log(key);                                            
                        return (
                            <div key={key.toString()}> 
                                <label>
                                <input                                     
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