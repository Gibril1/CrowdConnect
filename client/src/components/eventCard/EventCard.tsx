import React from "react";
import { IEventCard } from "../../interfaces/EventInterface";
import './EventCard.css'

interface EventCardProps {
  eventDetail: IEventCard
}

const EventCard: React.FC<EventCardProps> = ({ eventDetail }) => {
  return (
    <div className={eventDetail.is_active ? 'event-card green-border':'event-card red-border'}>
      <p>{eventDetail.name}</p>
      <p>{eventDetail.description}</p>
      <p>{eventDetail.entry_code}</p>
    </div>
  );
};

export default EventCard;
