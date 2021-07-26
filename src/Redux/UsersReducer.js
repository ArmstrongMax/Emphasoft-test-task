import {usersApi} from "../API/API";
const SET_ALL_USERS = 'users/SET-ALL-USERS'
const SET_ORDERED_USERS = 'users/SET-ORDERED-USERS'
//State: allUsers - all users from server after request
let initialState = {
    allUsers: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_USERS:
        case SET_ORDERED_USERS:
            {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}

export const setAllUsers = (users) => ({type:SET_ALL_USERS, payload: {allUsers:users}})
export const setOrderedUsers = (users) => ({type:SET_ORDERED_USERS, payload: {allUsers:users}})

export const getAllUsers = () => async (dispatch) => {
    let response = await usersApi.getAllUsers()
    dispatch(setAllUsers(response.data))
}
export const searchByName = (value) => (dispatch, getState) => {

    let filteredData = []
     getState().users.allUsers.forEach(item => {
        if (item.username.toLocaleLowerCase() === value.searchByName.toLocaleLowerCase()) {
            filteredData.push(item)
        }
    })
    if (filteredData.length > 0) {
        dispatch(setAllUsers(filteredData))
            }
    else {
        dispatch(getAllUsers())
    }
}
export const createNewUser = (value) => async (dispatch) => {
    await usersApi.createNewUser(
        value.username,
        value.first_name,
        value.last_name,
        value.password,
        Boolean(value.is_active))
    dispatch (getAllUsers())
}
export const editExistingUser = (values) => async (dispatch) => {
    await usersApi.editExistingUser(
        values.id,
        values.username,
        values.first_name,
        values.last_name,
        values.password,
        Boolean(values.is_active))
    dispatch (getAllUsers())
}

export default usersReducer;