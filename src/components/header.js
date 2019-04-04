import React from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import logo from '../assets/hoverboard.png'

export default (props) => {

  const loggedIn =   <>
   <a className="button is-light">
  <Link to="/logout">Logout</Link>
   </a>
   </>
  const loggedOut = <>
  
  <Link className="button is-primary" to="/signup">Sign Up</Link>
  <a >
    <Link className="button is-light" to="/login">Login</Link>
  </a>
  </>
  return(
    <>
    <nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      <img src={logo} width="50"/>
    </a>

    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>  

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <a className="navbar-item">
          <Link  style={{color:'black'}} to="/">Home</Link>
      </a>
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