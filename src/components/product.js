import React from 'react';
import {Link} from 'react-router-dom';
import loading from '../assets/Ball-1s-200px.gif';
 const Product = props => {
  //  let source;
  //  if (typeof(image_url_array) === 'string'){
  //    let image_url_array = JSON.parse(props.item.image_url_array);
  //    source = image_url_array[0];
  //  }
  //  else {
  //    source = props.item.image_url_array[0];
  //    console.log(typeof(source))
  //    console.log(source , 'in else statement')
  //  }
   
    return (
        <>
        <div className="card">
  <div className="card-image">
    <figure className="image is-4by3">
      <img src={props.image} alt={loading}/ >
    </figure>
  </div>
  <div className="card-content">
    <div className="media">
      <div className="media-center">
      </div>
      <div className="media-content">
        <Link to={`/product/${props.item.id}`}>{props.item.name}</Link>
        <p className=" is-6">${props.item.amount}</p>
      </div>
    </div>

    <div className="content">
      By {props.item.shop_handle || props.shop_handle}
      <br / >
      <button onClick={props.handleCartClick} id={props.cartId} className="button is-warning">Add To Cart</button>

    </div>
  </div>
</div>
    </>
    )
}
export default Product;
