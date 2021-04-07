import Operations from "../components/operations"
import Table from "../components/table"
import View from "../components/view"


const New = () => {
    return (  
        <div className="new">
            <h2>Automatas</h2>
			<Table></Table>
			<Operations></Operations>
            <br/>
            <p>Ingrese el un simbolo para crear el automata o un rango.</p>
            <p>Para los rangos use un "-" para separar los rangos.</p>
            

			<View></View>
        </div>
    )
}
 
export default New;