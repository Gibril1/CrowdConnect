import Navbar from "../navbar/Navbar"
import './EventForm.css'
import { useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import { IEventInterface } from '../../interfaces/EventInterface'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { create, reset } from "../../services/event/EventSlice"
import { useNavigate } from "react-router-dom"

const EventForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const handleChange = (e:any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const { name, description } = formData
  const { events, isSuccess, isLoading } = useAppSelector((state)=> state.event)

  useEffect(() => {
    if(isSuccess && events){
      toast.success(`You hav successfully created an event. The code is ${events[0].entry_code}`)
    }
  },[])
  const handleSubmit = async(e:any) => {
    e.preventDefault()

    if(!name){
      toast.error('Please enter the name of the event')
      return
    }

    const eventData:IEventInterface = {
      name,
      description
    }

    dispatch(create(eventData))
    dispatch(reset())
  }

  return (
    <div>
        <Navbar/>
        <div>
          <form onSubmit={handleSubmit} className="create-event">
            <h1>Create An Event</h1>
            <div className="formController">
              <input 
              type="text" 
              name="name" 
              id="name" 
              onChange={handleChange}
              placeholder="Name of the event" />
            </div>
            <div className="formController">
              <textarea 
              name="description" 
              id="description"  
              onChange={handleChange}
              placeholder="Describe the event"></textarea>
            </div>
            <div>
              { isLoading ? (
                <>
                <button className="btn btn-primary">Creating Event...</button>
                </>
              ) : (
                <>
              <button className="btn btn-primary">Create Event</button>
                </>
              )}
            </div>
          </form>
        </div>
    </div>
  )
}

export default EventForm