import Operations from "../components/operations"
import Table from "../components/table"

const AnalyzeLexically = ({automatas, agregarAutomata, eliminarAutomata}) => {
    return (  
        <div className="AnalyzeLexically">             
        <Operations></Operations>
        <form className="create">
            <h3>Analizar lexicamente una cadena</h3>
            <label>Ingrese el ID del automata.</label>
                <input type="text" id="input-id1"></input>
            <label>Ingrese la cadena.</label>
                <input type="text" id="input-id2"></input>
                <button className="boton">Analizar cadena</button>
        </form>
        <h2>Automatas</h2>	
        <Table 
            automatas={automatas}
            eliminarAutomata={eliminarAutomata}
        ></Table>
    </div>
    );
}
 
export default AnalyzeLexically;