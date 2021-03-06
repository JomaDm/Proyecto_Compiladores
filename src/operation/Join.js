import Operations from "../components/operations"
import Table from "../components/table"
import { useState } from "react";

const Join = ({automatas, agregarAutomata, eliminarAutomata}) => {

    const [op1, setOp1] = useState(-1);
    const [op2, setOp2] = useState(-1);

    const handleClickUnir = (event) => {
        event.preventDefault();
        
        if(op1 !== "-1" && op2 !== "-1" && op1 !== op2){
            let automata1 = automatas.find(automata => String(automata.idAFN) === String(op1));
            let automata2 = automatas.find(automata => String(automata.idAFN) === String(op2));
            automata1.unirAFNs(automata2);
            eliminarAutomata(Number(op2));            
        }                
        setOp1("-1");
        setOp2("-1");
    }

    return (  
        <div className="join">            		
			<Operations></Operations>
            <form className="create">
                <h3>Unir dos automatas</h3>
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

                <label>ID del segundo automata:</label>
                    <select 
                        value={op2}
                        id="Automata2" 
                        onChange={(event) => setOp2(event.target.value)}
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
                                    >
                                        ID {automata.idAFN}
                                    </option>
                                )
                            })
                        }
                    </select>
                        
                    <button 
                        className="boton"
                        onClick={(event) => handleClickUnir(event)}    
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
 
export default Join;