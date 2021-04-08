import Operations from "../components/operations"
import Table from "../components/table"
import View from "../components/view"

const New = () => {
    return (  
        <div className="new">
            <h2>Automatas</h2>
			<Table></Table>
			<Operations></Operations>
            <form className="create">
                <h3>Crear un nuevo automatas simples</h3>
                <label>Ingrese el un simbolo para crear el automata o un rango.</label>
                <label>Para los rangos use un "-" para separar los rangos.</label>
                    <input type="text" id="input-new"></input>
                    <button className="boton">Crear nuevo automata</button>
            </form>
			<View></View>
        </div>
    )
}
 
export default New;