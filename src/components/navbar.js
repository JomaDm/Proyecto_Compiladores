import {Link} from 'react-router-dom'

const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>Practica 01</h1>
            <div className="links">
                <Link to="/">Home </Link>
                <Link to="/create">Nuevo Automata</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;