import Operations from "../components/operations"
import Table from "../components/table"
import View from "../components/view"

const Concatenate = ({automatas}) => {
    return (  
        <div className="concatenate">
        <h2>Automatas</h2>
        <Table
            automatas={automatas}
        ></Table>
        <Operations></Operations>
        <form className="create">
            <h3>Concatenar dos automatas</h3>
            <label>Ingrese el ID del primer automata.</label>
                <input type="text" id="input-id1"></input>
            <label>Ingrese el ID del segundo automata.</label>
                <input type="text" id="input-id2"></input>
                <button className="boton">Concatenar automatas</button>
        </form>
        <View></View>
    </div>
    );
}
 
export default Concatenate;