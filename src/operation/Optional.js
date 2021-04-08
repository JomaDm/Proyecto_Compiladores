import Operations from "../components/operations"
import Table from "../components/table"
import View from "../components/view"

const Optional = ({automatas, eliminarAutomata, mostrarTablaAutomata}) => {
    return (  
        <div className="optional">
            <h2>Automatas</h2>
			<Table 
                automatas={automatas}
                eliminarAutomata={eliminarAutomata}
                mostrarTablaAutomata={mostrarTablaAutomata}
            ></Table>
			<Operations></Operations>
            <form className="create">
                <h3>Aplicar operación opcional a un automata</h3>
                <label>Ingrese el ID del automata.</label>
                    <input type="text" id="input-id1"></input>
                    <button className="boton">Aplicar operación opcional</button>
            </form>
			<View 
				mostrarTablaAutomata={mostrarTablaAutomata}>
			</View>
        </div>
    );
}
 
export default Optional;