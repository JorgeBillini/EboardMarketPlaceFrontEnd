import React from 'react';
import firebase from '../firebase';
import Product from '../components/product'
import Landing from '../components/landing';
import './home.css'
import axios from 'axios';
import ShopNav from '../components/ShopNavigation';
export default class Home extends React.Component {

  state = {
    userEmail: '',
    userId: '',
    isShop: null,
    shopid: '',
    shop_handle: '',
    token: '',
    products: [{
      image_url_array : ['lol','lol','lol'],
      productName : 'boosted',
      price : 400,
      shop_handle: 'bestskates',
      id:9
    },{ image_url_array : ['lol','lol','lol'],
      productName : 'boosted',
      price : 400,
      shop_handle: 'bestskates',
      id:9
    },{
      image_url_array:['lol'],
      productName:'boosted',
      price:420,
      shop_handle:'Abdul Skates',
      id:9
    },
    {
      image_url_array:['lol'],
      productName:'boosted',
      price:420,
      shop_handle:'Abdul Skates',
      id:9
    }],
    cart:[],
  }

  componentDidMount = async() =>  {
    this.unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // ..... DO YOUR LOGGED IN LOGIC
        const {data} = await axios.get(`https://eboardmarket.herokuapp.com/product/all`)

          this.setState({ userEmail: user.email, userId: user.uid , products:data,isShop:"loading"}, () => {
          this.getFirebaseIdToken()
        });
      }
      else {
        // ..... The user is logged out
      }
    })
  }
  componentDidUpdate = async() => {
    if (this.state.isShop === "loading"){
      const isShop  = await axios.get(`https://eboardmarket.herokuapp.com/shop/isShop/${this.state.userId}`)
      console.log(isShop,"is shop request")
      console.log(isShop.data.shop_info.id,"hi is my id")
      this.setState({isShop:isShop.data.isShop,shop_handle:isShop.data.shop_info.shop_handle,shopid:isShop.data.shop_info.id},()=>{
        console.log(this.state, "after update")
      })
    }
    
        // this.setState({isShop:isShop.data.isShop},()=>{
        //   console.log(this.state , "lol updated component")
        // });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }


  getFirebaseIdToken = () => {
    firebase.auth().currentUser.getIdToken(false).then((token) => {
      this.setState({ token })
    }).catch((error) => {
      // Handle error
    });
  }

  handleCartClick = (e) => {
    const newCart = this.state.cart.concat(this.state.products[e.target.id])
    localStorage.setItem('cart',JSON.stringify(newCart));
    this.setState({cart:newCart},()=>{
      console.log(this.state)
    })
  }
  
  render() {
    const { userEmail,isShop} = this.state;
    if (userEmail === '') {
      return <Landing></Landing>
    }
   
    else {
      return (
        <>
        {
          this.state.isShop === true ? <ShopNav shop_handle={this.state.shop_handle} shopid={this.state.shopid} /> : ''
        }
         <h5 className="category-title">Best Selling</h5>
          <div className="columns">
              {

                this.state.products.map((e,i)=>{
                  console.log("this is my array when im about to render", e.image_url_array, typeof(e.image_url_array))
                  return <div key={i} className="column is-3"><Product item={e} image={JSON.parse(e.image_url_array)[0]} cartId={i} handleCartClick={this.handleCartClick}/></div>
                })
              }
                  </div>
                  <h5 className="category-title">New</h5>
                <div className="columns">
              {
                this.state.products.map((e,i)=>{
                  return <div key={i} className="column is-3"><Product item={e} image={JSON.parse(e.image_url_array)[0]} cartId={i} handleCartC lick={this.handleCartClick}/></div>
                })
              }
                  </div>
        </>
      )
    }
  }
}