import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import '../../index.css'
import { checkEventAvailability } from '../../services/conversation/ConversationSlice'
import './CodeInputForm.css'
import { useState, ChangeEvent } from 'react'

const CodeInputForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        eventId: ''
    })

    const [textColor, setTextColor] = useState(false)
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]:e.target.value
        }))
      }
    
    const { eventId } = formData

    const handleSubmit = (e:any) => {
        e.preventDefault()
        if(!eventId){
            setTextColor(true)
            setTimeout(() => { setTextColor(false)}, 3000)
        }

        const eventInfo = {
          'entry_code': eventId
        }

        dispatch(checkEventAvailability(eventInfo))
        navigate('/chat')
    }
  return (
    <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="eventId" 
        id="eventId" 
        onChange={handleChange}
        placeholder="Enter 6 digit code...." />
        <button type="submit" className="btn btn-primary">Enter</button><br></br>
        <small className={textColor ? 'visible' : 'invisible'}>Please enter the code before proceeding</small>
    </form>
  )
}

export default CodeInputForm
