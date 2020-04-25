import * as actionTypes from "../action/actionBurgerBuilder";

const initialState = {
    ingredients: null,
    burgerPrice: 0,
    error: false,
    building: false
}
const INGREDIENTS_PRICE = {
    cream: 20,
    salad: 10,
    cheese: 10,
    tomato: 5
}

const reducerBurgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
                },
                burgerPrice: state.burgerPrice + INGREDIENTS_PRICE[action.ingredientType],
                building: true
            }
        case actionTypes.REMOVE_INGREDIENT:
            if (state.ingredients[action.ingredientType]) {
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientType]: state.ingredients[action.ingredientType] - 1
                    },
                    burgerPrice: state.burgerPrice - INGREDIENTS_PRICE[action.ingredientType],
                    building: true,
                }
            } else {
                return state
            }
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients : action.ingredients,
                burgerPrice: 0,
                error: false,
                building: false
            }
        case actionTypes.FAILED_FECTH_INGREDIENT:
            return {
                ...state,
                error: true
            }
            
        default:
            return state
    }
}

export default reducerBurgerBuilder;