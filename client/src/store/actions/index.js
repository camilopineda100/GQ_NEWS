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
        type: 'LOGOUT_USER',
        payload: null
    }
}

export const updateUserEmailPass = (email, password, id) => ({
    type: 'AUTH_USER',
    payload: api.updateUserEmailPass(email, password, id)
})

export const getUserStats = (id) => ({
    type: 'USER_STATS',
    payload: api.getUserStats(id)
})

export const createPost = (args) => ({
    type: 'CREATE_POST',
    payload: api.createPost(args)
})

export const clearCreatedPost = (args) => ({
    type: 'CREATE_POST',
    payload: { createdPost: null}
})

export const getUserPosts = (sort, prevState, id) => ({
    type: 'USER_POSTS',
    payload: api.getUserPosts(sort, prevState, id)
})

export const updatePostStatus = (status, postId, prevState) => ({
    type: 'UPDATE_POST',
    payload: api.updatePostStatus(status, postId, prevState)
})

export const removePost = (postId, prevState) => ({
    type: 'USER_POSTS',
    payload: api.removePost(postId, prevState)
})

export const getPosts = (sort, state) => ({
    type: 'GET_POSTS',
    payload: api.getPosts(sort, state)
})

export const getPost = (id) => ({
    type: 'GET_POST',
    payload: api.getPost(id)
})