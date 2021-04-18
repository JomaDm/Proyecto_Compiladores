import Operations from "../components/operations"
import Table from "../components/table"
import { useState } from "react";

const AFNtoAFD = ({automatas, agregarAutomata ,eliminarAutomata}) => {
    const [op1, setOp1] = useState(-1);

    const handleClickConvertir = (event) => {
        event.preventDefault();
        if(op1 !== "-1"){
            let automata1 = automatas.find(automata => String(automata.idAFN) === String(op1));            
            automata1.convertirAFD();                        
        }                
    }

    return (  
        <div className="LexiconAnalyzer_AFNs">            		
			<Operations></Operations>
            <form className="create">
            <h3>Convertir a AFD</h3>            
            <label>ID del automata:</label>
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
                <button 
                    className="boton"
                    onClick={(event) => handleClickConvertir(event)}
                >Convertir</button>
        </form>
            <h2>Automatas</h2>	
            <Table 
                automatas={automatas}
                eliminarAutomata={eliminarAutomata}
            ></Table>
        </div>
    );
}
 
export default AFNtoAFD;