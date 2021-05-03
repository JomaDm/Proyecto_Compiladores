import {Link} from 'react-router-dom'

const Home = () => {
	return ( 
		<div className="home">
			<h2>Compiladores</h2>			
            <p>Seleccione del menú la opción correspondiente.</p>	
			<br/>
			<div className="enlaces">
				<h2><Link to="../operation/New">Nuevo</Link></h2>
				<p>Crear un nuevo automata básico.</p>	
				<h2><Link to="../operation/Join">Unir</Link></h2>
				<p>Unir dos automatas.</p>	
                <h2><Link to="../operation/Concatenate">Concatenar</Link></h2>
				<p>Concatenar dos automatas.</p>	
                <h2><Link to="../operation/Transitive">Transitiva</Link></h2>
				<p>Aplicar operación transitiva a un automata.</p>	
                <h2><Link to="../operation/Kleene">Kleene</Link></h2>
				<p>Aplicar operación de Kleene a un automata.</p>	
                <h2><Link to="../operation/Optional">Opcional</Link></h2>
				<p>Aplicar operación Opcional a un automata.</p>	
                <h2><Link to="../operation/LexiconAnalyzer_AFNs">Automata Especial</Link></h2>
				<p>Generar un automata Especial con automatas previamente creados.</p>
				<h2><Link to="../operation/AFN_to_AFD">AFN a AFD</Link></h2>
				<p>Convertir un AFN a un AFD.</p>
				<h2><Link to="../operation/AnalyzeLexically">Analizar léxicamente</Link></h2>
				<p>Analizar léxicamente una cadena usando un AFD.</p>
                <h2><Link to="../operation/SintacticAnalysisCalculator">Analisis sintactico-Calculadora-Postfijo</Link></h2>
				<p>Análisis sintáctico de una cadena usando descenso recursivo(Gramatica para operaciones matemáticas básicas)</p>
                <h2><Link to="../operation/SintacticAnalysisAFNs">Analisis sintactico-AFNs</Link></h2>
				<p>Análisis sintáctico de una cadena usando descenso recursivo(Gramatica para generar AFNs desde una cadena)</p>
			</div>
		</div>
	);
}
 
export default Home;