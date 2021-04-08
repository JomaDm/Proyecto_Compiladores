import Operations from "../components/operations"
import Table from "../components/table"
import View from "../components/view"

const AnalyzeLexically = ({automatas}) => {
    return (  
        <div className="AnalyzeLexically">
        <h2>Automatas</h2>
        <Table
            automatas={automatas}
        ></Table>
        <Operations></Operations>
        <form className="create">
            <h3>Analizar lexicamente una cadena</h3>
            <label>Ingrese el ID del automata.</label>
                <input type="text" id="input-id1"></input>
            <label>Ingrese la cadena.</label>
                <input type="text" id="input-id2"></input>
                <button className="boton">Analizar cadena</button>
        </form>
        <View></View>
    </div>
    );
}
 
export default AnalyzeLexically;