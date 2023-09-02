import Navbar from "../../components/navbar/Navbar"
import './Register.css'
import RegisterImage from '../../assets/register.jpg'
const Register = () => {
  return (
    <div>
      <Navbar/>
      <main className="register-page">
        <div className="register-image">
          <img src={RegisterImage}/>
        </div>
        <div className="register-form">
          <h1>Enter your details</h1>
          <form action="">
            <div className="formController">
              <input type="text" name="username" id="username" placeholder="Username" />
            </div>
            <div className="formController">
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div className="formController">
              <input type="password" name="password" id="password" placeholder="Password" />
            </div>
            <div className="formController">
              <input type="password" name="password2" id="password2" placeholder="Confirm Password" />
            </div>
            <div>
              <button className="btn btn-primary btn-auth">Sign Up</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Register
