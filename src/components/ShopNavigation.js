import React from 'react';
import {Link} from 'react-router-dom';
const ShopNav = props =>{ 
    console.log(props,"props in shopNav");

return (
    <section class="section">
    <div class="container">
      <h1 class="title">Welcome back {props.shop_handle} </h1>
      <h2 class="subtitle">
        What should we do today?
      </h2>
      <Link to={{pathname:"/post", state:props.shopid}} >Post a Product</Link>
      <Link style={{marginLeft:'1rem'}} to={`/shops/${props.shopid}`}>See your profile</Link>
      <Link  style={{marginLeft:'1rem'}} to={{pathname:`/orders/${props.shopid}`}} > See your orders </Link>
      </div>
  </section>
)

}
export default ShopNav;