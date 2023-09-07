import { useAppSelector } from '../../app/hooks';
import { CommentForm, Comments, Navbar, EventCard } from '../../components';
import './Conversation.css'


const Conversation = () => {
  
  
  const { conversations } = useAppSelector((state) => state.conversation);

  
  

  // Ensure conversations is defined and has the necessary properties.
  if (!conversations) {
    return (
      <>
        <Navbar />
        <main>
          <h2>No conversation data available.</h2>
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
