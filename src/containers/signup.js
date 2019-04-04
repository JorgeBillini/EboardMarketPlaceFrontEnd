import React from 'react';
import firebase from '../firebase';

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
        console.log('Returns: ', response);
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
        <button onClick={this.closeErr} class="delete"></button>
         {error}
  </div>
  
    const displayError = error === '' ? '' : errorJSX

    return (
      <>
        <h1>Sign Up</h1>
        {displayError}
        <div class="panel">
    <div class="panel-heading">
        Sign Up
    </div>

    <div class="panel-block">
      <p class="control has-icon">
        <input class="input is-expanded" type="email" placeholder="E-mail Address" name="email" name="email" value={email} onChange={this.handleChange} autofocus />
        <span class="icon is-small">
          <i class="fa fa-envelope"></i>
        </span>
      </p>
    </div>

    <div class="panel-block">
      <p class="control has-icon">
        <input class="input is-expanded" type="password" placeholder="Password" name="password" value={password} name="password" onChange={this.handleChange} />
        <span class="icon is-small">
          <i class="fa fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="panel-block">
      <p class="control">
        <button onClick={this.handleSubmit} class="button is-success" type="submit">
          Sign Up
        </button>
      </p>
    </div>
    </div>
      </>
    )
  }
}
{/* /*
 <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" placeholder="Password" value={password} name="password" onChange={this.handleChange} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Sign Up</button>

*/ }