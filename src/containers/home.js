import React from 'react';
import firebase from '../firebase';
import Product from '../components/product'
import './home.css'
import axios from 'axios';

export default class Home extends React.Component {

  state = {
    userEmail: '',
    userId: '',
    token: '',
    products: [{
      productimgUrl : ['lol','lol','lol'],
      productName : 'boosted',
      price : 400,
      shop_handle: 'bestskates'
    },{ productimgUrl : ['lol','lol','lol'],
      productName : 'boosted',
      price : 400,
      shop_handle: 'bestskates'
    },{
      productimgUrl:['lol'],
      productName:'boosted',
      price:420,
      shop_handle:'Abdul Skates'
    },
    {
      productimgUrl:['lol'],
      productName:'boosted',
      price:420,
      shop_handle:'Abdul Skates'
    }],
    cart:[],
  }

  componentDidMount() {
    /*
    MAKE API CALL HERE, GET DAILY LIST OF PRODUCTS
    ** POPULAR
    ** BEST SELLERS
    ** NEW
    ** SPONSORED

    products = [{
      productimgUrl : [lol,lol,lol],
      productName : 'boosted',
      price : $400,
      shop_handle: 'bestskates'
    },{ productimgUrl : [lol,lol,lol],
      productName : 'boosted',
      price : $400,
      shop_handle: 'bestskates'
    }]
    */

  

    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // ..... DO YOUR LOGGED IN LOGIC
        this.setState({ userEmail: user.email, userId: user.uid }, () => {
          this.getFirebaseIdToken()
        });
      }
      else {
        // ..... The user is logged out
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleUnprotectedAPI = (e) => {
    const { userEmail, userId } = this.state;

    axios.post('http://localhost:3001/unprotected', {
      id: userId,
      email: userEmail
    })
    .then(response => response.data )
    .then(data => {
      console.log(data);
    })
  }

  getFirebaseIdToken = () => {
    firebase.auth().currentUser.getIdToken(false).then((token) => {
      this.setState({ token })
    }).catch((error) => {
      // Handle error
    });
  }

  handleProtectedAPI = (e) => {
    axios.post('http://localhost:3001/protected', { token: this.state.token })
    .then(response => response.data )
    .then(data => {
      console.log(data);
    })
  }
  handleCartClick = (e) => {
    const newCart = this.state.cart.concat(this.state.products[e.target.id])
    this.setState({cart:newCart},()=>{
      console.log(this.state)
    })
  }
  render() {
    const { userEmail, userId } = this.state;
    if (userEmail === '') {
      return <h1>You're not logged in</h1>
    }
    else {
      return (
        <>
          {/* <h2>Welcome back, {userEmail}</h2>
          <h4>Your ID is: {userId}</h4> */}
         <h5 className="category-title">Best Selling</h5>
          <div className="columns">
              {
                this.state.products.map((e,i)=>{
                  return <div className="column is-3"><Product item={e} cartId={i} handleCartClick={this.handleCartClick}/></div>
                })
              }
                  </div>
                  <h5 className="category-title">New</h5>
          <div className="columns">
              {
                this.state.products.map((e,i)=>{
                  return <div className="column is-3"><Product item={e}/></div>
                })
              }
                  </div>
        </>
      )
    }
  }
}