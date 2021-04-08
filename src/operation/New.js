import Operations from "../components/operations"
import Table from "../components/table"
import View from "../components/view"
import AFN  from "../controller/AFN"
import { useState } from "react";


const New = ({automatas,agregarAutomata}) => {    

    let [cadenaAutomata,setCadenaAutomata] = useState('');

    const crearObjAutomata = (cadena) => {
        console.log(cadena);
        if (cadena.includes("-")) {
            let letras = cadena.split("-")
            return new AFN(letras[0],letras[1]);
        }else{
            return new AFN(cadena);
        }
    }

    return (  
        <div className="new">
            <h2>Automatas</h2>
			<Table 
                automatas={automatas}
            ></Table>
			<Operations></Operations>
            <form className="create">
            <h3>Crear un nuevo automatas simples</h3>
            <label>Ingrese el un simbolo para crear el automata o un rango.</label><br/>
            <label>Para los rangos use un "-" para separar los rangos.</label>
                <input 
                    type="text" 
                    id="input-new"
                    value={cadenaAutomata}
                    onChange={(event) => setCadenaAutomata(event.target.value)}
                ></input>                
                <button 
                    className="boton"
                    onClick={() => agregarAutomata(crearObjAutomata(cadenaAutomata))}
                >Crear nuevo automata</button>
            </form>
			<View></View>
        </div>
    )
}
 
export default New;