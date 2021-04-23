import * as api from '../../api'

export const signupUser = (userData) => ({
    type: 'AUTH_USER',
    payload: api.signupUser(userData)
})

export const loginUser= (userData) => ({
    type: 'LOGIN_USER',
    payload: api.loginUser(userData)
})

export const autoSignIn= (userData) => ({
    type: 'AUTO_LOGIN',
    payload: api.autoSignIn(userData)
})