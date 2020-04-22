import * as actionTypes from "./action";

const initialState = {
    ingredients: {
        cream: 0,
        salad: 0,
        cheese: 0,
        tomato: 0
    },
    burgerPrice: 0
}
const INGREDIENTS_PRICE = {
    cream: 20,
    salad: 10,
    cheese: 10,
    tomato: 5
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
                },
                burgerPrice: state.burgerPrice + INGREDIENTS_PRICE[action.ingredientType]
            }
        case actionTypes.REMOVE_INGREDIENT:
            if (state.ingredients[action.ingredientType]) {
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientType]: state.ingredients[action.ingredientType] - 1
                    },
                    burgerPrice: state.burgerPrice - INGREDIENTS_PRICE[action.ingredientType]
                }
            } else {
                return state
            }

            
        default:
            return state
    }
}

export default reducer;