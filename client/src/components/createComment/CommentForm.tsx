import React, { useState, ChangeEvent } from 'react'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../app/hooks'
import { IEventId, IComment } from '../../interfaces/index'
import { createComment } from '../../services/conversation/ConversationSlice'

const CommentForm:React.FC<IEventId> = ({ id }) => {
    const dispatch = useAppDispatch()
    const [formData, setFormData] = useState({
        comment: ''
    })
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value
          }))
    }

    const { comment } = formData
    const handleSubmit = (e:any) => {
        e.preventDefault()

        if(!comment){
            toast.error('Share your thoughts')
            return
        }

        const commentData: IComment = {
            comment,
            id
        }
        

        dispatch(createComment(commentData))
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="formController">
            <input 
            type="text"
            name="comment"
            id="comment"
            onChange={handleChange}
            placeholder="Share your thoughts" 
        />
        </div>
        <div>
            <button className="btn btn-border">Comment</button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm
