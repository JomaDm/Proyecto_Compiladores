import Operations from "../components/operations"
import Table from "../components/table"
import AFN  from "../controller/AFN"
import { useState } from "react";


const New = ({automatas, agregarAutomata, eliminarAutomata, idAutomata, idAutomataNew}) => {    
    const [cadenaAutomata,setCadenaAutomata] = useState('');
    const [contadorId, setContadorId] = useState(0);

    const crearObjAutomata = (cadena) => {
        if(cadena !== ''){
            setContadorId(contadorId+1);
            if (cadena.includes("-") && cadena.length > 1) {
                let letras = cadena.split("-")
                if(letras[0].charCodeAt(0) <= letras[1].charCodeAt(0)){
                    let automata = new AFN(
                        letras[0],
                        letras[1],
                        idAutomata++
                    );
                    console.log("Automata:",automata);
                    return automata;
                }else{
                    return null
                }
            }else{
                return new AFN(
                    cadena,
                    '',
                    idAutomata++
                );
            }
        }else{
            return null;
        }
    }

    const handleClickAgregarAutomata = (event) => {
        let aux = crearObjAutomata(cadenaAutomata);
        event.preventDefault();
        if(aux !== null){
            agregarAutomata(aux)            
            idAutomataNew(idAutomata++);
        }
        setCadenaAutomata('');
    }

    return (  
        <div className="new">            
			<Operations></Operations>
            <form className="create" autoComplete="off">
                <h3>Crear un nuevo automatas simples</h3>
                <label>Ingrese el un simbolo para crear el automata o un rango.</label><br/>
                <label>Para los rangos use un "-" para separar los rangos.</label>
                    <input 
                        className="create-input"
                        type="text" 
                        id="input-new"
                        value={cadenaAutomata}
                        onChange={(event) => setCadenaAutomata(event.target.value)}
                    ></input>                
                    <button 
                        className="boton"
                        onClick={(event) => {handleClickAgregarAutomata(event)}}
                    >Crear nuevo automata</button>
            </form>
            <h2>Automatas</h2>	
            <Table 
                automatas={automatas}
                eliminarAutomata={eliminarAutomata}
            ></Table>
        </div>
    )
}
 
export default New;