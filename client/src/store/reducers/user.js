export default function(state = {}, action) {
    switch(action.type) {
        case 'AUTH_USER': 
            return { ...state, ...action.payload}
        case 'LOGIN_USER': 
            return { ...state, ...action.payload}
        case 'AUTO_LOGIN': 
            return { ...state, ...action.payload}
        default:
            return state
    }
}