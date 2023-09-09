import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import {GiConvergenceTarget} from 'react-icons/gi'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../services/auth/AuthSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  
  
  const { user } = useAppSelector((state) => state.auth)
  
  return (
    <div className='navbar'>
        <h1 className='logo' onClick={() => navigate('/')}>Crowd Connect <span><GiConvergenceTarget/></span></h1>
        { user ? (
          <>
            <button className='btn btn-primary' onClick={() => navigate('/new')}>New Event</button>
            <button className='btn btn-border' onClick={handleLogout}>Logout</button>
          </> 
        ):(
          <>
            <button className='btn btn-border' onClick={() => navigate('/login')}>Login</button>
            <button className='btn btn-primary' onClick={() => navigate('/register')}>Join Here</button>
          </>
          
        )}
        
    </div>
  )
}

export default Navbar
