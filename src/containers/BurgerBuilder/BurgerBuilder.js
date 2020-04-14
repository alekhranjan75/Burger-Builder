import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Aux from '../../hoc/Aux'

class BurgerBuilder extends Component {
    render() {
        return(
            <Aux>
                <div>Burger</div>
                <div>Builder</div>
            </Aux>
        )
    }
}

export default BurgerBuilder;