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
//import Operations from './components/operations'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AFN from "./controller/AFN";




function App() {
    const [automatas,setAutomatas] = useState([new AFN('a'),new AFN('b')]);

    const agregarAutomata = (Automata) =>{
        console.log("Se agrego un automata",Automata);
        console.log("la lista actual es",automatas);        
        setAutomatas(automatas.concat(Automata));
    }    
    return (
        <Router>
            <div className="App">
                <Navbar></Navbar>
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Home
                                automatas={automatas}
                            ></Home>
                        </Route>
                        <Route exact path="/operation/New">
                            <New 
                                automatas={automatas}
                                agregarAutomata={agregarAutomata}
                            />
                        </Route>
                        <Route exact path="/operation/Join">
                            <Join
                                automatas={automatas}
                            ></Join>
                        </Route>
                        <Route exact path="/operation/Concatenate">
                            <Concatenate
                                automatas={automatas}
                            ></Concatenate>
                        </Route>
                        <Route exact path="/operation/Transitive">
                            <Transitive
                                automatas={automatas}
                            ></Transitive>
                        </Route>
                        <Route exact path="/operation/Kleene">
                            <Star
                                automatas={automatas}
                            ></Star>
                        </Route>
                        <Route exact path="/operation/Optional">
                            <Optional
                                automatas={automatas}
                            ></Optional>
                        </Route>
                        <Route exact path="/operation/LexiconAnalyzer_AFNs">
                            <LexiconAnalyzerAFNs
                                automatas={automatas}
                            ></LexiconAnalyzerAFNs>
                        </Route>
                        <Route exact path="/operation/AFN_to_AFD">
                            <AFNtoAFD
                                automatas={automatas}
                            ></AFNtoAFD>
                        </Route>
                        <Route exact path="/operation/AnalyzeLexically">
                            <AnalyzeLexically
                                automatas={automatas}
                            ></AnalyzeLexically>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;


