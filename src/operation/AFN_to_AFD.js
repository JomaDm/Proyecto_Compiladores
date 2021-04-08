import Operations from "../components/operations"
import Table from "../components/table"
import View from "../components/view"

const AFNtoAFD = ({automatas}) => {
    return (  
        <div className="LexiconAnalyzer_AFNs">
            <h2>Automatas</h2>
			<Table 
                automatas={automatas}
            ></Table>
			<Operations></Operations>
            <form className="create">
                <h3>Convertir un AFN a un AFD</h3>
                <label>Ingrese el ID del automata.</label>
                    <input type="text" id="input-id1"></input>
                    <button className="boton">Convertir automata</button>
            </form>
			<View></View>
        </div>
    );
}
 
export default AFNtoAFD;