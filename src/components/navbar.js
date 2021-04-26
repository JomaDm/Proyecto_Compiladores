import {Link} from 'react-router-dom'

const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>Practica 1</h1>
            <div className="links">
                <Link to="/">Inicio</Link>
                <Link to="../operation/New">Nuevo</Link>
                <Link to="../operation/Join">Unir</Link>
                <Link to="../operation/Concatenate">Concatenar</Link>
                <Link to="../operation/Transitive">Transitiva</Link>
                <Link to="../operation/Kleene">Kleene</Link>
                <Link to="../operation/Optional">Opcional</Link>
                <Link to="../operation/LexiconAnalyzer_AFNs">Automata Especial</Link>
                <Link to="../operation/AFN_to_AFD">AFN a AFD</Link>
                <Link to="../operation/AnalyzeLexically">Analizar lexicamente</Link>
                <Link to="../operation/SintacticAnalysisCalculator">Analisis sintactico-Calculadora</Link>
                <Link to="../operation/SintacticAnalysisPostfix">Analisis sintactico-PostFijo</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;