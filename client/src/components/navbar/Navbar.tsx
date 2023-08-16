import './Navbar.css'
import {GiConvergenceTarget} from 'react-icons/gi'

const Navbar = () => {
  return (
    <div className='navbar'>
        <h1 className='logo'>Crowd Connect <span><GiConvergenceTarget/></span></h1>
        <p className='btn btn-border'>Login</p>
        <p className='btn btn-primary'>Join Here</p>
    </div>
  )
}

export default Navbar
