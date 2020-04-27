import axios from "../../axios-order"

export const ORDER_SUCCESS = 'ORDER_SUCCESS'
export const ORDER_FAIL = 'ORDER_FAIL'
export const INIT_PURCHASE = 'INIT_PURCHASE'
export const SUBMIT_ORDER = 'SUBMIT_ORDER'

export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAIL = 'FETCH_FAIL'
export const FETCH_ORDER = 'FETCH_ORDER'

export const submissionFail  = () => {
    return {
        type: ORDER_FAIL
    }
}

export const submissionSuccess = (order, id) => {
    return {
        type: ORDER_SUCCESS,
        orderData: order,
        orderId: id
    }
}
export const orderSubmission = (token, order) => {
    return {
        type: SUBMIT_ORDER,
        token: token,
        order: order
    }
}
export const initPurchase = () => {
    return {
        type: INIT_PURCHASE
    }
}
export const fetchSuccess = (orders) => {
    return {
        type: FETCH_SUCCESS,
        orders: orders
    }  
}

export const fetchFail = () => {
    return {
        type: FETCH_FAIL
    }
}
export const fetchOrder = (token, userId) => {
    return {
        type: FETCH_ORDER,
        token: token,
        userId:userId
    }
}