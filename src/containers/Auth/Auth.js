import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { connect } from 'react-redux'
import styles from './Auth.module.css'
import { auth } from '../../store/action/actionAuth'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Axios from 'axios'
import { Redirect } from 'react-router'
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementProp: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                validity: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementProp: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                validity: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignUp: true
    }
    validityCheck = (value, rules) => {
        let isValid = true
        if (rules) {
            if (rules.required) {
                isValid = value.trim('') !== "" && isValid;
            }
            if (rules.minLength) {
                isValid = (value.length >= rules.minLength) && isValid
            }
            if (rules.maxLength) {
                isValid = (value.length <= rules.maxLength) && isValid
            }
            if (rules.isEmail) {
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test(value) && isValid
            }
            if (rules.isNumeric) {
                const pattern = /^\d+$/;
                isValid = pattern.test(value) && isValid
            }
        }
        return isValid
    }
    changedHandler = (event, id) => {
        const controlsCopy = {
            ...this.state.controls
        }
        let ele = controlsCopy[id]
        ele.value = event.target.value
        ele.validity = (this.validityCheck(ele.value, ele.validation))
        ele.touched = true
        controlsCopy[id] = ele
        let formIsValid = true
        for (let inputElement in controlsCopy) {
            formIsValid = controlsCopy[inputElement].validity && formIsValid
        }
        this.setState((prevState, props) => {
            return {
                controls: controlsCopy,
                formIsValid: formIsValid
            }
        })
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.authHandler(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }
    signUpSwitchHandler = () => {
        this.setState((prevState, props) => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render() {
        let formElements = []
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                properties: this.state.controls[key]
            })
        }
        let form = (
            <form onSubmit = {this.submitHandler}>
                {formElements.map(ele => {
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
                <Button btnType = "Success" disabled = {!this.state.formIsValid} >SUBMIT</Button>
            </form>
            )
        if (this.props.loading) {
            form = < Spinner />
        }
        let rediret = null
        if(this.props.isAuthenticated) {
            if(this.props.building) {
                rediret = <Redirect to = '/checkout' />
            }
            else {
                rediret = <Redirect to = '/' />
            }
        }
        // console.log("ISAUTHENTICATION", this.props.isAuthenticated)
        return (
           <div className = {styles.Auth}>
               {rediret}
                {form}
                <Button 
                    btnType = "Danger" 
                    clicked = {this.signUpSwitchHandler}>
                        {this.state.isSignUp ? 'Already have an Account? Sign In' : 'SWITCH TO SIGN UP'}
                </Button>
           </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        building: state.burger.building
    }
}
const mapDispatchToProps = dispatch => {
    return {
        authHandler: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, Axios))
