import axios from "axios"

export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'
export const AUTH_START = 'AUTH_START'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

 const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}
 const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    }
}

const authStart = () => {
    return {
        type: AUTH_START
    }
}
export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: AUTH_LOGOUT
    }
}
export const logout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    };
};
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAa77zkJGKG2ikK-5Fm7ZWdgEF8quJP07I'
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAa77zkJGKG2ikK-5Fm7ZWdgEF8quJP07I'
        }
        dispatch(authStart())
        axios.post(url, authData)
        .then(response => {
            // console.log(response.data)
            const expirationDate = new Date(new Date().getTime + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', response.data.localId)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(logout(response.data.expiresIn))
        })
        .catch(err => {
            console.log(err.response.data.error.message)
            dispatch(authFail(err.response.data.error.message))
        })
    }
}

export const checkAuthentication = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token) {
            dispatch(authLogout())
        }
        else {
            const expirationDate  = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate < new Date()) {
                dispatch(authLogout())
            }
            else {
                dispatch(authSuccess(token, localStorage.getItem('userId')))
                // dispatch(logout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            } 
        }
    }
}