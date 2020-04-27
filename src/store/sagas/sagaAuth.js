import {put, takeEvery} from 'redux-saga/effects'
import "regenerator-runtime/runtime";
import { AUTH_LOGOUT, AUTH_INITIATE_LOGOUT } from "../action/actionAuth"

export function* logoutSaga(action) {
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('expirationDate')
    yield localStorage.removeItem('userId')
    yield put({
        type: AUTH_LOGOUT
    })
}
/*  Starts logoutSaga on each dispatched `AUTH_INITIATE_LOGOUT`action. */

export function* watchAuth () {
    yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga)
}