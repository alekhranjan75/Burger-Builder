import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Burger.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {
    // console.log(props.ingredients)
    //It returns an array that has for the no of 
    const receivedIngredients = Object.keys(props.ingredients).map(ing => [...Array(props.ingredients[ing])].map((_, i) => <BurgerIngredients key = {ing + i} ingredientType = {ing}/>));

    const totalIngredients = Object.values(props.ingredients).reduce((a,b) => {return a + b}, 0)

    // const ingre = Object.keys(props.ingredients).map(igkey =>{
    //     return [...Array(props.ingredients[igkey])].map((_, i) => {
    //         console.log(igkey)
    //         return <BurgerIngredients key = {igkey + i} ingredientType = {igkey}/>
    //     })
    // })
    
    return (
        <div className = {styles.Burger}>
            <BurgerIngredients ingredientType = "bread-top" />
            {totalIngredients ? receivedIngredients : <p>Add some ingredients</p>}
            <BurgerIngredients ingredientType = "bread-bottom" />
        </div>
    )
}

export default burger;