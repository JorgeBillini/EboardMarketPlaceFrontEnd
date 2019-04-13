import React from 'react';
import Axios from 'axios';

export default class Orders extends React.Component {
    constructor(props){
        super(props)
        this.state={
            shopid: this.props.match.params.id,
            orders:[],
        }
    }

    componentDidMount = async()=>{
        // path /orderItems/:id
        const url = `https://eboardmarket.herokuapp.com/shop/orderItems/${this.state.shopid}`
        const response = await Axios.get(url);
        console.log(response)
        this.setState({orders:response.data},()=>{
            console.log(this.state,"state after call")
        })
    }
    render(){
        return (<>
        {this.state.orders.length < 1 ? <h1>You have no new orders.</h1>: <h1>Your orders should show up</h1>}
        </>)
    }

}