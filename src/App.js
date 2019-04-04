import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import firebase from './firebase'

import Header from './components/header';
import Home from './containers/home';
import Signup from './containers/signup';
import Login from './containers/login';
import Logout from './containers/logout';
import AuthContext from './contexts/auth';
import Product from './containers/product';

class App extends Component {
  state = {
    user: null,
  }
  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
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
          <Route path='/' component={ Header } />
          <div className='container mt-5'>
            <Route path='/' exact component={ Home } />
            <Route path='/signup' exact component={ Signup } />
            <Route path='/login' exact component={ Login } />
            <Route path='/logout' exact component={ Logout } />
            <Route path='/product/:id' exact component={Product} />
          </div>
          </AuthContext.Provider>

        </>
      </HashRouter>
    );
  }
}

export default App;