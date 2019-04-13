import React from 'react';
import ShopHero from '../components/shopHero';
import Axios from 'axios';
import Product from '../components/product';
export default class ShopProfile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            shop_handle:"",
            description: "",
            type:"",
            email:"",
            id:this.props.match.params.id,
            products :[],
            loading:false
            
        }
    }  
    componentDidMount = async() =>{
        // eboardmarketplace.herokuapp.com/shop/:shopname
        const id = this.props.match.params.id
       const {data} = await Axios.get(`https://eboardmarket.herokuapp.com/shop/${this.state.id}`);
       const shopProducts = await Axios.get(`https://eboardmarket.herokuapp.com/product/shop/${this.state.id}`);
       //Shop Products.da ta.products
        this.setState({shop_handle:data.shop_handle,description:data.description,type:data.type,email:data.email,products:shopProducts.data})
    }
    
    deleteNotification = (e) => {
        this.setState({notification:''})
    }

    render(){
        const Products = this.state.products.map((e,i)=>{
            const images = JSON.parse(e.image_url_array);
            const image= images[0];
            console.log(e);
            return (
                <div className="column is-3" >
                 <Product item={e} shop_handle={this.state.shop_handle} key={i} image={image} />

                </div>
            )
        })
        return(
            <>
            <ShopHero shop_handle={this.state.shop_handle} description={this.state.description} email={this.state.email}/>
            <h1 className="title"> Products </h1>
            <div style={{marginTop:"1rem"}}className="columns">
           {Products}
           </div>
            </>
        )
    }
}