import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './BurgerIngredients.module.css'

class BurgerIngredients extends Component {

    render () {
    let ingredients = null;
    switch (this.props.ingredientType) {
        case ('bread-bottom') :
            ingredients =  <div className = {styles.BreadBottom}> </div>
            break;
        case ('bread-top') :
            ingredients =(
                <div className = {styles.BreadTop}>
                    <div className = {styles.Seeds1}></div>
                    <div className = {styles.Seeds2}></div>
                </div>
            ) 
            break;
        case ('cheese') :
            ingredients = <div className = {styles.Cheese}></div>
            break;
        case ('salad') :
            ingredients = <div className = {styles.Salad}></div>
            break;
        default: 
            ingredients = null;
    }
    return ingredients ;
}
}
BurgerIngredients.propTypes =  {
    ingredientType: PropTypes.string.isRequired
}

export default BurgerIngredients;