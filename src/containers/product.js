import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {DateTime} from 'luxon';
import loading from '../assets/Ball-1s-200px.gif'
import ImageHero from '../components/productImages'
import Specs from '../components/ProductSpecs';
import './product.css'
import AuthContext from '../contexts/auth';
import moment from 'moment';
export default class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {

            id: this.props.match.params.id,
            name: '',
            images: [loading],
            amount: null,
            specs: {},
            shop: '',
            loading: true,
            created_at: '',
            shop_handle: '',
            product: {}


        }
    }
    /*boosted


    name VARCHAR NOT NULL ,
    image_url_array VARCHAR NOT NULL,
    shop_id INT REFERENCES shops(id) NOT NULL,
    amount INT NOT NULL,
    specs VARCHAR not NULL,
    id  serial PRIMAR        console.log(arr)
Y KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    */
    componentDidMount = () => {
        console.log(this.props.match.params)
        const { id } = this.props.match.params;
        const url = `https://eboardmarket.herokuapp.com/product/${id}`
        // MAKE CALL TO UR API WITH THE ID
        axios.get(url)
            .then(response => {
                const { name } = response.data;
                const image_url_array = JSON.parse(response.data.image_url_array);
                const { shop_id } = response.data;
                const { amount } = response.data;
                const { specs } = (response.data);
                const { shop_handle } = response.data;
                const { created_at } = response.data;
                const product = response.data
                this.setState({ name: name, images: image_url_array, amount: amount, specs: specs, shop_id: shop_id, loading: false, shop_handle: shop_handle, created_at: created_at, product: product }, () => {
                    console.log("state after response", this.state)
                })
            }, err => {
                console.log(err)
            })


    }
    addToCart = e => {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const newCart = currentCart.concat(this.state.product);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }
    render() {
     
        // console.log(JSON.parse(this.state.specs))  
        // console.log(typeof(this.state.specs))
        // // let newSpecs =(this.state.specs)
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (!user) {
                            return (<>
                                <div style={{marginTop:'2rem'}} class="notification is-danger">
                                    <h1>You must be logged in to view this page </h1>
                                    <h1><Link style={{textDecoration:"none",color:"white"}} to="/">Log in or sign up here</Link></h1>
                                </div>
                            </>)
                        }
                        else return (
                            <>
                                <h1 className="has-text-dark is-size-1" style={{ textAlign: 'center' }}>{this.state.name}</h1>
                                <ImageHero images={this.state.images} />
                                <nav className="level shopInfo">
                                    <div className="level-left">
                                        <div className="level-item seller-name">
                                            <div>
                                                <p className="heading">Seller</p>
                                                <p className="title">{this.state.shop_handle}</p>
                                            </div>
                                        </div>
                                    </div>

                                </nav>
                                <h1 className="has-text-dark is-size-1" style={{ textAlign: 'center' }}>${this.state.amount}</h1>
                                <button onClick={this.addToCart} className="button is-warning">Add to Cart</button>

                                <Specs specs={this.state.specs} />

                            </>
                        )
                    }


                }
            </AuthContext.Consumer>


        )
    }
}

