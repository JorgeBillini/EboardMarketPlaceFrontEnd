import React from 'react';
import firebase from '../firebase';
import Axios from 'axios';

export default class Signup extends React.Component {

  state = {
    email: '',
    password: '',
    error: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        //response.user.uid
        //@username 
        ///@email
        //@password
        //@uid
        console.log('Returns: ', response);
        const url = `https://eboardmarket.herokuapp.com/user/`
        Axios.post(url,{
          username:this.state.email,
          email:this.state.email,
          password:this.state.password,
          firebase_id: response.user.uid
        })
        .then(response=>{
          console.log(response);
        })
        .catch(e=>{
          console.log(e)
        })
      })
      .catch(err => {
        const { message } = err;
        this.setState({ error: message });
      })
  }
  closeErr = (e) => {
      this.setState({error:''})
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // ..... DO YOUR LOGGED IN LOGIC
        this.props.history.push('/')
      }
      else {
        // ..... The user is logged out
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { email, password, error } = this.state;
    const errorJSX = <div class="notification is-danger">
        <button onClick={this.closeErr} className="delete"></button>
         {error}
  </div>
  
    const displayError = error === '' ? '' : errorJSX

    return (
      <>
        <h1>Sign Up</h1>
        {displayError}
        <div className="panel">
    <div className="panel-heading">
        Sign Up
    </div>

    <div className="panel-block">
      <p className="control has-icon">
        <input className="input is-expanded" type="email" placeholder="E-mail Address" name="email" name="email" value={email} onChange={this.handleChange} autoFocus />
        <span className="icon is-small">
          <i className="fa fa-envelope"></i>
        </span>
      </p>
    </div>

    <div className="panel-block">
      <p className="control has-icon">
        <input className="input is-expanded" type="password" placeholder="Password" name="password" value={password} name="password" onChange={this.handleChange} />
        <span className="icon is-small">
          <i className="fa fa-lock"></i>
        </span>
      </p>
    </div>
    <div className="panel-block">
      <p className="control">
        <button onClick={this.handleSubmit} className="button is-success" type="submit">
          Sign Up
        </button>
      </p>
    </div>
    </div>
      </>
    )
  }
}