import * as actionTypes from "../action/actionOrder"

const initialState = {
    order: [],
    loading: false,
    purchased: false
}

const reducerOrder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_SUCCESS:
            const updatedOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
               ...state,
               loading: true,
               purchased: true,
               order: state.order.concat(updatedOrder)
            }
        case actionTypes.ORDER_FAIL:
            return {
                ...state,
                loading: true
            } 
        case actionTypes.INIT_PURCHASE:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.FETCH_SUCCESS:
            return {
                ...state,
                order: action.orders
            }
        case actionTypes.FETCH_SUCCESS:
            return {
                ...state
            }
        default:
            return state
    }
}

export default reducerOrder;