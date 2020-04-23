import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Link, Route, Redirect } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData'
import { connect } from 'react-redux';
import { initPurchase } from '../../store/action/actionOrder';

class Checkout extends Component {
    componentDidUpdate() {
        console.log("[Checkout], ComponentDidUpdate")
        this.props.initPurchase
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
        let summary = <Redirect to = '/' />
        
        if(this.props.ingredients) {
            const redirectToHome = this.props.purchased ? < Redirect to = '/' /> : null
            summary = (
                <div>
                    {redirectToHome}
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
        return summary
    }
}
const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        purchased: state.order.purchased
    }
}
const mapDispatchToProps = dispatch => {
    return {
        initPurchase: () => dispatch(initPurchase())
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Checkout);