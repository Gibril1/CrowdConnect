import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import './EditEvent.css'
import { getOne, reset, edit } from '../../services/event/EventSlice'
import { toast } from 'react-toastify'
import { IEditEventCard } from '../../interfaces'

const EditEvent = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
      dispatch(reset());
      dispatch(getOne(Number(id)));
    }, [dispatch, id]);
    
    
    const { events, isLoading } = useAppSelector((state) => state.event);
    
    const [formData, setFormData] = useState({
        name: events[0]?.name || '',
        description: events[0]?.description || '',
        is_active: events[0]?.is_active || false
    })

    useEffect(() => {
      if (events.length > 0) {
        setFormData({
          name: events[0]?.name || '',
          description: events[0]?.description || '',
          is_active: events[0]?.is_active || false,
        });
      }
    }, [events]);
  
      const handleChange = (e:any) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]:e.target.value
        }))
      }

      const { name, description, is_active } = formData

      const handleSubmit = async(e:any) => {
        e.preventDefault()

        if(!name){
          toast.error('Please enter the name of the event')
          return
        }

        const eventData:IEditEventCard = {
          'id': Number(id),
          name,
          description,
          is_active
        }

        await dispatch(edit(eventData))
        navigate('/events')
      }

  return (
    <div>
      <form onSubmit={handleSubmit} className='create-event'>
        <h1>Edit the event details here for event {id}</h1>
        <div className="formController">
            <input 
            type="text" 
            name="name" 
            id="name"
            onChange={handleChange} 
            value={name}/>
        </div>
        <div className="formController">
            <input 
            type="text" 
            name="description" 
            id="description"
            onChange={handleChange} 
            value={description}/>
        </div>
        <div>
        { isLoading ? (
                <>
                <button className="btn btn-primary">Updating Event Details...</button>
                </>
              ) : (
                <>
              <button className="btn btn-primary">Update Event</button>
                </>
              )} 
        </div>
      </form>
    </div>
  )
}

export default EditEvent
