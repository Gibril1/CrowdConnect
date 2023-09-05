import axios from "axios";
import { IComment } from '../../interfaces/CommentInterface'
const API_URL_LOCAL = 'http://127.0.0.1:8000/api/v1/'


const createComment  = async(commentData:IComment) => {
    const response = await axios.post(API_URL_LOCAL+'comment/create', commentData)

    return response.data
}

const commentService = {
    createComment
}

export default commentService