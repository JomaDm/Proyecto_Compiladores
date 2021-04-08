import Navbar from './components/navbar'
import Home from './components/home'
import New from './operation/New'
import Join from './operation/Join'
import Concatenate from './operation/Concatenate'
import Transitive from './operation/Transitive'
import Star from './operation/Kleene'
import Optional from './operation/Optional'
import LexiconAnalyzer_AFNs from './operation/LexiconAnalyzer_AFNs'
import AFN_to_AFD from './operation/AFN_to_AFD'
import AnalyzeLexically from './operation/AnalyzeLexically'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
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
                            <New></New>
                        </Route>
                        <Route exact path="/operation/Join">
                            <Join></Join>
                        </Route>
                        <Route exact path="/operation/Concatenate">
                            <Concatenate></Concatenate>
                        </Route>
                        <Route exact path="/operation/Transitive">
                            <Transitive></Transitive>
                        </Route>
                        <Route exact path="/operation/Kleene">
                            <Star></Star>
                        </Route>
                        <Route exact path="/operation/Optional">
                            <Optional></Optional>
                        </Route>
                        <Route exact path="/operation/LexiconAnalyzer_AFNs">
                            <LexiconAnalyzer_AFNs></LexiconAnalyzer_AFNs>
                        </Route>
                        <Route exact path="/operation/AFN_to_AFD">
                            <AFN_to_AFD></AFN_to_AFD>
                        </Route>
                        <Route exact path="/operation/AnalyzeLexically">
                            <AnalyzeLexically></AnalyzeLexically>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;


