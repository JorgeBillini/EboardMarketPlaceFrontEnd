import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import firebase from './firebase'
import './app.css'

import Header from './components/header';
import Home from './containers/home';
import Signup from './containers/signup';
import Login from './containers/login';
import Logout from './containers/logout';
import AuthContext from './contexts/auth';
import Product from './containers/product';
import Cart from './containers/cart';
import ShopSignUp from './containers/shopSignUp';
import ShopProfile from './containers/ShopProfile';
import Post from './containers/post';
import Search from './containers/search';
import Orders from './containers/order';
class App extends Component {
  state = {
    user: null,
  }
  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user});
      }
      else {
        this.setState({ user: null })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
  
  

  render() {
    return (
      <HashRouter>
        <>
          <AuthContext.Provider value = {this.state.user}>
          <Route path='/'><Header/></Route>
          <div className='container mt-5'>
            <Route path='/' exact component={ Home } />
            <Route path='/signup' exact component={ Signup } />
            <Route path='/login' exact component={ Login } />
            <Route path='/logout' exact component={ Logout } />
            <Route path='/product/:id' exact component={Product} />
            <Route path="/cart" exact component = {Cart}/>
            <Route path="/sellersignup" exact component={ShopSignUp} />
            <Route path="/shops/:id" exact component={ShopProfile} />
            <Route path = "/post" exact component={Post} />
            <Route path="/search" exact component={Search} />
            <Route path="/orders/:id" exact component={Orders} />
          </div>
          </AuthContext.Provider>

        </>
      </HashRouter>
    );
  }
}

export default App;