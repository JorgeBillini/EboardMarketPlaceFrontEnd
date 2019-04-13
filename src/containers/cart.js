import React from 'react';
import CartItem from '../components/cartItem';
import SubTotalTile from '../components/subtotalTile';
class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            products: [],
        }
    }
    componentDidMount(){
        const products = JSON.parse(localStorage.getItem('cart')) || [];
        this.setState({products:products},()=>{
            console.log('state after local storage', this.state);
        });
    }
    getSubtotal(){
        let sum = 0;
        for(let i = 0; i < this.state.products.length ; i++){
            sum += this.state.products[i].amount
        }
        return sum;
    }
    handleRemove = e => { 
        let id = parseInt(e.target.id);
        let {products}= this.state;
        let newArr = products.slice(0,id).concat(products.slice(id+1))
        localStorage.setItem('cart',JSON.stringify(newArr));
        this.setState({products:newArr});        
    }

    render(){
    
            if(this.state.products.length < 1){
            return <h1> no items on your cart</h1>
        }
        else return (
            <>
    
            {
                this.state.products.map((e,i)=>{
                    return <CartItem product={e} key={i} index={i} handleRemove={this.handleRemove}/>
                })
            }
            <SubTotalTile subtotal={this.getSubtotal()} /> 

            

            </>

        )
    }
}
export default Cart;