import Operations from "../components/operations"
import Table from "../components/table"
import View from "../components/view"

const Transitive = ({automatas, eliminarAutomata}) => {
    return (  
        <div className="transitive">
            <h2>Automatas</h2>
			<Table 
                automatas={automatas}
                eliminarAutomata={eliminarAutomata}
            ></Table>
			<Operations></Operations>
            <form className="create">
                <h3>Aplicar cerradura transitiva a un automata</h3>
                <label>Ingrese el ID del primer automata.</label>
                    <input type="text" id="input-id1"></input>
                    <button className="boton">Aplicar cerradura transitiva</button>
            </form>
			<View></View>
        </div>
    );
}
 
export default Transitive;