import React from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import { faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../assets/hoverboard.png'
import loading from '../assets/Ball-1s-200px.gif'
import Burger from '../services/burger';
export default (props) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const loggedIn =   <>
   <button className="button is-warning">
  <Link to="/logout">Logout</Link>
   </button>
   <Link to="/cart" className="navbar-item"><FontAwesomeIcon icon={faShoppingCart} /> </Link>

   </>
  const loggedOut = <>
  <Link className="button is-warning" to="/signup">Sign Up</Link>
    <Link className="button is-warning" to="/login">Login</Link>

  </>
  return(
    <>
    <nav className="navbar is-info" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      <img src={logo} alt={loading} width="50"/>
      <p style={{display:'inline', marginLeft:'1rem',fontWeight:'bolder'}}> Shred Market </p>

    </a>

    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>  

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
          <Link  className="navbar-item"  to="/">Home</Link>
          <div className="navbar-item has-dropdown is-hoverable">
          <Link to="/search" className="navbar-link"> Search </Link>
          <div className="navbar-dropdown">
          <Link to="/search" className="navbar-item">Longboards</Link>
          <Link to="/search" className="navbar-item">Skateboards</Link>
          <Link to="/search" className="navbar-item">Shops</Link>
          </div>
          </div>

    </div>

    <div className="navbar-end">
    
      <div className="navbar-item">
        <div className="buttons">
        <AuthContext.Consumer>
        {
            user => {
              console.log(user)
              if (user) return loggedIn;
              else return loggedOut;
            }
          }

        </AuthContext.Consumer>
        </div>
      </div>
    </div>
  </div>
 </nav>
    </>
)
}