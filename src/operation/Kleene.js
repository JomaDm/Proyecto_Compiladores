import Operations from "../components/operations"
import Table from "../components/table"
import View from "../components/view"

const Kleene = ({automatas, eliminarAutomata, mostrarTablaAutomata}) => {
    return (  
        <div className="kleene">
            <h2>Automatas</h2>
			<Table 
                automatas={automatas}
                eliminarAutomata={eliminarAutomata}
                mostrarTablaAutomata={mostrarTablaAutomata}
            ></Table>
			<Operations></Operations>
            <form className="create">
                <h3>Aplicar cerradura de Kleene a un automata</h3>
                <label>Ingrese el ID del primer automata.</label>
                    <input type="text" id="input-id1"></input>
                    <button className="boton">Aplicar cerradura de Kleene</button>
            </form>
			<View 
				mostrarTablaAutomata={mostrarTablaAutomata}>
			</View>
        </div>
    );
}
 
export default Kleene;