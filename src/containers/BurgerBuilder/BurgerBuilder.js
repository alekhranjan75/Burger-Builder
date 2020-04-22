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
import * as actionType from '../../store/action'
import { connect } from 'react-redux'


class BurgerBuilder extends Component {
    state  = {
        // ingredients: null,
        burgerPrice: 0,
        purchaseable: false,
        purchased: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // console.log('invoked componentDidMount')
        // axios.get('/ingredients.json')
        // .then(res => {
        //     this.setState({ingredients: res.data})
        // })
        // .catch(err => {
        //     this.setState({error: true})
        //     // console.log("Inside catch",err)
        // })
    }

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        // console.log(prevState.ingredients)
        // console.log("Inside did Update  ",this.state.ingredients)
        // if (this.state.ingredients != prevState.ingredients) {
        //     this.purchaseState(this.state.ingredients)
        //     let price = []
        //     for (let i = 0; i < Object.keys(this.state.ingredients).length; i++) {
        //         price = Object.keys(this.state.ingredients).map(ele => {
        //             return INGREDIENTS_PRICE[ele] * this.state.ingredients[ele]
        //         })
        //     }
        //     this.setState({
        //         burgerPrice: Object.values(price).reduce((a, b) => {
        //             return a + b
        //         }, 0)
        //     })
        // }
    }
    purchaseState = (ingredients) => {
        // console.log("Invoked purchaseState func")
        const totalIngredients = Object.values(ingredients).reduce((a, b) => {
            return a + b
        }, 0)
        return totalIngredients > 0 
    }

    purchased  = () => {
        // console.log("The props",this.props)
        // this.props.history.push({pathname: '/checkout'})
        this.setState({
            purchased: true
        })
    }
    // addIngredientHandler = (type) => {
    //     let count = this.state.ingredients[type]
    //     count += 1
    //     let updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = count

    //     let price = this.state.burgerPrice
    //     price += INGREDIENTS_PRICE[type]   
    //     // console.log(price)
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         burgerPrice: price,
    //     })
    //     this.purchaseState(updatedIngredients)
    // }
    // removeIngredientHandler = (type) => {
    //     let count = this.state.ingredients[type]
    //     let price = this.state.burgerPrice
    //     if (count != 0) {
    //         count -= 1
    //         price -= INGREDIENTS_PRICE[type]
    //     }
    //     let updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = count
    //     // console.log(price)
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         burgerPrice: price,
    //     })
    //     this.purchaseState(updatedIngredients)
    // }
    purchaseCancelHandler = () => {
        this.setState({
            purchased: false
        })
    }
    purchaseConitnueHandler = () => {
        // alert('Continued')
        // this.setState({
        //     loading: true
        // })
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.burgerPrice)
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        this.props.history.push({pathname: '/checkout'})
    }
    render() {
        
        let burger = this.state.error ?<p>Can't reach now</p>:<Spinner />
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
        ingredients: state.ingredients,
        burgerPrice: state.burgerPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingName) => dispatch({
            type:actionType.ADD_INGREDIENT, 
            ingredientType: ingName}),
        removeIngredient: (ingName) => dispatch({
            type: actionType.REMOVE_INGREDIENT,
            ingredientType: ingName
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));