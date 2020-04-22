import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Link, Route } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData'
import { connect } from 'react-redux';

class Checkout extends Component {
    // state = {
    //     ingredients: 
    //     {
    //         cream: 2,
    //         salad: 1,
    //         cheese: 1,
    //         tomato: 0
    //     },
    //     price: 0
    // }
    componentDidMount () {
        //  console.log("Mounting Checkout", this.props)
        //  const ingredients = (url) => {
        //     const arr = url.slice(1).split(/&|=/); // remove the "?", "&" and "="
        //     let params = {};
        //     let price
        //     for (let i = 0; i < arr.length; i += 2) {
        //         if(arr[i] != "price") {
        //         const key = arr[i],
        //             value = +arr[i + 1];
        //         params[key] = value; // build the object = { limit: "10", page:"1", status:"APPROVED" }
        //         }
        //         else {
        //             price = +arr[i +1]
        //         }
        //     }
        //     this.setState({price: price})
        //     return params;
        // };
        //  console.log(ingredients(this.props.location.search))
        //  const query = new URLSearchParams(this.props.location.search);
        //  console.log(query)
        //  const ingredients = {};
        //  for (let param of query.entries()) {
        //      // ['salad', '1']
        //      ingredients[param[0]] = +param[2];
        //  }
        //  console.log('Ingrdeients are', ingredients)
        // const updatedIngredients = ingredients(this.props.location.search)
        // this.setState({ingredients: updatedIngredients});
    }
    cancel = () => {
        // console.log("Cancel")
        // this.props.history.replace({pathname: '/'})
        this.props.history.goBack();
    }
    continue = () => {
        console.log("Continue, checkout")
        this.props.history.replace('/checkout/contact-data')

    }
    
    render() {
        // console.log(this.props)
        return (
            <div>
                <CheckoutSummary 
                    ingredients = {this.props.ingredients} 
                    cancel= {this.cancel} 
                    continue= {this.continue}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component = {ContactData} />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}
export default connect(mapStateToProps) (Checkout);