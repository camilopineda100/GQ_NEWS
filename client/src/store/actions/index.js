import * as api from '../../api'

export const signupUser = (userData) => ({
    type: 'AUTH_USER',
    payload: api.signupUser(userData)
})

export const loginUser= (userData) => ({
    type: 'AUTH_USER',
    payload: api.loginUser(userData)
})

export const autoSignIn= (userData) => ({
    type: 'AUTH_USER',
    payload: api.autoSignIn(userData)
})

export const logoutUser = () => {
    localStorage.removeItem('X-AUTH')
    return {
        type: 'AUTH_USER',
        payload: { auth: null }
    }
}