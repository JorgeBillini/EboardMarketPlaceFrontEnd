import React from 'react';
import loading from '../assets/Ball-1s-200px.gif'
import {Link} from 'react-router-dom';


const CartItem = props => {
    const images = JSON.parse(props.product.image_url_array)
    console.log(props.product.id)
    return (
        <>
        <section style={{marginTop:"20px"}} className="hero is-dark">
            <div className="hero-body">
            <div className="container">
            <div className="columns">
            <div className="column is-9">
            <h1 className="title">
                <Link to={`product/${props.product.id}`}>{props.product.name}</Link>
                </h1>
                <h2 className="subtitle">
                ${props.product.amount}
            </h2>
            </div>
            <div className="column is-2">
            <figure className="image is-128x128">
                        <img src={images[0]} alt={loading} / >
                        </figure>
            </div>
            <div className="column">
            <button id={props.index} className="delete" onClick={props.handleRemove} />
            </div>
            
                

            </div>
                
            
    </div>
  </div>
</section>
        </>
    )
}

export default CartItem;