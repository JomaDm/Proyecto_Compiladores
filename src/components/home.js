import Table from './table'
import Operation from './operations'
import View from './view'

const Home = ({automatas, eliminarAutomata}) => {
	return ( 
		<div className="home">
			<h2>Automatas</h2>
			<Table
				automatas={automatas} 
				eliminarAutomata={eliminarAutomata}
			></Table>
			<Operation></Operation>
            <p>Seleccione del menú la opción correspondiente.</p>
			<View></View>
		</div>
	);
}
 
export default Home;