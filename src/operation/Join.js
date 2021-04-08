import Operations from "../components/operations"
import Table from "../components/table"
import View from "../components/view"

const Join = ({automatas, eliminarAutomata, mostrarTablaAutomata}) => {
    return (  
        <div className="join">
            <h2>Automatas</h2>
			<Table 
                automatas={automatas}
                eliminarAutomata={eliminarAutomata}
                mostrarTablaAutomata={mostrarTablaAutomata}
            ></Table>
			<Operations></Operations>
            <form className="create">
                <h3>Unir dos automatas</h3>
                <label>Ingrese el ID del primer automata.</label>
                    <input type="text" id="input-id1"></input>
                <label>Ingrese el ID del segundo automata.</label>
                    <input type="text" id="input-id2"></input>
                    <button className="boton">Unir automatas</button>
            </form>
			<View 
				mostrarTablaAutomata={mostrarTablaAutomata}>
			</View>
        </div>
    );
}
 
export default Join;