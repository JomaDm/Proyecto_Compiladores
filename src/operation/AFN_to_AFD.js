import Operations from "../components/operations"
import Table from "../components/table"

const AFNtoAFD = ({automatas, agregarAutomata ,eliminarAutomata}) => {
    return (  
        <div className="LexiconAnalyzer_AFNs">            		
			<Operations></Operations>
            <form className="create">
                <h3>Convertir un AFN a un AFD</h3>
                <label>Ingrese el ID del automata.</label>
                    <input type="text" id="input-id1"></input>
                    <button className="boton">Convertir automata</button>
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