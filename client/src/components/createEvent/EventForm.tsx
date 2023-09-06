import Navbar from "../navbar/Navbar"
import './EventForm.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { IEventInterface } from '../../interfaces/index'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { create } from "../../services/event/EventSlice"
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

  const { isLoading } = useAppSelector((state)=> state.event)

  
  
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

    await dispatch(create(eventData))   

    toast.success('You have created an event')
    navigate('/events')
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
