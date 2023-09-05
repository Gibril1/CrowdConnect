import axios from "axios";
import { IEventID } from '../../interfaces/EventInterface'
const API_URL_LOCAL = 'http://127.0.0.1:8000/api/v1/'

const checkEvent = async(eventId:IEventID) => {
  const response = await axios.post(API_URL_LOCAL+'event/event', eventId)

  return response.data
}

const conversationService = {
  checkEvent
}

export default conversationService