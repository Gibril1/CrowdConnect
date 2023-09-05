import { useState, ChangeEvent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import {Navbar} from "../../components/index"
import './Register.css'
import RegisterImage from '../../assets/register.jpg'

import { register, reset } from '../../services/auth/AuthSlice'
import { IRegisterUser } from '../../interfaces/AuthInterface'

const Register = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  })



  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const { username, email, password, password2 } = formData


  const handleSubmit = async(e:any) => {
    
    e.preventDefault()

    if(!username || !email || !password || !password2){
      toast.error('Please enter all fields')
      return
    }
    
    if(password !== password2){
      toast.error('Passwords do not match')
      return
    }

    const userData:IRegisterUser = {
      username,
      email, 
      password
    }

    await dispatch(register(userData))   
  }
  const { user, isError, isLoading, isSuccess } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if(isError){
        console.log('we are here. there is an error')
        console.log({
          user, isError, isLoading, isSuccess
        })
        toast.error('An error occurred during sign up')
        return
    }

    if(isSuccess && user !== undefined){
        toast.success('Registeration successful')
        navigate('/new')
    }
    dispatch(reset())
    },[isError, isSuccess, user, dispatch, navigate])
    return (
    <div>
      <Navbar/>
      <main className="register-page">
        <div className="register-image">
          <img src={RegisterImage}/>
        </div>
        <div className="register-form">
          <h1>Enter your details</h1>
          <form onSubmit={handleSubmit}>
            <div className="formController">
              <input 
              type="text" 
              name="username" 
              id="username" 
              onChange={handleChange}
              placeholder="Username"
               />
            </div>
            <div className="formController">
              <input 
              type="email" 
              name="email" 
              id="email" 
              onChange={handleChange}
              placeholder="Email" />
            </div>
            <div className="formController">
              <input 
              type="password" 
              name="password" 
              id="password" 
              onChange={handleChange}
              placeholder="Password" 
              />
            </div>
            <div className="formController">
              <input 
              type="password" 
              name="password2" 
              id="password2" 
              onChange={handleChange}
              placeholder="Confirm Password" 
              />
            </div>
            <div>
              { isLoading ? (
              <button className="btn btn-primary btn-auth">Signing Up....</button>
              ) : (
              <button className="btn btn-primary btn-auth">Sign Up</button>
              ) }
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Register
