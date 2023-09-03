import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import {GiConvergenceTarget} from 'react-icons/gi'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
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
            <p className='btn btn-border' onClick={() => navigate('/login')}>Login</p>
            <p className='btn btn-primary' onClick={() => navigate('/register')}>Join Here</p>
          </> 
        ):(
          <>
            <p className='btn btn-primary' onClick={() => navigate('/new')}>New Event</p>
            <p className='btn btn-border' onClick={handleLogout}>Logout</p>
          </>
          
        )}
        
    </div>
  )
}

export default Navbar
