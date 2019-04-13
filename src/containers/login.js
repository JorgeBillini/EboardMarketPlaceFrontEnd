import React from 'react';
import firebase from '../firebase';

export default class Login extends React.Component {

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
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('Returns: ', response);
      })
      .catch(err => {
        const { message } = err;
        this.setState({ error: message });
      })
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
  closeErr = (e) => {
    this.setState({error:''})
}
  render() {
    const { error } = this.state;
    const displayError = error === '' ? '' : <div className="notification is-danger" role="alert">{error} <button onClick={this.closeErr}className="delete" /></div>

    return (
      <>
        <h1>Login</h1>
        {displayError}
        <form>
        <div className="field">
  <p className="control has-icons-left has-icons-right">
    <input className="input" type="email" placeholder="Email" name="email" onChange={this.handleChange}  />
    <span className="icon is-small is-left">
      <i className="fas fa-envelope"></i>
    </span>
    <span className="icon is-small is-right">
      <i className="fas fa-check"></i>
    </span>
  </p>
</div>
<div className="field">
  <p className="control has-icons-left">
    <input className="input" type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
    <span className="icon is-small is-left">
      <i className="fas fa-lock"></i>
    </span>
  </p>
</div>
    <button className="button is-warning" onClick={this.handleSubmit}>Log In</button>

        </form>
      </>
    )
  }
}

/*
value={password} name="password" onChange={this.handleChange}  
value={email} onChange={this.handleChange}
<div className="field">
  <p className="control has-icons-left has-icons-right">
    <input className="input" type="email" placeholder="Email" value={email} onChange={this.handleChange} />
    <span className="icon is-small is-left">
      <i className="fas fa-envelope"></i>
    </span>
    <span className="icon is-small is-right">
      <i className="fas fa-check"></i>
    </span>
  </p>
</div>
<div className="field">
  <p className="control has-icons-left">
    <input className="input" type="password" placeholder="Password" value={password} name="password" onChange={this.handleChange}  />
    <span className="icon is-small is-left">
      <i className="fas fa-lock"></i>
    </span>
  </p>
</div>

*/ 