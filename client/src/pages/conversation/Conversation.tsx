import { useAppSelector } from "../../app/hooks"
import { CommentForm, Comments, Navbar, EventCard } from "../../components"



const Conversation = () => {
  const { conversations } = useAppSelector((state) => state.conversation)
  return (
    <>
      <Navbar/>
      <main>
        <EventCard eventDetail={conversations?.event}/>
        <Comments/>
        <CommentForm/>

      </main>
    </>
  )
}

export default Conversation
