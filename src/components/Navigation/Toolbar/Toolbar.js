import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Toolbar.module.css'
import menuStyles from './Menu.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
const toolbar = (props) => (
    <header className = {styles.Toolbar}>
        <div 
        onClick = {props.menu} 
        className = {menuStyles.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div><Logo height = "80%" /></div>
        <nav className = {styles.DesktopOnly}>
            <NavigationItems isAuth = {props.isAuthenticated}
            />
        </nav>
    </header>
)
export default toolbar;