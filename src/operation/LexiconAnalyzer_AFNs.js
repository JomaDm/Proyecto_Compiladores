import Operations from "../components/operations"
import Table from "../components/table"

const LexiconAnalyzerAFNs = ({automatas, agregarAutomata, eliminarAutomata}) => {
    return (  
        <div className="LexiconAnalyzer_AFNs">            		
			<Operations></Operations>
            <form className="create">
                <h3>Unir AFN's para construir un analizador léxico</h3>
                <label>Ingrese los ID de los automatas a unir.</label>
                <label>Para los automatas use un "-" para separarlos.</label>
                    <input type="text" id="input-id1"></input>
                    <button className="boton">Unir automatas</button>
            </form>
            <h2>Automatas</h2>	
            <Table 
                automatas={automatas}
                eliminarAutomata={eliminarAutomata}
            ></Table>
        </div>
    );
}
 
export default LexiconAnalyzerAFNs;