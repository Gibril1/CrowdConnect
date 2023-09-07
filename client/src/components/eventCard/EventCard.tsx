import React from "react";
import { IEventCard } from "../../interfaces/index";
import './EventCard.css'
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { checkEventAvailability } from "../../services/conversation/ConversationSlice";
import {GoPencil} from 'react-icons/go'
interface EventCardProps {
  eventDetail: IEventCard
}



const EventCard: React.FC<EventCardProps> = ({ eventDetail }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const getConversations = () => {
    const eventInfo = {
      'entry_code': eventDetail.entry_code
    }
    dispatch(checkEventAvailability(eventInfo))
    navigate(`/chat/${eventDetail.entry_code}`)
  }

  const editEvent = () => {
    navigate(`event/${eventDetail.id}`)
  }
  return (
    <div className={eventDetail.is_active ? 'event-card green-border':'event-card red-border'}>
      <div onClick={editEvent}>
        <GoPencil/>
      </div>
      <p onClick={getConversations} >{eventDetail.name}</p>
      <p>{eventDetail.description}</p>
      <p>{eventDetail.entry_code}</p>
    </div>
  );
};

export default EventCard;
