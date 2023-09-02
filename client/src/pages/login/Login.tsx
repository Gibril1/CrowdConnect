import Navbar from "../../components/navbar/Navbar"
import '../register/Register.css'
import LoginImage from '../../assets/register.jpg'
const Login = () => {
  return (
    <div>
      <Navbar/>
      <main className="register-page">
        <div className="register-image">
          <img src={LoginImage}/>
        </div>
        <div className="register-form">
          <h1>Log In</h1>
          <form action="">
            <div className="formController">
              <input type="text" name="username" placeholder="Username" />
            </div>
            <div className="formController">
              <input type="password" name="password" placeholder="Password" />
            </div>
            <div>
              <button className="btn btn-primary btn-auth">Sign In</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login
