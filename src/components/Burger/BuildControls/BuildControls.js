import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import BuildControl from "./BuildControl/BuildControl";
import styles from "./BuildControls.module.css";

// const controls = [
//     {label: 'Cream', ingredientType: 'cream'},
//     {label: 'Salad', ingredientType: 'salad'},
//     {label: 'Tomato', ingredientType: 'tomato'},
//     {label: 'Cheese', ingredientType: 'cheese'}
// ]
const buildControls = (props) =>{ 
    const controls =Object.keys(props.ingredients).map(ele => {
            return ({
                label: ele.charAt(0).toUpperCase() + ele.slice(1),
                ingredientType: ele
            })
        })
    return(
    <div className = {styles.BuildControls}>
        <p> Current Price: <strong> ₹ {props.price}</strong></p>
        {
            controls.map (ctrl => {
                // console.log("Controls. invoked")
                return(
                <BuildControl 
                    key = {ctrl.label} 
                    label = {ctrl.label} 
                    added = {() => props.addedIngredients(ctrl.ingredientType)} 
                    removed = {() => props.removedIngredients(ctrl.ingredientType)}
                />)
            })
        }
        <button className = {styles.OrderButton}
                disabled = {!props.purchaseable}
                onClick = {props.purchasing}> {props.isAuth ? 'Order Now' : 'SignUp To Order!'}</button>
    </div>
)}
export default buildControls;