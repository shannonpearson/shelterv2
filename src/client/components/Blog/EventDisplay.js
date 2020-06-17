/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { format } from 'date-fns';

const EventDisplay = (props) => {
  const { event: { title, description, startDate, endDate } = {} } = props;
  const formattedStartDate = format(
    new Date(startDate),
    'MMM do, yyyy h:mm aa'
  );
  const formattedEndDate = endDate
    ? format(new Date(endDate), 'MMM do, yyyy h:mm aa')
    : '';
  const dateString = `${formattedStartDate}${
    endDate ? ` - ${formattedEndDate}` : ''
  }`;

  return (
    <Card className="event-card">
      <Card.Header>
        <div className="event-title">{title}</div>
        <div className="event-date">{dateString}</div>
      </Card.Header>
      <Card.Body>
        <p className="event-description">{description}</p>
      </Card.Body>
    </Card>
  );
};

EventDisplay.propTypes = {
  event: PropTypes.object,
};

EventDisplay.defaultProps = {
  event: {},
};

export default EventDisplay;
