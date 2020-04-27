import {
    takeEvery
} from "redux-saga/effects"
import {
    SUBMIT_ORDER,
    FETCH_ORDER
} from "../action/actionOrder"
import {
    fetchOrderSaga,
    orderSubmissionSaga
} from "./sagaOrder"

export function* watchOrder() {
    console.log("Calling watchOrder")
    yield takeEvery(FETCH_ORDER, fetchOrderSaga)
    yield takeEvery(SUBMIT_ORDER, orderSubmissionSaga)
}