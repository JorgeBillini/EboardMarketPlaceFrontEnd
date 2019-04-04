import React from 'react';

 const Product = props => {
    return (
        <>
        <div className="card">
  <div className="card-image">
    <figure className="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" / >
    </figure>
  </div>
  <div className="card-content">
    <div className="media">
      <div className="media-center">
      </div>
      <div className="media-content">
        <p className="is-3">{props.item.productName}</p>
        <p className=" is-6">$400</p>
      </div>
    </div>

    <div className="content">
      By {props.item.shop_handle}
      <br / >
      <a onClick={props.handleCartClick} id={props.cartId} className="button is-primary">Add To Cart</a>

    </div>
  </div>
</div>
    </>
    )
}
export default Product;
