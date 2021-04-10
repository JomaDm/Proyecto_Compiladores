import Operations from "../components/operations"
import Table from "../components/table"
import AFN from "../controller/AFN"
import { useState } from "react";

const Concatenate = ({automatas, eliminarAutomata}) => {

    const [op1, setOp1] = useState(-1);
    const [op2, setOp2] = useState(-1);

    const handleClickConcatenar = (event) => {
        event.preventDefault();
        console.log(op1);
        console.log(op2);
        if(op1 !== "-1" && op2 !== "-1"){
            let automata1 = automatas.find(automata => String(automata.idAFN) === String(op1));
            let automata2 = automatas.find(automata => String(automata.idAFN) === String(op2));
            automata1.concatenar(automata2);
            eliminarAutomata(Number(op2));            
        }                
        setOp1("-1");
        setOp2("-1");
        
    }

    return (  
        <div className="concatenate">
        <h2>Automatas</h2>
        <Table 
            automatas={automatas}
            eliminarAutomata={eliminarAutomata}
        ></Table>
        <Operations></Operations>
        <form className="create">
            <h3>Concatenar dos automatas</h3>
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
            <label>Ingrese el ID del segundo automata.</label>
            <select value={op2} id="Automata2" onChange={(event) => setOp2(event.target.value)}>
                <option value="-1" disabled hidden>Selecciona ID</option>
                    {automatas.map( automata => {
                        return (
                            <option key={automata.idAFN} value={automata.idAFN}> ID {automata.idAFN}</option>
                        )
                        })
                    }
            </select>
            <button className="boton" onClick={(event) => handleClickConcatenar(event)}>Concatenar automatas</button>
        </form>
    </div>
    );
}
 
export default Concatenate;