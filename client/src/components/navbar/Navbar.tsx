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
    <div className=''>
        <div className="container">
          <div className="navbar">
            <h1 className='logo' onClick={() => navigate('/')}>Crowd Connect <span><GiConvergenceTarget/></span></h1>
            { user ? (
              <>
                <button className='btn btn-primary' onClick={() => navigate('/new')}>New Event</button>
                <button className='btn btn-border' onClick={handleLogout}>Logout</button>
              </> 
            ):(
              <>
                <p className='btn btn-none' onClick={() => navigate('/login')}>Login</p>
                <button className='btn btn-primary' onClick={() => navigate('/register')}>Join Here</button>
              </>
              
            )}
          </div>
        </div>
    </div>
  )
}

export default Navbar
