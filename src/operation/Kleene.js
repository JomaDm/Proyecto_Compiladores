import Operations from "../components/operations"
import Table from "../components/table"
import { useState } from "react";

const Kleene = ({automatas, eliminarAutomata}) => {
    const [op1, setOp1] = useState(-1);

    const handleClickKleene = (event) => {
        event.preventDefault();
        console.log(op1);        
        if(op1 !== "-1"){
            let automata1 = automatas.find(automata => String(automata.idAFN) === String(op1));            
            automata1.kleene();                     
        }                
        setOp1("-1");  
        // agregarAutomata(auto)
    }

    return (  
        <div className="kleene">            	
			<Operations></Operations>
            <form className="create">
                <h3>Aplicar cerradura de Kleene a un automata</h3>
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

                <button className="boton" onClick={(event) => handleClickKleene(event)}>Aplicar cerradura de Kleene</button>
            </form>
            <h2>Automatas</h2>	
            <Table 
                automatas={automatas}
                eliminarAutomata={eliminarAutomata}
            ></Table>
        </div>
    );
}
 
export default Kleene;