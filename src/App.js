import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                <Layout>
                    <Switch>
                        <Route path = '/checkout' component = {Checkout}/>
                        <Route path = '/orders' component = {Orders} />
                        <Route path = '/' component = {BurgerBuilder} />          
                    </Switch>
                           
                </Layout>
                </div>
                {/* <Switch>
                    <Route path = '/uni' exact={true} render = {()=> <h1>Home</h1>} /> 
                    <Route path = '/orders/continue' exact={true} render = {()=> <h1>Home 2</h1>} />
                </Switch> */}
            </BrowserRouter>
           
        )
    }
}

export default App;