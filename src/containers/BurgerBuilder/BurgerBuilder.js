import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
// import IngredientContext from '..//../context/more-context'
import OrderSummary from '../../components/Burger/BurgerSummary/BurgerSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { Route, Switch } from 'react-router-dom'
import Checkout from '../Checkout/Checkout'
// import * as actionType from '../../store/action/action'
import { connect } from 'react-redux'
import { addIngredient, removeIngredient, initIngredients } from '../../store/action/actionBurgerBuilder'


class BurgerBuilder extends Component {
    state  = {
        purchased: false,
        loading: false
    }

    componentDidMount() {
        if(!this.props.building) {
            this.props.initIngredient()
        }
        
    }
    purchaseState = (ingredients) => {
        // console.log("Invoked purchaseState func")
        const totalIngredients = Object.values(ingredients).reduce((a, b) => {
            return a + b
        }, 0)
        return totalIngredients > 0 
    }

    purchased  = () => {
        if(this.props.isAuthenticated) {
            this.setState({
                purchased: true
            })
        } else {
            this.props.history.push('/auth')
        } 
    }
    purchaseCancelHandler = () => {
        this.setState({
            purchased: false
        })
    }
    purchaseConitnueHandler = () => {
        this.props.history.push({pathname: '/checkout'})
    }
    render() {
        
        let burger = this.props.error ?<p>Can't reach now</p>:<Spinner />
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ingredients}/>
                    <BurgerControls
                        addedIngredients ={this.props.addIngredient} 
                        removedIngredients = {this.props.removeIngredient}
                        price = {this.props.burgerPrice} 
                        purchaseable = {this.purchaseState(this.props.ingredients)}
                        purchasing = {this.purchased}
                        isAuth = {this.props.isAuthenticated}
                        ingredients = {this.props.ingredients}                     
                    />
                
                </Aux>

            )
        }
        let orderSummary = <OrderSummary 
                        ingredients = {this.props.ingredients}
                        canceled = {this.purchaseCancelHandler}
                        continue = {this.purchaseConitnueHandler}
                        price = {this.props.burgerPrice}
                    />
        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        return(
            <Aux>
                <Modal show = {this.state.purchased} cancel = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}  
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        burgerPrice: state.burger.burgerPrice,
        error: state.burger.error,
        building: state.burger.building,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingName) => dispatch(addIngredient(ingName)),
        removeIngredient: (ingName) => dispatch(removeIngredient(ingName)),
        initIngredient: () => dispatch(initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));