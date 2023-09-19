import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import '../../index.css'
import { checkEventAvailability } from '../../services/conversation/ConversationSlice'
import './CodeInputForm.css'
import { useState, ChangeEvent } from 'react'
import {HiHashtag} from 'react-icons/hi'
import {BsArrowRightCircleFill} from 'react-icons/bs'
import { forwardIcons } from '../../utils/styles'

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

    const handleSubmit = async(e:any) => {
        e.preventDefault()
        if(!eventId){
            setTextColor(true)
            setTimeout(() => { setTextColor(false)}, 3000)
            return
        }

        const eventInfo = {
          'entry_code': eventId
        }

        await dispatch(checkEventAvailability(eventInfo))
        navigate(`/chat/${eventId}`)
    }
  return (
    <form onSubmit={handleSubmit}>
        <div className="check-event">
          <p>Joining as a participant?</p>
          <div className='input-box'>
            <div className="hash-tag"><HiHashtag/></div>
            <input 
              type="text" 
              name='eventId'
              id='eventId'
              onChange={handleChange}
              className='borderless-input'
              placeholder='Enter code here' />
            <button type='submit' className='btn-icon'><BsArrowRightCircleFill style={forwardIcons}/></button>
            </div>
        </div>
        <small className={textColor ? 'visible' : 'invisible'}>Please enter the code before proceeding</small>
    </form>
  )
}

export default CodeInputForm

