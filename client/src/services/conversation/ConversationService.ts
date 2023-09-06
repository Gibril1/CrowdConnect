import axios from "axios";
import { IEventCode } from '../../interfaces/EventInterface'
import { IComment } from "../../interfaces/CommentInterface";
const API_URL_LOCAL = 'http://127.0.0.1:8000/api/v1/'

const checkEvent = async(eventId:IEventCode) => {
  const response = await axios.post(API_URL_LOCAL+'event/event', eventId)

  return response.data
}


const createComment  = async(commentData:IComment) => {
  
  const sendingComment = {
    'comment': commentData.comment
  }
  const response = await axios.post(API_URL_LOCAL+`comments/${commentData.id}`, sendingComment)
  return response.data
}

const conversationService = {
  checkEvent,
  createComment
}

export default conversationService