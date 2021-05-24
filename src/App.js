import { useState } from "react";
import Navbar from './components/navbar'
import Home from './components/home'
import New from './operation/New'
import Join from './operation/Join'
import Concatenate from './operation/Concatenate'
import Transitive from './operation/Transitive'
import Star from './operation/Kleene'
import Optional from './operation/Optional'
import LexiconAnalyzerAFNs from './operation/LexiconAnalyzer_AFNs'
import AFNtoAFD from './operation/AFN_to_AFD'
import AnalyzeLexically from './operation/AnalyzeLexically'
import SintacticAnalysisCalculator from './operation/SintacticAnalysisCalculator'
import SintacticAnalysisAFNs from './operation/SintacticAnalysisAFNs'
import SintacticAnalysisGrammar from './operation/SintacticAnalysisGrammar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
    // let afn1 = new AFN('b','',1);
    // let afn2 = new AFN('c','',2);
    // afn1.kleene();
    // let auxAut = new AFN('a','',0);
    // auxAut.generarAFNEspecial([afn1,afn2],[10,20,30]);
    // const [automatas,setAutomatas] = useState([auxAut]);

    // let afn1 = new AFN('D', '', 0);
    // let afn2 = new AFN('D', '', 1);
    // let afn3 = new AFN('.', '', 2);
    // let afn4 = new AFN('D', '', 3);
    // let afn5 = new AFN('L', '', 4);
    // let afn6 = new AFN('L', '', 5);
    // let afn7 = new AFN('D', '', 6);
    // let afn8 = new AFN('+', '', 7);
    // let afn9 = new AFN('*', '', 8);
    // let afn10 = new AFN('E', '', 9);
    // let afn11 = new AFN('T', '', 10);
    // afn1.transitiva();

    // afn2.transitiva();
    // afn4.transitiva();
    // afn2.concatenar(afn3);
    // afn2.concatenar(afn4);

    // afn6.unirAFNs(afn7);
    // afn6.kleene();
    // afn5.concatenar(afn6);

    // afn10.unirAFNs(afn11);
    // afn10.transitiva();

    // afn1.generarAFNEspecial([afn2, afn5, afn8, afn9, afn10],[10, 20, 30, 40, 50, 60]);

    // afn1.convertirAFD();

    const [afd, setAfd] = useState(null);
    const [analizadorLexico, setAnalizadorLexico] = useState(null);
    
    const [automatas,setAutomatas] = useState([]);
    const [idAutomata,setIdAutomata] = useState(Number(0));

    const agregarAutomata = (Automata) => {      
        setAutomatas(automatas.concat(Automata));
    }   

    const eliminarAutomata = (id) => {
        const newAutomatas = automatas.filter(automatas => automatas.idAFN !== id);
        setAutomatas(newAutomatas);
    }

    const elminarVariosAutomatas = (lista_indices) => {        
        let aux_lista = [];        
        for(let i = 0; i < automatas.length; i++){
            if(!lista_indices.includes(i)){
                aux_lista.push(automatas[i]);
            }
        }
        setAutomatas(aux_lista);
    }

    const idAutomataNew = (idAutomata) => {
        console.log(idAutomata)
        setIdAutomata(idAutomata);
    }
    
    return (
        <Router>
            <div className="App">
                <Navbar></Navbar>
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Home></Home>
                        </Route>
                        <Route exact path="/operation/New">
                            <New 
                                automatas={automatas}
                                agregarAutomata={agregarAutomata}
                                eliminarAutomata={eliminarAutomata}
                                idAutomata={idAutomata}
                                idAutomataNew={idAutomataNew}
                            />
                        </Route>
                        <Route exact path="/operation/Join">
                            <Join
                                automatas={automatas}                                
                                eliminarAutomata={eliminarAutomata}
                            ></Join>
                        </Route>
                        <Route exact path="/operation/Concatenate">
                            <Concatenate
                                automatas={automatas}                                
                                eliminarAutomata={eliminarAutomata}                                
                            ></Concatenate>
                        </Route>
                        <Route exact path="/operation/Transitive">
                            <Transitive
                                automatas={automatas}                                
                                eliminarAutomata={eliminarAutomata}                                
                            ></Transitive>
                        </Route>
                        <Route exact path="/operation/Kleene">
                            <Star
                                automatas={automatas}
                                eliminarAutomata={eliminarAutomata}
                            ></Star>
                        </Route>
                        <Route exact path="/operation/Optional">
                            <Optional
                                automatas={automatas}                                
                                eliminarAutomata={eliminarAutomata}                                
                            ></Optional>
                        </Route>
                        <Route exact path="/operation/LexiconAnalyzer_AFNs">
                            <LexiconAnalyzerAFNs
                                automatas={automatas}
                                eliminarAutomata={eliminarAutomata}
                                elminarVariosAutomatas={elminarVariosAutomatas}
                            ></LexiconAnalyzerAFNs>
                        </Route>
                        <Route exact path="/operation/AFN_to_AFD">
                            <AFNtoAFD
                                automatas={automatas}
                                eliminarAutomata={eliminarAutomata}
                                afd={afd}
                                setAfd={setAfd}
                                setAnalizadorLexico={setAnalizadorLexico}
                            ></AFNtoAFD>
                        </Route>
                        <Route exact path="/operation/AnalyzeLexically">
                            <AnalyzeLexically
                                afd={afd}
                                setAfd={setAfd}
                                analizadorLexico={analizadorLexico}
                                setAnalizadorLexico={setAnalizadorLexico}
                            ></AnalyzeLexically>
                        </Route>                       
                        <Route exact path="/operation/SintacticAnalysisCalculator">
                            <SintacticAnalysisCalculator
                                afd={afd}
                                setAfd={setAfd}
                                analizadorLexico={analizadorLexico}
                                setAnalizadorLexico={setAnalizadorLexico}
                            ></SintacticAnalysisCalculator>
                        </Route>    
                        <Route exact path="/operation/SintacticAnalysisAFNs">
                            <SintacticAnalysisAFNs
                                idAutomata={idAutomata}
                                idAutomataNew={idAutomataNew}
                                agregarAutomata={agregarAutomata}
                                afd={afd}
                                setAfd={setAfd}
                                analizadorLexico={analizadorLexico}
                                setAnalizadorLexico={setAnalizadorLexico}
                            ></SintacticAnalysisAFNs>
                        </Route> 
                        <Route exact path="/operation/SintacticAnalysisGrammar">
                            <SintacticAnalysisGrammar
                                afd={afd}
                                setAfd={setAfd}
                                analizadorLexico={analizadorLexico}
                                setAnalizadorLexico={setAnalizadorLexico}
                            ></SintacticAnalysisGrammar>
                        </Route> 
                    </Switch>
                </div>
                
            </div>
        </Router>
    );
}

export default App;


