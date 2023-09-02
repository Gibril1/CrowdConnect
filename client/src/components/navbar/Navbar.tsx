import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import {GiConvergenceTarget} from 'react-icons/gi'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='navbar'>
        <h1 className='logo' onClick={() => navigate('/')}>Crowd Connect <span><GiConvergenceTarget/></span></h1>
        <p className='btn btn-border' onClick={() => navigate('/login')}>Login</p>
        <p className='btn btn-primary' onClick={() => navigate('/register')}>Join Here</p>
    </div>
  )
}

export default Navbar
