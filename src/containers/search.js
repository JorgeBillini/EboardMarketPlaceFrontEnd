import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Product from '../components/product';
import loading from '../assets/Ball-1s-200px.gif'
import ShopCard from '../components/ShopCard'
export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            skateboards: [],
            longboards: [],
            shops: [],
            activeTab: "longboards"
        }
    }
    sortData(){
        /*
            this function will take the products array from the state and generate the arrays that correspond to their category
        */
       const longboardsArr = [];
        const skateboardsArr = [];
        if(this.state.products.length < 1){
            return;
        }
       this.state.products.forEach(element => {
           
           if(element.specs.deck === "longboard"){
                longboardsArr.push(element)
           }
           else if (element.specs.deck==="skateboard"){
               skateboardsArr.push(element)
           }
       });
       this.setState({longboards:longboardsArr,skateboards:skateboardsArr},()=>{
           console.log(this.state,"after data sort")
       })
    }
    componentDidMount = async () => {
        const url = `https://eboardmarket.herokuapp.com/product/all`
        const { data } = await Axios.get(url);
        const shops = await Axios.get(`https://eboardmarket.herokuapp.com/shop/info/all`)
        this.setState({ products: data,shops:shops.data},()=>{
            this.sortData()
            console.log(this.state);
        })
    
    }
    
    handleTabClick = e => {
        this.setState({ activeTab: e.target.name }, () => {
            console.log(this.state);
        });
    }
    selectRenderArray(){
        /*
        this function will determine which array to render
        */
       if (this.state.activeTab === "longboards"){
           return this.state.longboards
       }
       else if (this.state.activeTab === "skateboards"){
           return this.state.skateboards
       }
       else if (this.state.activeTab === "shops"){
        return [];
       }
       
    }
    render() {
        let  array = this.selectRenderArray();
        let resultsJSX;
        if (this.state.activeTab === "shops") {
            array = this.state.shops
            resultsJSX = array.map((e,i)=>{
               return <ShopCard  shop={e} />
            })
        }
        else {
             resultsJSX = array.map((e,i)=>{
                const image = JSON.parse(e.image_url_array);
                return (
                    <div className="column is-3">
                    <Product item={e} image={image[0]} />
                    </div>
                )  
            })

        }
        
        return (
            <>
                <div className="columns">
                    <div className="column is-4">
                        <aside className="menu">
                            <p className="menu-label">
                                Search
  </p>
                            <ul className="menu-list">
                                <li><a onClick={this.handleTabClick} name="longboards">Longboards</a></li>
                                <li><a onClick={this.handleTabClick} name="skateboards">Skateboards</a></li>
                                <li><a onClick={this.handleTabClick} name="shops">Shops</a></li>
                            </ul>
                        </aside>

                    </div>
                    <div className="column is-8">
                    
                        {resultsJSX} 
                    
                    </div>
                </div>
            </>
        )
    }
}