import axios from "../../axios-order";
import {put} from 'redux-saga/effects'
import "regenerator-runtime/runtime";
import { submissionFail, fetchFail, submissionSuccess, fetchSuccess } from "../action/actionOrder";

export function* fetchOrderSaga(action) {
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const res = yield axios.get('/orders.json' + queryParams)
        const fetchedData = []
        for (let key in res.data) {
            fetchedData.push({
                ...res.data[key],
                id: key
            })
        }
        yield put(fetchSuccess(fetchedData))
    } catch (error) {
        yield put(fetchFail())
    }
}

export function* orderSubmissionSaga(action) {
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.order)
        yield put(submissionSuccess(action.order, response.data.name))
    } catch (error) {
        yield put(submissionFail())
    }
}