import {authApi} from "../API/API";

//Reducer for authorization.
// State: isAuthorized - indicates is someone authorized
//authError: for indicates if server return error (send wrong auth data)

const SET_IS_SOMEONE_AUTHORIZED = 'auth/SET-IS-SOMEONE-AUTHORIZED'
const SET_AUTH_ERROR = 'auth/SET-AUTH-ERROR'

let initialState = {
    isAuthorized: false,
    authError: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_SOMEONE_AUTHORIZED:
        case SET_AUTH_ERROR:
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const setIsAuthorized = (value) => ({
    type: SET_IS_SOMEONE_AUTHORIZED,
    payload: {isAuthorized: value}
})
export const setAuthError = (value) => ({
    type: SET_AUTH_ERROR,
    payload: {authError: value}
})

export const loginRequest = (email, password) => async (dispatch) => {
    let response = await authApi.loginRequest(email, password)
    debugger
    if (response.status === 200) {
        await localStorage.setItem('token', response.data.token)
        dispatch(setIsAuthorized(true))
        dispatch(setAuthError(false))
    } else if (response.status === 400) {
        dispatch(setAuthError(true))
    }
}
export const logoutRequest = () => (dispatch) => {
    localStorage.removeItem('token')
    dispatch(setIsAuthorized(false))
}
export default authReducer;