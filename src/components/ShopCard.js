import React from 'react';
import {Link} from 'react-router-dom';

const ShopCard = props => {
    return (
        <>
        <div  style={{marginTop:"1.5rem"}}class="card">
  <header class="card-header">
    <p class="card-header-title">
      {props.shop.shop_handle}
    </p>
    <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </a>
  </header>
  <div class="card-content">
    <div class="content">
    {props.shop.description}
      <br />
    </div>
  </div>
  <footer class="card-footer">
    <Link to={`/shops/${props.shop.id}`} className="card-footer-item">View This Shop</Link>
  </footer>
</div>
        </>

    )
}

export default ShopCard;