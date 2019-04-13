import React from 'react';
import ModalComponent from '../components/Modal';


const ShopHero = props => {
    console.log(props);
    return (<>
        <section style={{ marginTop: '1.5rem' }} className="hero is-medium is-light is-bold">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        {props.shop_handle}
        </h1>
                    <h2 className="subtitle">
                        {props.description}
      </h2>
        <ModalComponent  email={props.email} />
                </div>
            </div>
        </section>
    </>)

}

export default ShopHero;


