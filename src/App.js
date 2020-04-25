import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import { checkAuthentication } from './store/action/actionAuth'

class App extends Component {
    componentDidMount() {
        this.props.checkAuthentication()
    }
    render() {
        let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
        return (
            <BrowserRouter>
                <div>
                <Layout>
                    {routes}
                </Layout>
                </div>
            </BrowserRouter>  
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};
const mapDispatchToProps = dispatch => {
    return {
       checkAuthentication: () => dispatch(checkAuthentication())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
