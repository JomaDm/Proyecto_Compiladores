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
import AFN from "./controller/AFN";




function App() {
    let afn1 = new AFN('b','',1);
    let afn2 = new AFN('c','',2);
    afn1.kleene();
    let auxAut = new AFN('a','',0)
    auxAut.generarAFNEspecial([afn1,afn2],[10,20,30]);
    const [automatas,setAutomatas] = useState([auxAut]);
    const [idAutomata,setIdAutomata] = useState(0);

    const agregarAutomata = (Automata) => {      
        setAutomatas(automatas.concat(Automata));
    }   

    const eliminarAutomata = (id) => {
        const newAutomatas = automatas.filter(automatas => automatas.idAFN !== id);
        setAutomatas(newAutomatas);
    }

    const elminarVariosAutomatas = (lista_indices) => {        
        //console.log(lista_id);
        let aux_lista = [];        

        for(let i = 0; i < automatas.length; i++){
            if(!lista_indices.includes(i)){
                aux_lista.push(automatas[i]);
            }
        }
        
        
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


