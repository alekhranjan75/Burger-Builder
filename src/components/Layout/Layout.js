import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux';
class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    showSideDrawerState = () => {
        this.setState({
            showSideDrawer: false
        })
    }
    toggleMenu = () => {
        this.setState((prevState) =>{
            return {showSideDrawer: !prevState.SideDrawer}
        })
    }
    render() {
        return(
            <Aux>
                <Toolbar 
                    menu = {this.toggleMenu} 
                    isAuthenticated = {this.props.isAuthenticated}/>
                    {/* {console.log("Inside Layout", this.props.isAuthenticated)} */}
                <SideDrawer 
                    open  = {this.state.showSideDrawer} 
                    closed = {this.showSideDrawerState}
                    isAuthenticated = {this.props.isAuthenticated}/>
                <main className = {styles.main} >
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}
export default connect(mapStateToProps)(Layout);