import React, {Component} from 'react';
import {HashRouter} from 'react-router-dom';
import axios from 'axios';
import '../assets/Ball-1s-200px.gif'

export default class Product extends Component {
    constructor(props){
        super(props)
        this.state = {

                id:this.props.match.params,
                name:'',
                images:['../assets/Ball-1s-200px.gif'],
                amount:null,
                specs: {},
                shop:'',
                loading:true
            
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
    componentDidMount = ()=>{
        console.log(this.props.match.params)
        const {id} = this.props.match.params;
        const url = `https://eboardmarket.herokuapp.com/product/${id}`
        // MAKE CALL TO UR API WITH THE ID
        axios.get(url)
        .then(response =>{
            const {name} = response.data;
            const image_url_array = JSON.parse(response.data.image_url_array);
            const {shop_id} = response.data;
            const {amount} = response.data;
            const {specs} = (response.data);
            this.setState({name:name,images:image_url_array,amount:amount,specs:specs,shop_id:shop_id,loading:false},()=>{
                console.log(this.state)
            })
        },err => {
            console.log(err)
        })
       
        
    }

    render(){
        // console.log(JSON.parse(this.state.specs))  
        // console.log(typeof(this.state.specs))
        // // let newSpecs =(this.state.specs)
        return (
            <>
         {
             this.state.images.map((e,i) =>{
                return <img src={e} />
             })
         }  
        <h1>Specs</h1>
            {this.state.specs.fast}
        </>
        )
    }
}

