import Operations from "../components/operations"
import Table from "../components/table"
import { useState } from "react";

const Transitive = ({automatas, eliminarAutomata}) => {
    const [op1, setOp1] = useState("-1");

    const handleClickTransitiva = (event) =>{
        event.preventDefault();
        console.log(op1);        
        if(op1 !== "-1"){
            let automata1 = automatas.find(automata => String(automata.idAFN) === String(op1));            
            automata1.transitiva();                     
        }                
        setOp1("-1");        
    }

    return (  
        <div className="transitive">            
			<Operations></Operations>
            <form className="create">
                <h3>Aplicar cerradura transitiva a un automata</h3>
                <label>Ingrese el ID del primer automata.</label>
                
                <select value={op1} id="Automata1" onChange={(event) => setOp1(event.target.value)} >
                <option value="-1" disabled hidden>Selecciona ID</option>
                    {automatas.map( automata => {
                        return (
                            <option key={automata.idAFN} value={automata.idAFN}>ID {automata.idAFN}</option>
                        )
                        })
                    }
                </select>
                <button className="boton" onClick={(event) => handleClickTransitiva(event)}>Aplicar cerradura transitiva</button>
            </form>
            <h2>Automatas</h2>
			<Table 
                automatas={automatas}
                eliminarAutomata={eliminarAutomata}
            ></Table>
        </div>
    );
}
 
export default Transitive;