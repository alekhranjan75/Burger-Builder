import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {  
            street: '',
            zipcode: ''
        },
        loading: false
    }
    orderHandler = (event) => {
        //Prevents from reloading the page that caused loss of Data
        event.preventDefault();
        this.setState({
            loading: true
        });
        console.log("Price of burger:",this.props.price)
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        let form = (
            <form>
                <input className = {styles.Input} type ="text" name= "name" placeholder=
                "Your Name" />
                <input className = {styles.Input} type = 'email' name= 'email' placeholder= 'Your email' />
                <input className = {styles.Input}type = 'text' name= 'street' placeholder= 'Street No' />
                <input className = {styles.Input}type = 'text' name= 'zipcode' placeholder= 'zipcode' />
                <Button btnType = "Success" clicked= {this.orderHandler}>Order</Button>
            </form>
            )
        if (this.state.loading) {
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

export default ContactData;