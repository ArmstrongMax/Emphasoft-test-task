import * as axios from "axios"
//instance for authorization
const authInstance = axios.create({
    baseURL: 'http://emphasoft-test-assignment.herokuapp.com/',
})
//instance for users. With token after login in stored in local storage.
//Even if page is reload or close, after coming back session is still active
const instance = axios.create({
    baseURL: 'http://emphasoft-test-assignment.herokuapp.com/',
    headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
    }
})
//send login and password. If error - catch and return error response
export const authApi = {
    async loginRequest(username, password) {
        return await authInstance.post('api-token-auth/', {username, password}).catch((error) => {
            if (error.response) {
                return error.response
            }
        })

    }
}
//for users API. Using instance with token
export const usersApi = {
    //Without using instance. Not sure why, but when using instance sometimes token doesn't put in time
    async getAllUsers() {
        return await axios.get('http://emphasoft-test-assignment.herokuapp.com/api/v1/users/',
            {headers: {Authorization: `Token ${localStorage.getItem('token')}`}})
    },
    async createNewUser(username, first_name, last_name, password, is_active) {
         await instance.post('/api/v1/users/', {
            username,
            first_name,
            last_name,
            password,
            is_active
        })
    },
    async editExistingUser(id, username, first_name, last_name, password, is_active) {
         await instance.put(`/api/v1/users/${id}/`, {
            username,
            first_name,
            last_name,
            password,
            is_active
        })
    }
}
