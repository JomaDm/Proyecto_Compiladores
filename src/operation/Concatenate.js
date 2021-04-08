import Operations from "../components/operations"
import Table from "../components/table"
import AFN from "../controller/AFN"
import { useState } from "react";

const Concatenate = ({automatas, agregarAutomata, eliminarAutomata, mostrarTablaAutomata}) => {

    const [op1, setOp1] = useState(-1);
    const [op2, setOp2] = useState(-1);

    const handleClickConcatenar = (event) => {
        event.preventDefault();
        let automata1 = new AFN();
        let automata2 = new AFN();
        automata1 = automatas.find(automatas => automatas.idAFN === parseInt(op1, 10));
        automata2 = automatas.find(automatas => automatas.idAFN === parseInt(op2, 10));
        let auto = automata1.concatenar(automata2);
        console.log(auto)
        // agregarAutomata(auto)
    }

    return (  
        <div className="concatenate">
        <h2>Automatas</h2>
        <Table 
            automatas={automatas}
            eliminarAutomata={eliminarAutomata}
            mostrarTablaAutomata={mostrarTablaAutomata}
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
