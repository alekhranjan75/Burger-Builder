import axios from "../../axios-order"

export const ORDER_SUCCESS = 'ORDER_SUCCESS'
export const ORDER_FAIL = 'ORDER_FAIL'
export const INIT_PURCHASE = 'INIT_PURCHASE'

export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAIL = 'FETCH_FAIL'


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
export const orderSubmission = (order) => {
    return dispatch => {
        axios.post('/orders.json', order)
            .then(response => {
                dispatch(submissionSuccess(order, response.data.name))
            })
            .catch(error => {
                dispatch(submissionFail())
            });
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
export const fetchOrder = () => {
    return dispatch => {
        axios.get('/orders.json')
        .then(res => {
            // console.log(res.data)
            const fetchedData = []
            for(let key in res.data) {
                fetchedData.push ({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchSuccess(fetchedData))
        })
        .catch(res => {
            dispatch(fetchFail)
        });
    }
}