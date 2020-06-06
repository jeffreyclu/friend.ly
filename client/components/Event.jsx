import React from 'react';

const Event = ({ event }) => {
  const { image, start_time, stop_time, title, venue_name, venue_address, url } = event;
  return (
    <div className="event">
      <a href={url}>{title}</a>
      <span>{start_time} at {venue_name}</span>
      <span>{venue_address}</span>
      <img src={image.url} />
    </div>
  );
};

export default Event;
