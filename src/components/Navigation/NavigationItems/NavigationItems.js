import React, { Component } from 'react'
import styles from './NavigationItems.module.css'
import NavigaionItem from './NavigationItem/NavigationItem'
const navigaionItems = () => (
    <ul className = {styles.NavigationItems}>
        <NavigaionItem link = "/" active = "true">BurgerBuilder</NavigaionItem>
        <NavigaionItem link = "/" >Checkout</NavigaionItem>
    </ul>
);

export default navigaionItems; 