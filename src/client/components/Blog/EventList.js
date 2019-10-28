import React from 'react';
import PropTypes from 'prop-types';
import { Card, Accordion } from 'react-bootstrap';
import EventDisplay from './EventDisplay';

const EventList = (props) => {
  const { events } = props;
  return (
    <div className="event-display-container col-xs-12 col-sm-4 pull-right">
      <Card>
        <Card.Header className="event-display-header">
          <h4>Upcoming Events</h4>
        </Card.Header>
        <Card.Body>
          <Accordion>
            {events.map((event, i) => <EventDisplay key={event._id} event={event} index={i} />)}
          </Accordion>
        </Card.Body>
      </Card>
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
