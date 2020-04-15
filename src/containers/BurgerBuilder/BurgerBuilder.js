import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
// import IngredientContext from '..//../context/more-context'
import OrderSummary from '../../components/Burger/BurgerSummary/BurgerSummary'

const INGREDIENTS_PRICE = {
    cream: 20,
    salad: 10,
    cheese: 10,
    tomato: 5
}

class BurgerBuilder extends Component {
    state  = {
        ingredients: {
            cream: 0,
            salad: 0,
            cheese: 0,
            tomato: 0            
        },
        burgerPrice: 0,
        purchaseable: false,
        purchased: false
    }

    purchaseState = (ingredients) => {
        const totalIngredients = Object.values(ingredients).reduce((a, b) => {
            return a + b
        }, 0)
        this.setState({purchaseable: totalIngredients > 0})
    }

    purchased  = () => {
        this.setState({
            purchased: true
        })
    }
    addIngredientHandler = (type) => {
        let count = this.state.ingredients[type]
        count += 1
        let updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = count

        let price = this.state.burgerPrice
        price += INGREDIENTS_PRICE[type]   
        console.log(price)
        this.setState({
            ingredients: updatedIngredients,
            burgerPrice: price,
        })
        this.purchaseState(updatedIngredients)
    }
    removeIngredientHandler = (type) => {
        let count = this.state.ingredients[type]
        let price = this.state.burgerPrice
        if (count != 0) {
            count -= 1
            price -= INGREDIENTS_PRICE[type]
        }
        let updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = count
        console.log(price)
        this.setState({
            ingredients: updatedIngredients,
            burgerPrice: price,
        })
        this.purchaseState(updatedIngredients)
    }
    purchaseCancelHandler = () => {
        this.setState({
            purchased: false
        })
    }
    purchaseConitnueHandler = () => {
        alert('Continued')
    }
    render() {
        return(
            <Aux>
                <Modal show = {this.state.purchased} cancel = {this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients = {this.state.ingredients}
                        canceled = {this.purchaseCancelHandler}
                        continue = {this.purchaseConitnueHandler}
                        price = {this.state.burgerPrice}
                    />
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BurgerControls 
                    addedIngredients ={this.addIngredientHandler} 
                    removedIngredients = {this.removeIngredientHandler}
                    price = {this.state.burgerPrice} 
                    purchaseable = {this.state.purchaseable}
                    purchasing = {this.purchased}                       
                />
                
            </Aux>
        )
    }
}

export default BurgerBuilder;