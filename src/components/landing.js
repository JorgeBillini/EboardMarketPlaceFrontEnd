import React from 'react';
import {Link} from 'react-router-dom'
const Landing = props => {
    return (
        <section className="hero is-medium is-dark is-bold" style={{marginTop:"30px"}} >
        <div  className="hero-body">
            <div className="container">
                <h1 className="title">
                Oops, seems like you are not a registered user, in order to use the Shred Market you must log in or sign up
                 </h1>
                <h2 className="subtitle" style ={{justifyContent:"center", marginTop:"10px"}}>
                
                <button className="button is-warning"><Link to="/signup">Sign up </Link></button> OR <button className="button is-warning"><Link to="/login">Log In </Link></button>
                <hr />
                <h2 className="subtitle">Want to sell products on our platform?</h2>
                <button className="button is-warning" ><Link to="/sellersignup" >Set up Shop</Link></button>

                </h2>
            </div>
            </div>
        </section>
    )
}
export default Landing;