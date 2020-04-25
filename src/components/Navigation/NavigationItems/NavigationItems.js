import React from 'react'
import styles from './NavigationItems.module.css'
import NavigaionItem from './NavigationItem/NavigationItem'
const navigaionItems = (props) => (
    <ul className = {styles.NavigationItems}>
        <NavigaionItem link = "/"  exact>BurgerBuilder</NavigaionItem>
        {props.isAuth ? <NavigaionItem link = "/orders" >Orders</NavigaionItem>: null}
        {props.isAuth ?
            <NavigaionItem link = "/logout" >Logout</NavigaionItem> :
            <NavigaionItem link = "/auth" >Authenticate</NavigaionItem>}
    </ul>
);

export default navigaionItems; 