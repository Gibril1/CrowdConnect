import React from 'react'
import { IComment } from "../../interfaces/index"

interface CommentCardProps {
  comment:IComment
}
const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div>
      <h3>{ comment.comment }</h3>
    </div>
  )
}

export default CommentCard
