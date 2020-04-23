import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import { orderSubmission } from '../../../store/action/actionOrder'
// import { orderSubmission } from '../../../store/action/actionBurgerBuilder'
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementProp: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                validity: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementProp: {
                    type: 'text',
                    placeholder: 'Street No'
                },
                value: '',
                validation: {
                    required: true
                },
                validity: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementProp: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                validity: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementProp: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                validity: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementProp: {
                    type: 'text',
                    placeholder: 'Country Name'
                },
                value: '',
                validation: {
                    required: true
                },
                validity: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementProp: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validity: true
            }
        },
        formIsValid: false
    }
    
    orderHandler = (event) => {
        //Prevents from reloading the page that caused loss of Data
        event.preventDefault();
        this.setState({
            loading: true
        });
        const orderDetails = {}
        for(let data in this.state.orderForm) {
            orderDetails[data] = this.state.orderForm[data].value;
        }
        // console.log("Price of burger:",this.props.price)
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: orderDetails
        }
        this.props.orderSubmission(order)
        
    }
    validityCheck = (value, rules) => {
        let isValid = true
        if(rules) {
            if (rules.required) {
                isValid = value.trim('') !== "" && isValid;
            }
            if (rules.minLength) {
                isValid = (value.length >= rules.minLength) && isValid
            }
            if (rules.maxLength) {
                isValid = (value.length <= rules.maxLength) && isValid
            }
        }        
        return isValid
    }
    changedHandler = (event, id) => {
        // console.log("Input Handler Invoked", "id is", id)
        const orderFormCopy = {...this.state.orderForm}
        let ele = orderFormCopy[id]
        ele.value = event.target.value
        ele.validity = (this.validityCheck(ele.value, ele.validation))
        ele.touched = true
        orderFormCopy[id] = ele
        let formIsValid = true
        for(let inputElement in orderFormCopy) {
            formIsValid = orderFormCopy[inputElement].validity && formIsValid
        }
        // console.log("Orderform:-------",orderFormCopy)
        //Finding the index with the specific id
        this.setState((prevState, props) => {
            return {orderForm: orderFormCopy, formIsValid: formIsValid}
        })
    }

    render() {
        let formElements = []
        for( let key in this.state.orderForm) {
            formElements.push({
                id: key,
                properties: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit = {this.orderHandler}>
                {formElements.map(ele => {
                    // console.log("id",ele.id)
                    // console.log("inputtype", ele.properties.elementType)
                    // console.log("placeholder", ele.properties.elementProp.placeholder)
                    // console.log("value", ele.properties.value)
                    return(
                        <Input 
                            key = {ele.id}
                            inputtype = {ele.properties.elementType}
                            properties = {ele.properties.elementProp}
                            invalid = {!ele.properties.validity}
                            shouldValidate = {ele.properties.validation}
                            touched = {ele.properties.touched}
                            value = {ele.properties.value}
                            changed = {(event) =>this.changedHandler(event, ele.id)}/>
                    )
                })}
                {/* <Input inputtype = 'input' type = 'text' name= 'zipcode' placeholder= 'zipcode' /> */}
                <Button btnType = "Success" disabled = {!this.state.formIsValid} >Order</Button>
            </form>
            )
        if (this.props.loading) {
            form = < Spinner />
        }
        return (
            <div className = {styles.ContactData}>
                <h4>Enter your Data</h4>
                {form}
            </div>
            
        )
    }

}
const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.burgerPrice,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        orderSubmission: (order) => dispatch(orderSubmission(order))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactData);