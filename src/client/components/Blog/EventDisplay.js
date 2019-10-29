import React from 'react';
import PropTypes from 'prop-types';
import { Card, Accordion } from 'react-bootstrap';
import { format } from 'date-fns';

const EventDisplay = (props) => {
  const {
    event: {
      title, description, startDate, endDate,
    } = {},
    index,
  } = props;
  const formattedStartDate = format(new Date(startDate), 'MMM do, yyyy h:mm aa');
  const formattedEndDate = endDate ? format(new Date(endDate), 'MMM do, yyyy h:mm aa') : '';
  const dateString = `${formattedStartDate}${endDate ? ` - ${formattedEndDate}` : ''}`;
  const defaultActiveKey = index === 0 ? 0 : null;

  return (
    <Accordion defaultActiveKey={defaultActiveKey}>
      <Card className="event-card">
        <Accordion.Toggle as={Card.Header} variant="link" eventKey={index}>
          <div className="event-title">
            {title}
          </div>
          <div className="event-date">
            {dateString}
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={index}>
          <Card.Body>
            <p className="event-description">{description}</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};


EventDisplay.propTypes = {
  event: PropTypes.object,
  index: PropTypes.number,
};

EventDisplay.defaultProps = {
  event: {},
  index: null,
};

export default EventDisplay;
