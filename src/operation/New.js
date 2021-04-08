import Operations from "../components/operations"
import Table from "../components/table"
import View from "../components/view"
import AFN  from "../controller/AFN"


const New = ({automatas,agregarAutomata}) => {
    console.log(automatas);
    console.log(agregarAutomata);
    const crearObjAutomata = (cadena) => {
        if (cadena.includes("-")) {
            let letras = cadena.split("-")
            return AFN(letras[0],letras[1]);
        }else{
            return AFN(cadena);
        }
    }

    return (  
        <div className="new">
            <h2>Automatas</h2>
			<Table></Table>
			<Operations></Operations>
            <form className="create">
            <h3>Crear un nuevo automatas simples</h3>
            <label>Ingrese el un simbolo para crear el automata o un rango.</label><br/>
            <label>Para los rangos use un "-" para separar los rangos.</label>
                <input 
                    type="text" 
                    id="input-new"
                ></input>
                <button 
                    className="boton"
                    onClick={() => agregarAutomata(crearObjAutomata(document.getElementById("input-new").value))}
                >Crear nuevo automata</button>
            </form>
			<View></View>
        </div>
    )
}
 
export default New;