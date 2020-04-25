import React, { Component, Suspense } from 'react'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { checkAuthentication } from './store/action/actionAuth'
import Spinner from './components/UI/Spinner/Spinner'

const Auth = React.lazy(()=> import('./containers/Auth/Auth'))
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'))
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))
const Orders = React.lazy(() => import('./containers/Orders/Orders'))

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
            <Route path="/auth" component={Auth} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
        return (
          <Suspense fallback = {<Spinner />}>
            <BrowserRouter>
                <div>
                <Layout>
                    {routes}
                </Layout>
                </div>
            </BrowserRouter>  
          </Suspense>
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
