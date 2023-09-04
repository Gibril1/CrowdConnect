import axios from "axios";
import { IEventInterface } from '../../interfaces/EventInterface'
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

const eventService = {
    createEvent,
    getEvents
}

export default eventService