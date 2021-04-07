import Navbar from './components/navbar'
import Home from './components/home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar></Navbar>
                <div className="content">
                    <Home></Home>
                </div>
            </div>
        </Router>
    );
}

export default App;
