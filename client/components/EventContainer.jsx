import React from 'react';
import Event from './Event.jsx';

const EventContainer = ({ events, totalEvents, user }) => {
  const eventsList = events.map((event, index) => (<Event key={index} event={event} />));
  const { primary_interest, city } = user;
  return (
    <div className="events">
      <h4>Go to an event!</h4>
      <span>{totalEvents} {primary_interest} events in {city}</span>
      <div className="eventsList">
        {eventsList}
      </div>
    </div>
  );
};

export default EventContainer;
