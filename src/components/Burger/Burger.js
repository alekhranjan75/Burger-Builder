import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Burger.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {
    return (
        <div className = {styles.Burger}>
            <BurgerIngredients ingredientType = "bread-top" />
            <BurgerIngredients ingredientType = "cheese"/>
            <BurgerIngredients ingredientType = "salad"/>
            <BurgerIngredients ingredientType = "bread-bottom" />
        </div>
    )
}

export default burger;