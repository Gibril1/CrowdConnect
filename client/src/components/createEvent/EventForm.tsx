import Navbar from "../navbar/Navbar"
import './EventForm.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { IEventInterface } from '../../interfaces/EventInterface'

const EventForm = () => {
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

    console.log({
      eventData
    })
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
              <button className="btn btn-primary">Create Event</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default EventForm
