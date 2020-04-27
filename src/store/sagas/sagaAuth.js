import {put, delay} from 'redux-saga/effects'
import "regenerator-runtime/runtime";
import axios from "axios"
import {
    logoutAction,
    authLogout,
    authStart,
    authSuccess,
    logoutCheckTimeout,
    authFail
} from "../action/actionAuth"

export function* logoutSaga(action) {
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('expirationDate')
    yield localStorage.removeItem('userId')
    yield put(logoutAction())
}

export function* logoutCheckTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(authLogout())
}
export function* authUserSaga(action) {
  yield put(authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAa77zkJGKG2ikK-5Fm7ZWdgEF8quJP07I'

  if (!action.isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAa77zkJGKG2ikK-5Fm7ZWdgEF8quJP07I'
  }
  try {
    const response = yield axios.post(url, authData);

    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
        authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(logoutCheckTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(authFail(error.response.data.error));
  }
}

export function* checkAuthenticationSaga (action) {
    const token = yield localStorage.getItem('token')
    if (!token) {
        yield put(authLogout())
    } else {
        const expirationDate = new Date(yield localStorage.getItem('expirationDate'))
        if (expirationDate < new Date()) {
            yield put(authLogout())
        } else {
            yield put(authSuccess(token, yield localStorage.getItem('userId')))
            console.log("Your Session Expires in ", (expirationDate.getTime() - (new Date().getTime()))/1000, "Seconds")
            yield put(logoutCheckTimeout((expirationDate.getTime() - (new Date().getTime())) / 1000));
        }
    }
}