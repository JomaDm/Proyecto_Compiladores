
import React from 'react';
import M from 'materialize-css'
import {Link} from "react-router-dom"

const Navbar = () => {
  let drop = document.querySelector('.dropdown-trigger');
  M.Dropdown.init(drop,{
    inDuration: 300,
    outDuration: 225,
    hover:true,
    alignment: 'left', // Displays dropdown with edge aligned to the left 
    stopPropagation: false, // Stops event propagation    
  });

  return ( 
  <div>
    <ul id="AFN" className="dropdown-content">
      <li><Link to="/">one</Link></li>
      <li><Link to="#!">two</Link></li>      
      <li><Link to="#!">three</Link></li>
    </ul>
    <nav>
      <div className="nav-wrapper blue lighten-1 m8">
        <Link className="brand-logo right">Compiladores</Link>
        <ul id="nav-mobile" className="left hide-on-med-and-down ">
          <li><Link className="dropdown-trigger " data-target="AFN">AFN's</Link></li>
        </ul>
      </div>
    </nav> 
  </div>
  
  );
}
 
export default Navbar;