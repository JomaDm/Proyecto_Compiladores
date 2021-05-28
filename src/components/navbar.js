import {Link} from 'react-router-dom'
import { useState } from "react";

const Navbar = () => {
    const [openList, setOpenList] = useState([false,false,false]);
    return (                                          
        <ul className="navbar">
            <h1 className="logo"><Link onClick={() => setOpenList([false,false,false])} to="/">Compiladores</Link></h1>
            <NavItem nombre="AFN" setOpenList={setOpenList} openList={openList} column={0}> 
                <div className="dropdown-menu">
                    <Link onClick={() => setOpenList([false,false,false])} className="dropdown-item" to="../operation/New">Nuevo AFN</Link>
                    <Link onClick={() => setOpenList([false,false,false])} className="dropdown-item" to="../operation/Join">Unir</Link>
                    <Link onClick={() => setOpenList([false,false,false])} className="dropdown-item" to="../operation/Concatenate">Concatenar</Link>
                    <Link onClick={() => setOpenList([false,false,false])} className="dropdown-item" to="../operation/Transitive">Transitiva</Link>
                    <Link onClick={() => setOpenList([false,false,false])} className="dropdown-item" to="../operation/Kleene">Kleene</Link>
                    <Link onClick={() => setOpenList([false,false,false])} className="dropdown-item" to="../operation/Optional">Opcional</Link>                    
                </div>            
            </NavItem>
            <Link onClick={() => setOpenList([false,false,false])} className="dropdown-item" to="../operation/LexiconAnalyzer_AFNs">Automata Especial</Link>
            <Link onClick={() => setOpenList([false,false,false])} className="dropdown-item" to="../operation/AFN_to_AFD">AFN a AFD</Link>
            <Link onClick={() => setOpenList([false,false,false])} className="dropdown-item" to="../operation/AnalyzeLexically">Analizar lexicamente</Link>
            <NavItem nombre="Analizador Sintactico" setOpenList={setOpenList} openList={openList} column={2}>
                <div className="dropdown-menu">
                    <Link onClick={() => setOpenList([false,false,false])} to="../operation/SintacticAnalysisCalculator">Analisis sintactico-Calculadora-Postfijo</Link>
                    <Link onClick={() => setOpenList([false,false,false])} to="../operation/SintacticAnalysisAFNs">Analisis sintactico-AFNs</Link>
                    <Link onClick={() => setOpenList([false,false,false])} to="../operation/SintacticAnalysisGrammar">Analisis sintactico-Gramaticas</Link>
                </div>                
            </NavItem>
        </ul>                                    
    );
}


const NavItem = (props) =>  {   
    let {openList,setOpenList,column,nombre} = props;
    return (
        <li className="navbar-item">
            <button                 
                onClick={() => {
                    let newOpenList = openList.slice();
                    newOpenList[column] = !newOpenList[column];
                    setOpenList(newOpenList);
                    console.log(openList);
                }}
            >
                {nombre}
            </button>            
            {openList[column] && props.children}
        </li>
    );
}
 
export default Navbar;