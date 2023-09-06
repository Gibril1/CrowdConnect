import React from 'react';
import { CommentCard } from '../../components/index';
import { IComment } from '../../interfaces/index';

interface CommentsProps {
  comments: IComment[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <div>
      {comments.length === 0 ? (
        <h2>Start the conversation by sending your inputs</h2>
      ) : (
        comments.map((comment: IComment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
};

export default Comments;
