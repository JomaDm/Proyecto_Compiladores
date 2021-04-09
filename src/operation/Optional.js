import Operations from "../components/operations"
import Table from "../components/table"
import AFN from "../controller/AFN"
import { useState } from "react";

const Optional = ({automatas, agregarAutomata, eliminarAutomata, idAutomata, idAutomataNew}) => {
    const [op1, setOp1] = useState(-1);

    const handleClickOpcional = (event) =>{
        event.preventDefault();
        let automata1 = new AFN();
        automata1 = automatas.find(automatas => automatas.idAFN === parseInt(op1, 10));
        let auto = automata1;
        console.log(auto.optional(idAutomata))
        idAutomataNew(idAutomata++);
        //agregarAutomata(auto)
    }

    return (  
        <div className="optional">
            <h2>Automatas</h2>
			<Table 
                automatas={automatas}
                eliminarAutomata={eliminarAutomata}
            ></Table>
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
        </div>
    );
}
 
export default Optional;