import React from 'react';
import firebase from '../firebase';
import Axios from 'axios';

export default class Signup extends React.Component {

    state = {
        email: '',
        password: '',
        shop_handle: '',
        error: '',
        type: '',
        description: '',
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        if(this.state.description === "" || this.state.email === "" || this.state.password === "" || this.state.shop_handle === ""){
            this.setState({error:'No empty fields allowed'});
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                // @shop_handle,@email,@password,@type,@description
                console.log('Returns: ', response);
                const url = `https://eboardmarket.herokuapp.com/shop/`
                Axios.post(url, {
                    shop_handle: this.state.shop_handle,
                    email: this.state.email,
                    password: this.state.password,
                    firebase_id: response.user.uid,
                    type:this.state.type,
                    description:this.state.description
                })
                    .then(response => {
                        console.log(response);
                    })
                    .catch(e => {
                        console.log(e)
                    })
            })
            .catch(err => {
                const { message } = err;
                this.setState({ error: message });
            })
    }
    closeErr = (e) => {
        this.setState({ error: '' })
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
    handleType = e =>{
        this.setState({type:e.target.id});
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { email, password, error,shop_handle,description } = this.state;
        const errorJSX = <div className="notification is-danger">
            <button onClick={this.closeErr} className="delete"></button>
            {error}
        </div>

        const displayError = error === '' ? '' : errorJSX

        return (
            <>
                {displayError}
                <div className="panel">
                    <div className="panel-heading">
                        Sign Up
    </div>

                    <div className="panel-block">
                        <p className="control has-icon">
                            <input className="input is-expanded" type="email" placeholder="E-mail Address" name="email"  value={email} onChange={this.handleChange} autoFocus />
                            <span className="icon is-small">
                                <i className="fa fa-envelope"></i>
                            </span>
                        </p>
                    </div>
                    <div className="panel-block">
                        <p className="control has-icon">
                            <input className="input is-expanded" type="text" placeholder="Shops Name" name="shop_handle"  value={shop_handle} onChange={this.handleChange} autoFocus />
                            <span className="icon is-small">
                                <i className="fa fa-envelope"></i>
                            </span>
                        </p>
                    </div>
                    <div className="panel-block">
                        <p className="control has-icon">
                            <input className="input is-expanded" type="text" placeholder="Enter a short description for your shop"  name="description" value={description} onChange={this.handleChange} autoFocus />
                            <span className="icon is-small">
                                <i className="fa fa-envelope"></i>
                            </span>
                        </p>
                    </div>
                    <div className="panel-block">
                        <p className="control has-icon">
                            <input className="input is-expanded" type="password" placeholder="Password" name="password" value={password}  onChange={this.handleChange} />
                            <span className="icon is-small">
                                <i className="fa fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div style={{marginLeft:"1rem"}}className="field">
                        <input onClick={this.handleType} className="is-checkradio" id="diy" type="radio"  />
                        <label>I am an independent shop(DIY Boards)</label>
                        <input style={{marginLeft:'1rem'}}onClick={this.handleType} className="is-checkradio" id="company" type="radio" />
                        <label>This account is for an organization(For companies)</label>
                    </div>
                    <div className="panel-block">
                        <p className="control">
                            <button onClick={this.handleSubmit} className="button is-warning" type="submit">
                                Sign Up
        </button>
                        </p>
                    </div>
                </div>
            </>
        )
    }
}