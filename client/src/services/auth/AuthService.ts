import axios from "axios";
import {IRegisterUser, ILoginUser} from '../../interfaces/AuthInterface'

// const API_URL = 'https://crowd-connect.onrender.com/api/v1/users/'
const API_URL_LOCAL = 'http://127.0.0.1:8000/api/v1/'

const registerUser = async(userData:IRegisterUser) => {
    const response = await axios.post(API_URL_LOCAL+'users/register', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    
    return response.data
}

const loginUser = async(userData:ILoginUser) => {
    const config = {
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }

    
    const response = await axios.post(API_URL_LOCAL+'auth/login', userData, config)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    
    console.log('login response')
    console.log(response.data)
    return response.data
}

const logoutUser = () => {
    localStorage.removeItem('user')
}
const authService = {
    registerUser,
    loginUser,
    logoutUser,
}

export default authService