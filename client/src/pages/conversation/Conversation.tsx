import { useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { CommentForm, Comments, Navbar, EventCard } from '../../components';
import './Conversation.css'
import { checkEventAvailability } from '../../services/conversation/ConversationSlice';


const Conversation = () => {
  const dispatch = useAppDispatch()
  const { entry_code } = useParams()

  useEffect(() => {
    const eventInfo = {
      entry_code
    }
      dispatch(checkEventAvailability(eventInfo))
  }, [entry_code])
  
  const { conversations } = useAppSelector((state) => state.conversation);

  
  

  // Ensure conversations is defined and has the necessary properties.
  if (!conversations) {
    return (
      <>
        <Navbar />
        <main>
          <h2>Such event does not exist</h2>
        </main>
      </>
    );
  }


  const { event, comments } = conversations;

  
  
  

  return (
    <>
      <Navbar />
      <main className='grid'>
        <EventCard eventDetail={event} />
        <section>
          <div>
          <CommentForm id={event.id} />
          </div>
          <div>
            {comments ? (
            <Comments comments={comments} />
          ) : (
            <h2>No comments available.</h2>
          )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Conversation;
