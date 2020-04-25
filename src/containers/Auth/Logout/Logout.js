import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import {authLogout} from '../../../store/action/actionAuth'
import { initIngredients } from '../../../store/action/actionBurgerBuilder'

class Logout extends Component {
    componentDidMount() {
        this.props.initIngredient()
        this.props.logout()
    }
    render() {
        return <Redirect to = '/'/>
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authLogout()),
        initIngredient: () => dispatch(initIngredients())
    }
}

export default connect(null, mapDispatchToProps)(Logout);