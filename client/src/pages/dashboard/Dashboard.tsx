import { useAppDispatch, useAppSelector } from "../../app/hooks";
import EventCard from "../../components/eventCard/EventCard";
import Navbar from "../../components/navbar/Navbar";
import { IEventCard } from "../../interfaces/EventInterface";
import { getAll } from "../../services/event/EventSlice";
import { useEffect} from 'react'
import './Dashboard.css'
import { remove } from "../../services/event/EventSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAll())
  }, [])
  
  const { events } = useAppSelector((state) => state.event);

  const deleteEvent = (eventId: number) => {
    dispatch(remove(eventId));
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-page"> 
        {events && events.length === 0 ? (
          <>
          <h2>You have not created any events yet</h2>
          </>
        ) : (
          <>
            <h2>You have events here</h2>
            {events.map((eventDetail: IEventCard) => (
              <EventCard  
              key={eventDetail.id} 
              eventDetail={eventDetail}
              onDelete={() => deleteEvent(eventDetail.id)}
               />
            ))}
          </>
        )} 
      </div>
    </div>
  );
};

export default Dashboard;
