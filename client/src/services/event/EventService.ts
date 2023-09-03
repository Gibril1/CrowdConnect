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

    console.log('event data response')
    console.log(response)
    return response.data
}

const eventService = {
    createEvent
}

export default eventService