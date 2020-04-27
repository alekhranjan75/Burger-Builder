import axios from "../../axios-order"


export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const SET_INGREDIENT = 'SET_INGREDIENT'
export const FAILED_FECTH_INGREDIENT = 'FAILED_FECTH_INGREDIENT'
export const INIT_INGREDIENT = 'INIT_INGREDIENT'

export const addIngredient = (ingName) => {
    return {
        type: ADD_INGREDIENT,
        ingredientType: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientType: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: SET_INGREDIENT,
        ingredients: ingredients
    }
}
export const fetchIngredientFailed = () => {
    return {
        type: FAILED_FECTH_INGREDIENT
    }
}

export const initIngredients = () => {
    return {
        type: INIT_INGREDIENT
    }
}

