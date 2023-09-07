import axios from "axios";
import { IEventInterface, IEditEventCard } from '../../interfaces/EventInterface'
const API_URL_LOCAL = 'http://127.0.0.1:8000/api/v1/'

const createEvent = async(eventData:IEventInterface, token:string) => {
    const config = {
        headers : {
            'Authorization': `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL_LOCAL+'event/create', eventData, config)

    return response.data
}

const getEvents = async(token:string) => {
    const config = {
        headers : {
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL_LOCAL+'event', config)

    return response.data
}


const getEvent = async(id:number, token:string) => {
    const config = {
        headers : {
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL_LOCAL+`event/${id}`, config)
    
    return response.data
}

const editEventDetails = async(eventData:IEditEventCard,token:string) => {
    const config = {
        headers : {
            'Authorization': `Bearer ${token}`
        }
    }

    const event = {
        'name': eventData.name,
        'description': eventData.description,
        'is_active': eventData.is_active
    }

    const response = await axios.put(API_URL_LOCAL+`event/${eventData.id}`, event, config)

    
    return response.data
}
const deleteEvent = async(id:number,token:string) => {
    const config = {
        headers : {
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL_LOCAL+`event/${id}`, config)

    
    return response.data
}

const eventService = {
    createEvent,
    getEvents,
    getEvent,
    editEventDetails,
    deleteEvent
}

export default eventService