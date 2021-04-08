import Table from './table'
import Operation from './operations'
import View from './view'

const Home = ({automatas, eliminarAutomata, mostrarTablaAutomata}) => {
	return ( 
		<div className="home">
			<h2>Automatas</h2>
			<Table
				automatas={automatas} 
				eliminarAutomata={eliminarAutomata}
			></Table>
			<Operation></Operation>
            <p>Seleccione del menú la opción correspondiente.</p>			
		</div>
	);
}
 
export default Home;