import {
    takeEvery,
    all
} from "redux-saga/effects"
import { logoutSaga, logoutCheckTimeoutSaga, authUserSaga, checkAuthenticationSaga } from "./sagaAuth"
import {
    AUTH_INITIATE_LOGOUT,
    AUTH_USER,
    AUTH_CHECK_TIMEOUT,
    AUTH_CHECK,
} from "../action/actionAuth"

/* the 'watcher'--- Starts logoutSaga on each dispatched `AUTH_INITIATE_LOGOUT`action. */

export function* watchAuth() {
    yield all( [
        takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(AUTH_CHECK_TIMEOUT, logoutCheckTimeoutSaga),
        takeEvery(AUTH_USER, authUserSaga),
        takeEvery(AUTH_CHECK, checkAuthenticationSaga)
    ])
}