import Operations from "../components/operations"
import Table from "../components/table"
import { useState } from "react";

const AnalyzeLexically = ({automatas, agregarAutomata, eliminarAutomata}) => {
    const [op1, setOp1] = useState(-1);
    return (  
        <div className="AnalyzeLexically">             
        <Operations></Operations>
        <form className="create">
            <h3>Analizar lexicamente una cadena</h3>            
            <label>ID del primer automata:</label>
                    <select 
                        value={op1}
                        id="Automata1"
                        onChange={(event) => setOp1(event.target.value)}
                    >
                        <option 
                            value="-1" disabled hidden
                        >
                            Selecciona ID
                        </option>
                        {
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
            <label>Ingrese la cadena.</label>
                <input className="create-input" type="text" id="input-id2"></input>
                <button className="boton">Analizar cadena</button>
        </form>
        <h2>Automatas</h2>	
        <Table 
            automatas={automatas}
            eliminarAutomata={eliminarAutomata}
        ></Table>
    </div>
    );
}
 
export default AnalyzeLexically;