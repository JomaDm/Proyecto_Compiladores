import Operations from "../components/operations"
import Table from "../components/table"
import { useState } from "react";

const Optional = ({automatas, eliminarAutomata}) => {
    const [op1, setOp1] = useState(-1);

    const handleClickOpcional = (event) =>{
        event.preventDefault();
        console.log(op1);        
        if(op1 !== "-1"){
            let automata1 = automatas.find(automata => String(automata.idAFN) === String(op1));            
            automata1.optional();                     
        }                
        setOp1("-1");  
        //agregarAutomata(auto)
    }

    return (  
        <div className="optional">            
			<Operations></Operations>
            <form className="create">
                <h3>Aplicar operación opcional a un automata</h3>
                <label>Ingrese el ID del automata.</label>

                <select value={op1} id="Automata1" onChange={(event) => setOp1(event.target.value)} >
                <option value="-1" disabled hidden>Selecciona ID</option>
                    {automatas.map( automata => {
                        return (
                            <option key={automata.idAFN} value={automata.idAFN}>ID {automata.idAFN}</option>
                        )
                        })
                    }
                </select>
                <button className="boton" onClick={(event) => handleClickOpcional(event)}>Aplicar operación opcional</button>
            </form>
            <h2>Automatas</h2>	
            <Table 
                automatas={automatas}
                eliminarAutomata={eliminarAutomata}
            ></Table>
        </div>
    );
}
 
export default Optional;