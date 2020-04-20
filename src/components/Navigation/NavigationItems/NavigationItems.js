import React, { Component } from 'react'
import styles from './NavigationItems.module.css'
import NavigaionItem from './NavigationItem/NavigationItem'
const navigaionItems = () => (
    <ul className = {styles.NavigationItems}>
        <NavigaionItem link = "/"  exact>BurgerBuilder</NavigaionItem>
        <NavigaionItem link = "/orders" >Orders</NavigaionItem>
    </ul>
);

export default navigaionItems; 