import 'materialize-css/dist/css/materialize.min.css'
import Navbar from './components/navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/home'

function App() {
  
  return (
    <Router>
      <div className="App">      
        <Navbar />      
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
