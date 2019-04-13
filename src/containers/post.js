import React from 'react';
import Axios from 'axios';
import Files from 'react-files';
// import firebase from '../firebase'
import * as firebase from 'firebase'
import loading from '../assets/Ball-1s-200px.gif';
import {Redirect} from 'react-router-dom'
/*
    amount: 999
created_at: "2019-04-04T01:09:00.171Z"
id: 9
image_url_array: "["https://images.ctfassets.net/axbo81ontyws/2R4ppj3K3SY0cYG0Q4QKIm/49424ee60b46b0d42296eb106a316583/boosted-stealth-electric-vehicle.jpg","https://images.ctfassets.net/axbo81ontyws/2R4ppj3K3SY0cYG0Q4QKIm/49424ee60b46b0d42296eb106a316583/boosted-stealth-electric-vehicle.jpg"]"
name: "Boosted Stealth"
shop_handle: "rambo"
shop_id: 1
specs: {fast: "true", topSpeed: "40", range: "5", drive: "belt"}
*/
export default class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            image_url_array: [],
            name: null,
            topSpeed: null,
            range: null,
            drive: null,
            deck: null,
            TYPE: null,
            image_count: 0,
        }
    }
    handleType = e =>{
        this.setState({type:e.target.id});
    }
    handleDeck = e =>{
        this.setState({deck:e.target.id});
    }
    handleChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit = async e => {
        //Build your specs object here
        let specs = {
            topSpeed:this.state.topSpeed,
            range:this.state.range,
            drive:this.state.drive,
            deck:this.state.deck,
            TYPE: this.state["TYPE"],
            success:false
        }
        const shop_id = this.props.location.state
        specs = JSON.stringify(specs);
        const url = `https://eboardmarket.herokuapp.com/product/`
        const response = await Axios.post(url, {
            amount: this.state.amount,
            image_url_array: JSON.stringify(this.state.image_url_array),
            name: this.state.name,
            shop_id: shop_id,
            specs:specs

        })

        this.setState({success:true})

    }

    handleFileInput = async (e) => {
        const files = e
        const root = firebase.storage().ref("/products")
        const newImage = root.child(files[this.state.image_count].name);
        let imageArr = []
        try {
            const snapshot = await newImage.put(files[this.state.image_count]);
            const url = await snapshot.ref.getDownloadURL();
            imageArr.push(url);
            imageArr = this.state.image_url_array.concat(url)
            console.log(url)
            console.log(imageArr)
        }
        catch (err) {
            console.log(err);
        }

        this.setState({ image_url_array: imageArr, image_count: this.state.image_count + 1 }, () => {
            console.log(this.state, "after uploading images")
        })
    }


    render() {
        console.log(this.props.location.state);

        const { name, amount } = this.state
        return (
            <>
                <div className="panel">
                    <div className="panel-heading">
                        Upload a product
    </div>

                    <div className="panel-block">
                        <p className="control has-icon">
                            <input className="input is-expanded" type="text" placeholder="Product Name" name="name" value={name} onChange={this.handleChange} autoFocus />
                            <span className="icon is-small">
                                <i className="fa fa-envelope"></i>
                            </span>
                        </p>
                    </div>
                    <div className="panel-block">
                        <p className="control has-icon">
                            <input className="input is-expanded" type="text" placeholder="$ Product Price" name="amount" value={amount} onChange={this.handleChange} autoFocus />
                            <span className="icon is-small">
                                <i className="fa fa-envelope"></i>
                            </span>
                        </p>
                    </div>
                    <div className="panel-block">
                        <p className="control has-icon">
                            <input className="input is-expanded" type="text" placeholder="Top Speed" name="topSpeed" onChange={this.handleChange} autoFocus />
                            <span className="icon is-small">
                                <i className="fa fa-envelope"></i>
                            </span>
                        </p>
                    </div>
                    <div className="panel-block">
                        <p className="control has-icon">
                            <input className="input is-expanded" type="text" placeholder="range" name="range" onChange={this.handleChange} />
                            <span className="icon is-small">
                                <i className="fa fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div className="panel-block">
                        <p className="control has-icon">
                            <input className="input is-expanded" type="text" placeholder="drive" name="drive" onChange={this.handleChange} />
                            <span className="icon is-small">
                                <i className="fa fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div class="panel-block">
                        <label class="radio">
                            <input type="radio" name="answer" id="longboard" onClick={this.handleDeck}/>
                            Longboard
  </label>
                        <label class="radio">
                            <input type="radio" name="answer" id="skateboard" onClick={this.handleDeck}/>
                        Skateboard
  </label>
  </div>
  <div className="panel-block">
  <label class="radio">
                            <input type="radio" name="answer" id="DIY" onClick={this.handleType}/>
                            DIY Board
  </label>
                        <label class="radio">
                            <input type="radio" name="answer" id="product" onClick={this.handleType }/>
                        Company Product
  </label>
  </div>

                   
                    <div className="panel-block">

                        <Files onChange={this.handleFileInput} multiple clickable accepts={['image/*']} maxFiles={3}>Upload Your images here </Files>
                        <figure className="image is-96x96">
                            <img src={loading} />
                        </figure>
                        {this.state.image_url_array.length}


                    </div>
                    <div className="panel-block">
                        <p className="control">
                            <button onClick={this.handleSubmit} className="button is-warning" type="submit">
                                Post your Product
        </button>
        {
            this.state.success === true ? <Redirect to={`/shops/${this.props.location.state}`} /> : ''
        }
                        </p>
                    </div>
                </div>
            </>
        )
    }


}