import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients).map((igkey) => {
    return <li key = {igkey}><span style = {{textTransform: 'capitalize'}}>{igkey}</span>: {props.ingredients[igkey]}</li>
    })
    return (
        <Aux>
           <h3>Your Order</h3>
           <p>A delicious burger with the following ingredients:</p>
           <ul>
                {ingredients}
           </ul>
           <p><strong>Total Price: ₹ {props.price}</strong></p>
           <p> Conitnue to Checkout?</p>
           <Button btnType = "Danger" clicked = {props.canceled}>CANCEL</Button>
           <Button btnType = "Success" clicked = {props.continue} > CONTINUE </Button>
        </Aux>
    )
} 

export default orderSummary;