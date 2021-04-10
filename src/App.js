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
import Test from './operation/Test'
import AnalyzeLexically from './operation/AnalyzeLexically'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'




function App() {
    const [automatas,setAutomatas] = useState([]);
    const [idAutomata,setIdAutomata] = useState(0);

    const agregarAutomata = (Automata) => {      
        setAutomatas(automatas.concat(Automata));
    }   

    const eliminarAutomata = (id) => {
        const newAutomatas = automatas.filter(automatas => automatas.idAFN !==id);
        setAutomatas(newAutomatas);
    }

    const elminarVariosAutomatas = (lista_id) => {        
        //console.log(lista_id);
        let aux_lista = automatas.slice();

        lista_id.forEach( id => {            
            aux_lista = aux_lista.filter(automatas => Number(automatas.idAFN) !==Number(id));
        });
        
        setAutomatas(aux_lista);

    }

    const idAutomataNew = (idAutomata) => {
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
                                agregarAutomata={agregarAutomata}
                                eliminarAutomata={eliminarAutomata}
                                elminarVariosAutomatas={elminarVariosAutomatas}
                            ></LexiconAnalyzerAFNs>
                        </Route>
                        <Route exact path="/operation/AFN_to_AFD">
                            <AFNtoAFD
                                automatas={automatas}
                                agregarAutomata={agregarAutomata}
                                eliminarAutomata={eliminarAutomata}
                            ></AFNtoAFD>
                        </Route>
                        <Route exact path="/operation/AnalyzeLexically">
                            <AnalyzeLexically
                                automatas={automatas}
                                agregarAutomata={agregarAutomata}
                                eliminarAutomata={eliminarAutomata}
                            ></AnalyzeLexically>
                        </Route>
                        <Route exact path="/operation/Test">
                            <Test
                                automatas={automatas}
                                agregarAutomata={agregarAutomata}
                                eliminarAutomata={eliminarAutomata}
                            ></Test>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;


