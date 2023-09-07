import React from "react";
import { IEventCard } from "../../interfaces/index";
import './EventCard.css'
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { checkEventAvailability } from "../../services/conversation/ConversationSlice";
import {GoPencil} from 'react-icons/go'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { remove } from "../../services/event/EventSlice";

interface EventCardProps {
  eventDetail: IEventCard,
  onDelete: () => void;
}


const EventCard: React.FC<EventCardProps> = ({ eventDetail, onDelete }) => {
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

  const deleteEvent =() => {
    dispatch(remove(eventDetail.id))
    onDelete();
  }
  return (
    <div className={eventDetail.is_active ? 'event-card green-border':'event-card red-border'}>
      <div>
        <div onClick={editEvent}><GoPencil/></div>
        <div onClick={deleteEvent}><RiDeleteBin6Line/></div>
      </div>
      <p onClick={getConversations} >{eventDetail.name}</p>
      <p>{eventDetail.description}</p>
      <p>{eventDetail.entry_code}</p>
    </div>
  );
};

export default EventCard;
