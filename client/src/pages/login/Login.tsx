import{ Navbar} from "../../components/index"
import '../register/Register.css'
import LoginImage from '../../assets/register.jpg'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import { useState, ChangeEvent, useEffect } from 'react'
import { toast } from 'react-toastify'
import { ILoginUser } from "../../interfaces/AuthInterface"
import { login, reset } from "../../services/auth/AuthSlice"

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]:e.target.value
    }))

  }

  const { email, password } = formData

  const handleSubmit = async(e:any) => {
    e.preventDefault()

    if(!email || !password){
      toast.error('Please enter all fields')
    }

    const userData:ILoginUser = {
      'username': email,
      password
    }

    await dispatch(login(userData))
    dispatch((reset()))
  }

  const { user, isError, isLoading, isSuccess, message } = useAppSelector((state) => state.auth)
  useEffect(() => {
    // Check if the user is already logged in when the component mounts
    if (isSuccess && user) {
      toast.success('Successful Login');
      navigate('/new');
    }
  }, [isSuccess, user, navigate]);

  useEffect(() => {
    // Redirect to another page if the user is already logged in
    if (user) {
      navigate('/new');
    }
  }, [user, navigate]);
  
  if(isError){
    toast.error(message)
  }
    return (
    <div>
      <Navbar/>
      <main className="register-page">
        <div className="register-image">
          <img src={LoginImage}/>
        </div>
        <div className="register-form">
          <h1>Log In</h1>
          <form onSubmit={handleSubmit}>
            <div className="formController">
              <input 
              type="email" 
              name="email" 
              onChange={handleChange}
              placeholder="Email" />
            </div>
            <div className="formController">
              <input 
              type="password" 
              name="password" 
              onChange={handleChange}
              placeholder="Password" />
            </div>
            <div>
            { isLoading ? (
              <button className="btn btn-primary btn-auth">Logging In....</button>
              ) : (
              <button className="btn btn-primary btn-auth">Log In</button>
              ) }
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login
