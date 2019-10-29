import React from 'react';
import PropTypes from 'prop-types';
import EventDisplay from './EventDisplay';

const EventList = (props) => {
  const { events } = props;
  return (
    <div className="event-display-container col-12">
      <div className="row blogs-page-title">
        <h4>Upcoming Events</h4>
      </div>
      {events.map((event, i) => <EventDisplay key={event._id} event={event} index={i} />)}
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.array,
};

EventList.defaultProps = {
  events: [],
};

export default EventList;
