import { useAppDispatch, useAppSelector } from "../../app/hooks";
import EventCard from "../../components/eventCard/EventCard";
import Navbar from "../../components/navbar/Navbar";
import { IEventCard } from "../../interfaces/EventInterface";
import { getAll } from "../../services/event/EventSlice";
import { useEffect} from 'react'
import './Dashboard.css'
const Dashboard = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAll())
  }, [])
  
  const { events } = useAppSelector((state) => state.event);

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
              <EventCard key={eventDetail.id} eventDetail={eventDetail} />
            ))}
          </>
        )} 
      </div>
    </div>
  );
};

export default Dashboard;
